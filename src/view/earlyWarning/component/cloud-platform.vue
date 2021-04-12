<template>
    <div class="cloudPlatform" :class="{'overHidden': isOverHidded}">
        <div class="cloud-header">
            <div class="cloud-header-logo"></div>
            <div>
                <Icon
                    class="exit"
                    type="md-power"
                    size="32"
                    color="#00E2FD"
                    @click="goOut"
                />
            </div>
            <div>
                <Icon
                    class="back"
                    type="md-arrow-back"
                    size="32"
                    color="#00E2FD"
                    @click="goBack"
                />
            </div>
            <div class="cloud-header-border" @click="moduleCongfig" v-if="isShowConfig">
                模型配置
            </div>
            <div class="cloud-header-border-two" v-if="isShowConfig">云平台</div>
            <div class="cloud-header-border" v-else style="color: #ffc704;">云平台</div>
        </div>
        <div class="cloud-content">
            <div class="cloud-day">
                <div class="cloud-day-header">当天数据统计</div>
                <div
                    class="cloud-day-charts"
                    style="height:15rem;width:100%"
                ></div>
                <div class="cloud-day-grade">
                    <div class="cloud-day-grade-header">风险等级</div>
                    <div class="cloud-day-grade-content">
                        <div class="cloudPosition">
                            <div class="cloud-day-grade-content-current">
                                <span style="display:block">当前环节风险等级</span>
                                <div class="cloud-day-grade-content-border">
                                    <span
                                        v-for="(data, index) in currentList"
                                        :key="index"
                                        :class="index === getRiskColor(riskLevel[riskIndex].nodeAll) ? 'click' + index : ''"
                                    >
                                    </span>
                                </div>
                                <div
                                    class="cloud-risk"
                                    :class="'click-word'+getRiskColor(riskLevel[riskIndex].nodeAll)"
                                >
                                    {{riskLevel[riskIndex].nodeAll}}
                                </div>
                            </div>
                            <div class="cloud-day-grade-content-next">
                                <span style="display:block"
                                    >供应链综合风险等级</span
                                >
                                <div class="cloud-day-grade-content-border">
                                    <span
                                        v-for="(data, index) in zoomList"
                                        :key="index"
                                        :class="index === getRiskColor(riskLevel[riskIndex].ChainAll) ? 'click' + index : ''"
                                    >
                                    </span>
                                </div>
                                <div
                                    class="cloud-risk"
                                    :class="'click-word'+getRiskColor(riskLevel[riskIndex].ChainAll)"
                                >
                                    {{riskLevel[riskIndex].ChainAll}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cloud-cloud">
                <div class="cloud-cloud-header">云平台</div>
                <div class="cloud-cloud-content">
                    <link-risk @index="getIndex"></link-risk>
                </div>
            </div>
            <div class="cloud-monitor">
                <div class="cloud-monitor-header">供应链实时监控</div>
                <div class="cloud-monitor-content">
                    <div>产品批次: {{ listData.productBatch }}</div>
                    <div>产品名称: {{ listData.productName }}</div>
                    <div>温度: {{ listData.wd }}℃</div>
                    <div>湿度: {{ listData.sd }}%RH</div>
                </div>
                <div class="cloud-tactics-header">防控策略</div>
                <div class="cloud-tactics-content">
                    <div>{{ listData.tactics }}</div>
                </div>
            </div>
            <div class="cloud-table">
                <div class="cloud-table-header">环节等级</div>
                <span class="cloud-table-name">危害物名称: </span>
                <Select v-model="selectModal" style="width: 100px">
                    <Option
                        v-for="item in selectList"
                        :value="item.value"
                        :key="item.value"
                        >{{ item.label }}</Option
                    >
                </Select>
                <Table
                    :columns="columns"
                    :data="selectTableData"
                    border
                ></Table>
            </div>
        </div>
    </div>
</template>

<script>
import echarts from "echarts";
import LinkRisk from "../../service/component/linkRisk";
import { setToken } from "@/libs/util";
import api from "@/api/index.js";
const  { cloud } = api;
export default {
    name: "cloudPlatform",
    components: {
        LinkRisk
    },
    data() {
        var that = this
        return {
            isOverHidded: false,
            riskIndex: 0,
            value: false,
            columns: [
                {
                    title: "供应链环节",
                    key: "date",
                    align: "center",
                    minWidth:20,
                    render(h, params) {
                        if(params.index === 0 && that.selectModal === "1") {
                            return h('div',{
                                style: {
                                    width: '100%',
                                    height: '3rem',
                                    padding: 0,
                                    position: 'relative'
                                }
                            },[
                                h('div',{
                                    style: {
                                        paddingLeft: '1.125rem',
                                        paddingRight: '1.125rem',
                                        width: '100%',
                                        height: '300%',
                                        position: 'absolute',
                                        background: 'rgb(15, 70, 104)',
                                        lineHeight: '9rem'
                                    }
                                },'实际预测值(mg/kg)')
                            ])
                        }else {
                            return h('div',params.row.date)
                        }
                    }
                },
                {
                    id: 1,
                    title: "收购",
                    key: "shougou",
                    align: "center",
                    className: "table-shougou",
                    render(h, params)  {
                        if(params.index < 3 && that.selectModal === "1"){
                            return h('div',{
                                style: {
                                    position: "relative",
                                },
                            },[
                                h('div', {
                                style: {
                                        position: "absolute",
                                        left: "5px"
                                    },
                                },
                                params.row.date),
                                h('span',{
                                },params.row.shougou)
                            ])
                        }else{
                            return h('span',{
                            },params.row.shougou)
                        }
                    }

                },
                {
                    id: 2,
                    title: "干燥",
                    key: "ganzao",
                    align: "center",
                },
                {
                    id: 3,
                    title: "除杂",
                    key: "chuza",
                    align: "center",
                },
                {
                    id: 4,
                    title: "仓储",
                    key: "cangchu",
                    align: "center",
                },
                {
                    id: 5,
                    title: "垄谷",
                    key: "longgu",
                    align: "center",
                },
                {
                    id: 8,
                    title: "抛光",
                    key: "paoguang",
                    align: "center",
                },
                {
                    id: 6,
                    title: "碾米",
                    key: "nianmi",
                    align: "center",
                },
                {
                    id: 7,
                    title: "色选",
                    key: "sexuan",
                    align: "center",
                },
                {
                    id: 9,
                    title: "包装",
                    key: "baozhuang",
                    align: "center",
                },
                {
                    id: 10,
                    title: "入库",
                    key: "ruku",
                    align: "center",
                },
                {
                    id: 11,
                    title: "运输",
                    key: "yunshu",
                    align: "center",
                },
                {
                    id: 12,
                    title: "销售",
                    key: "xiaoshou",
                    align: "center",
                }
            ],
            tableData:[],
            listData: {
                productName: "XXXXX",
                productBatch: "1",
                wd: "26",
                sd: "60",
                tactics:
                    "90%概率在除杂环节引入了危害，建议对相关环节进行检查，10%概率在收购环节引入危害建议把控收购现场环境，10%概率在收购环节引入危害，建议把控收购现场环境。"
            },
            selectModal: "1",
            selectList: [
                {
                    value: "1",
                    label: "重金属"
                },
                {
                    value: "2",
                    label: "铅"
                },
                {
                    value: "3",
                    label: "镉"
                },
                {
                    value: "4",
                    label: "砷"
                }
            ],
            currentList: ["", "", ""],
            zoomList: ["", "", ""],
            riskLevel: [{ChainAll: 0, nodeAll: 0}]
        };
    },
    beforeDestroy() {
        this.exitFullscreen();
        window.removeEventListener("resize", this.setOver)
    },
    methods: {
        // 开启全屏
        getIndex(val) {
            this.riskIndex = val
        },
        full() {
            let main = document.body;
            if (this.value) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (main.requestFullscreen) {
                    main.requestFullscreen();
                } else if (main.mozRequestFullScreen) {
                    main.mozRequestFullScreen();
                } else if (main.webkitRequestFullscreen) {
                    main.webkitRequestFullscreen();
                } else if (main.msRequestFullscreen) {
                    main.msRequestFullscreen();
                }
            }
        },
        // 退出全屏
        exitFullscreen() {
            if (document.exitFullScreen) {
                document.exitFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (element.msExitFullscreen) {
                element.msExitFullscreen();
            }
        },
        goOut() {
            var _this = this;
            this.$Modal.confirm({
                title: "退出登录",
                content: "是否退出登录？",
                okText: "确定",
                cancelText: "取消",
                onOk() {
                    this.$api.login.logout().then(res => {
                        if (res == "log out successful") {
                            setToken("");
                            _this.$router.push("/login");
                        }
                    });
                }
            });
        },
        goBack() {
            if(this.isShowConfig) {
                this.$router.go(-1)
            }else {
                this.$router.replace("/")
            }
                
        },
        moduleCongfig() {
            // this.$router.push("/earlyWarning");
            this.$router.back(-1);
        },
        setCharts() {
            cloud.getTodayRiskQuantityData().then(res => {
                this.charts.setOption({
                    series: [{
                        data: res.map(item => item.quantity).reverse()
                    }]
                })
            })
        },
        initCharts() {
            this.charts = echarts.init(
                document.getElementsByClassName("cloud-day-charts")[0]
            );

            var option = {
                color: ["#19F7FF"],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                grid: {
                    top: "20px",
                    left: "3%",
                    right: "10%",
                    bottom: "20px",
                    containLabel: true
                },
                xAxis: {
                    type: "value",
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgb(38,78,115)"
                        }
                    },
                    axisLabel: {
                        show: false
                    },
                    max: function(value) {
                        var num = value.min + value.max;
                        return num;
                    }
                },
                yAxis: {
                    type: "category",
                    data: ["低风险", "中风险","高风险"],
                    axisLine: {
                        lineStyle: {
                            color: "#A6CDFF"
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
                series: [
                    {
                        name: "次数",
                        type: "bar",
                        label: {
                            show: true,
                            position: "right",
                            color: "#A6CDFF",
                            formatter: "{@score} 次"
                        },
                        barCategoryGap: "65%",
                    }
                ]
            };
            this.charts.setOption(option, true);
        },
        getRiskColor(risk) {
            switch(risk) {
                case "低风险":
                    return 0
                case "中风险":
                    return 1
                case "高风险":
                    return 2
            }
        },
        getTableInfo() {
            let itemA = {}
            let itemB = {}
            let itemC = {}
            let itemD = {}
            let riskLevel = []
            let getInfo = [];
            for (let i = 1; i < 13; i++) {
                getInfo.push(cloud.getTableInfo({code:1, node: i}));
            }
            Promise.all(getInfo).then(res => {
                for (let j = 0; j < res.length; j++) {
                    riskLevel.push({nodeAll: res[j].levelWorkingnodeAll ,ChainAll: res[j].levelSupplyChainAll})
                    if(res[j].riceSupplyChainNode == "收购"){
                        itemA.shougou = res[j].realMeasureLead;
                        itemB.shougou = res[j].realMeasureArsenic;
                        itemC.shougou = res[j].realMeasureCadmium;
                        itemD.shougou = res[j].levelSupplyChainAll;
                    }
                    if(res[j].riceSupplyChainNode == "干燥"){
                       itemA.ganzao = res[j].realMeasureLead;
                       itemB.ganzao = res[j].realMeasureArsenic;
                       itemC.ganzao = res[j].realMeasureCadmium;
                       itemD.ganzao = res[j].levelSupplyChainAll;
                    }
                    if(res[j].riceSupplyChainNode == "除杂"){
                        itemA.chuza = res[j].realMeasureLead;
                        itemB.chuza = res[j].realMeasureArsenic;
                        itemC.chuza = res[j].realMeasureCadmium;
                        itemD.chuza = res[j].levelSupplyChainAll;
                    }
                    if(res[j].riceSupplyChainNode == "仓储"){
                        itemA.cangchu = res[j].realMeasureLead;
                        itemB.cangchu = res[j].realMeasureArsenic;
                        itemC.cangchu = res[j].realMeasureCadmium;
                        itemD.cangchu = res[j].levelSupplyChainAll;
                    }
                    if(res[j].riceSupplyChainNode == "垄谷"){
                        itemA.longgu = res[j].realMeasureLead;
                        itemB.longgu = res[j].realMeasureArsenic;
                        itemC.longgu = res[j].realMeasureCadmium;
                        itemD.longgu = res[j].levelSupplyChainAll;
                    }
                    if(res[j].riceSupplyChainNode == "碾米"){
                        itemA.nianmi = res[j].realMeasureLead;
                        itemB.nianmi = res[j].realMeasureArsenic;
                        itemC.nianmi = res[j].realMeasureCadmium;
                        itemD.nianmi = res[j].levelSupplyChainAll;
                    }
                    if(res[j].riceSupplyChainNode == "色选"){
                        itemA.sexuan = res[j].realMeasureLead;
                        itemB.sexuan = res[j].realMeasureArsenic;
                        itemC.sexuan = res[j].realMeasureCadmium;
                        itemD.sexuan = res[j].levelSupplyChainAll;
                    }
                    if(res[j].riceSupplyChainNode == "抛光"){
                        itemA.paoguang = res[j].realMeasureLead;
                        itemB.paoguang = res[j].realMeasureArsenic;
                        itemC.paoguang = res[j].realMeasureCadmium;
                        itemD.paoguang = res[j].levelSupplyChainAll;
                    }
                    if(res[j].riceSupplyChainNode == "包装"){
                        itemA.baozhuang = res[j].realMeasureLead;
                        itemB.baozhuang = res[j].realMeasureArsenic;
                        itemC.baozhuang = res[j].realMeasureCadmium;
                        itemD.baozhuang = res[j].levelSupplyChainAll;
                    }
                    if(res[j].riceSupplyChainNode == "入库"){
                        itemA.ruku = res[j].realMeasureLead;
                        itemB.ruku = res[j].realMeasureArsenic;
                        itemC.ruku = res[j].realMeasureCadmium;
                        itemD.ruku = res[j].levelSupplyChainAll;
                    }
                    if(res[j].riceSupplyChainNode == "运输"){
                        itemA.yunshu = res[j].realMeasureLead;
                        itemB.yunshu = res[j].realMeasureArsenic;
                        itemC.yunshu = res[j].realMeasureCadmium;
                        itemD.yunshu = res[j].levelSupplyChainAll;
                    }
                    if(res[j].riceSupplyChainNode == "销售"){
                        itemA.xiaoshou = res[j].realMeasureLead;
                        itemB.xiaoshou = res[j].realMeasureArsenic;
                        itemC.xiaoshou = res[j].realMeasureCadmium;
                        itemD.xiaoshou = res[j].levelSupplyChainAll;
                    }
                }
                itemA.date = "铅";
                itemB.date = "砷";
                itemC.date = "镉";
                itemD.date = "环节风险等级";
                this.tableData = [itemA, itemB, itemC, itemD]
                this.riskLevel = riskLevel
            })
            // setTimeout(() => {
            //     this.tableData = [itemA, itemB, itemC, itemD]
            // },800)
        },
        getListData(node) {
            Promise.all([
                this.$api.cloud.getSupplyData(node+1),
                this.$api.cloud.getSupplyWords(node+1)
            ]).then(res => {
                let [res1, res2] = res
                this.listData = {
                    ...this.listData,
                    productName: res1.productName,
                    wd: res1.temperature,
                    sd: res1.humidity,
                    tactics: res2
                }
            })
        },
        setOver() {
            console.log(window.outerHeight-50 < window.innerHeight);
            if(window.outerHeight-50 < window.innerHeight) {
                this.isOverHidded = true
            }else {
                this.isOverHidded = false
            }
        }
    },
    mounted() {
        window.onresize = () => {
            this.charts.resize();
        };
        window.addEventListener("resize", this.setOver)
        this.full();
        this.initCharts();
        this.setCharts()
        this.getTableInfo();
        this.getListData(1)
    },
    computed: {
        isShowConfig() {
            let access = this.$store.state.user.access.earlyWarning
            if(!access) return true
            if(access.length === 0) return false
            return true
        },
        selectTableData: function() {
            if(this.tableData!=0){
                // console.log(this.tableData);
                if(this.selectModal === "2") {
                    return this.tableData.filter(item => {
                        if(item.date === "镉" || item.date === "砷") return false
                        return true
                    })
                }else if(this.selectModal === "3") {
                    return this.tableData.filter(item => {
                        if(item.date === "铅" || item.date === "砷") return false
                        return true
                    })
                }else if(this.selectModal === "4") {
                    return this.tableData.filter(item => {
                        if(item.date === "铅" || item.date === "镉") return false
                        return true
                    })
                }else {
                    return this.tableData
                }
            }
        }
    },
    watch: {
        riskIndex(val, oldVal) {
            this.columns = this.columns.map(item => {
                if(item.id === val+1) {
                    item.className= "table-shougou"
                }else {
                    item.className= ""
                }
                return item
            })
            this.getListData(val)
        }
    }
};
</script>

<style lang="less" scoped>
@paddingLeft: 10px;
@background: #1c4f80;
@titleColor: #19f7ff;
@titleSize: 14px;
.overHidden {
    overflow: hidden;
}
.cloudPlatform {
    width: 100%;
    height: 100%;
    background: rgb(4, 29, 47);
    .cloud-header {
        width: 100%;
        height: 80px;
        background: url("../../../assets/images/cloud/cloud-header-bg.png")
            no-repeat;
        padding-top: 10px;
        background-size: 100% 100%;
        position: relative;
        .cloud-header-logo {
            width: 320px;
            height: 40px;
            margin: 0 auto;
            background: url("../../../assets/images/cloud/cloud-header.png")
                no-repeat;
            background-size: 100% 100%;
        }
        .cloud-header-border {
            width: 98px;
            height: 30px;
            line-height: 30px;
            background: url("../../../assets/images/cloud/cloud-border1.png")
                no-repeat;
            background-size: cover;
            display: inline-block;
            text-align: center;
            color: #84f2ff;
            padding-right: 10px;
            margin-left: @paddingLeft;
            cursor: pointer;
        }
        .cloud-header-border-two {
            width: 125px;
            height: 30px;
            background: url("../../../assets/images/cloud/cloud-border2.png")
                no-repeat;
            background-size: cover;
            display: inline-block;
            text-align: center;
            vertical-align: top;
            color: #ffc704;
            padding: 5px 0 0 0;
            cursor: pointer;
        }
        .back {
            position: absolute;
            font-size: 32px !important;
            right: 60px;
            cursor: pointer;
        }
        .exit {
            font-size: 32px !important;
            position: absolute;
            right: 10px;
            cursor: pointer;
        }
    }
    .cloud-content {
        width: 100%;
        height: calc(100%);
        min-width: 1680px;
        padding-left: @paddingLeft;
        padding-top: 10px;
        .header {
            width: 100%;
            height: 50px;
            line-height: 28px;
            padding-left: 10px;
            background: url("../../../assets/images/cloud/cloud-content-border1.png")
                no-repeat;
            background-size: 100% 100%;
            font-size: @titleSize;
            color: @titleColor;
        }
        .cloud-day {
            width: 22%;
            height: 60%;
            min-height: 513px;
            background: url("../../../assets/images/cloud/cloud-content-day.png")
                no-repeat;
            background-size: 100% 100%;
            display: inline-block;
            vertical-align: top;
            .cloud-day-header {
                .header;
            }
            .cloud-day-grade {
                .cloud-day-grade-header {
                    .header;
                }
                .cloud-day-grade-content {
                    position: relative;
                    height: 230px;
                    color: #fff;
                    font-size: 14px;
                    .cloudPosition{
                        width: 250px;
                        height: 180px;
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        margin: auto;
                    }
                    .cloud-day-grade-content-current,
                    .cloud-day-grade-content-next {
                        width: 100%;
                        height: 80px;
                        padding-top: 10px;
                        // padding: 10px 100px;
                    }
                }
                .cloud-day-grade-content-border {
                    width: 80px;
                    height: 30px;
                    border-radius: 12px;
                    border: 2px solid rgb(41, 138, 226);
                    display: inline-flex;
                    padding: 7px;
                    margin-top: 10px;
                    justify-content: space-between;
                    margin-right: 30px;
                    vertical-align: middle;
                    span {
                        height: 100%;
                        line-height: 12px;
                        width: 12px;
                        margin-right: 10px;
                        border-radius: 50%;
                        background: #fff;
                        display: inline-block;
                    }
                    span:last-child {
                        margin-right: 0;
                    }
                }
                .loud-day-grade-content-next {
                    color: #fff;
                    font-size: 15px;
                }
            }
        }
        .cloud-cloud {
            width: 53%;
            height: 60%;
            min-height: 513px;
            background: url("../../../assets/images/cloud/cloud-content-day.png")
                no-repeat;
            background-size: 100% 100%;
            display: inline-block;
            margin-left: 20px;
            .cloud-cloud-header {
                width: 100%;
                height: 50px;
                line-height: 28px;
                padding-left: 5px;
                background: url("../../../assets/images/cloud/cloud-content-border1.png")
                    no-repeat;
                background-size: contain;
                font-size: @titleSize;
                color: @titleColor;
            }
            .cloud-cloud-content {
                height: 100%;
                .content-div {
                    width: 25%;
                    height: 80px;
                    display: inline-block;
                    margin-right: 20px;
                    background-size: contain;
                    background-position: bottom;
                }
                .content-arrow {
                    width: 50px;
                    height: 50px;
                    display: inline-block;
                    background-size: contain;
                    background-position: bottom;
                    margin: 30px 20px 0 0;
                }
            }
        }
        .cloud-monitor {
            width: 22%;
            height: 60%;
            min-height: 513px;
            background: url("../../../assets/images/cloud/cloud-content-day.png")
                no-repeat;
            background-size: 100% 100%;
            display: inline-block;
            margin-left: 20px;
            vertical-align: top;
            .cloud-monitor-header {
                .header;
            }
            .cloud-tactics-header {
                width: 100%;
                .header;
            }
            .cloud-monitor-content {
                height: 240px;
                max-height: 40%;
                padding: 30px 20px 0 20px;
                color: #fff;
                font-size: 14px;
                display: inline-block;
                vertical-align: middle;
                div {
                    margin-bottom: 14px;
                    vertical-align: middle;
                }
            }
            .cloud-tactics-content {
                .cloud-monitor-content;
            }
        }
        .cloud-table {
            width: 99.5%;
            height: 21rem;
            background: url("../../../assets/images/cloud/cloud-content-day.png")
                no-repeat;
            background-color: #041d2f;
            background-size: 100% 100%;
            margin-top: 20px;
            /deep/.ivu-select-selection {
                border: 1px solid #2878ff;
                background: @background;
                color: #fff;
            }
            /deep/ .ivu-select-dropdown {
                background: @background;
            }
            /deep/.ivu-select-item {
                color: #fff;
            }
            /deep/.ivu-select-item:hover {
                background: rgb(15, 70, 104);
            }
            /deep/ .ivu-select-item-focus {
                background: rgb(15, 70, 104);
            }
            .cloud-table-header {
                .header;
            }
            /deep/ .ivu-select {
                margin: 5px 0;
            }
            /deep/ .ivu-table-wrapper {
                margin: 0 20px;
            }
            .cloud-table-name {
                color: #fff;
                font-size: 14px;
                margin: 0 20px 0 20px;
            }
        }
    }
    /deep/ .ivu-table th {
        background-color: rgb(15, 70, 104);
        border: 1px solid #1c4f80;
        color: #fff;
    }
    /deep/ .ivu-table td {
        background-color: rgb(15, 70, 104);
        border: 1px solid #1c4f80;
        color: #fff;
    }
    /deep/ .ivu-table-wrapper {
        border: none;
    }
    /deep/ .ivu-table:before {
        background-color: transparent;
    }
    /deep/ .ivu-table:after {
        background-color: transparent;
    }
    /deep/.ivu-table {
        background-color: transparent;
    }
    .click0 {
        background-color: rgb(39, 238, 60) !important;
    }
    .click1 {
        background-color: rgb(254, 198, 47) !important;
    }
    .click2 {
        background-color: red !important;
    }
    .click-word0 {
        color: rgb(39, 238, 60) !important;
    }
    .click-word1 {
        color: rgb(254, 198, 47) !important;
    }
    .click-word2 {
        color: red !important;
    }
    .cloud-risk {
        margin-top: 10px;
        margin-left: 40px;
        display: inline-block;
        vertical-align: middle;
        line-height: 30px;
    }
}
/deep/.ivu-table-cell {
    padding: 0 !important;
    overflow: visible;
    >div {
        padding-left: 1.125rem;
        padding-right: 1.125rem;
    }
    >span {
        padding-left: 1.125rem;
        padding-right: 1.125rem;
    }
}
/deep/.table-shougou span {
    color: #FFC704;
}
/deep/.ivu-row {
    background: url("../../../assets/images/cloud/cloud-content-day.png")
}
</style>