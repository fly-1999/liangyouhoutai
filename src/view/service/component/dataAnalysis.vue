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
            <div 
              v-for="(item,index) in userTabList"
              :key="index"
              :class="{
                'cloud-header-border': index === 0,
                'cloud-header-border-two': index !== 0,
                'selected': item === '大数据分析'
              }"
              @click="getModuleCongfig(item)"
            >
                {{item}}
            </div>

        </div>
        <div class="cloud-content">
            <div class="cloud-day">
                <div class="cloud-day-header titleList">
                    环节风险分析
                    <Select
                        v-model="selectModal2"
                        style="width:100px;margin-left: 10px"
                        size="small"
                        placeholder="请选择"
                    >
                        <Option
                            v-for="item in selectList2"
                            :value="item.value"
                            :key="item.value"
                            >{{ item.label }}</Option
                        >
                    </Select>
                </div>
                <!--<img src="../../../assets/WX20201024-110551@2x.png" style="width: 98%"/>-->
                <LinkRisk :selectIndex="selectModal2"></LinkRisk>
            </div>
            <div class="cloud-cloud">
                <div class="cloud-cloud-header">地区风险分析</div>
                <MapRegion :areaRank="areaRank"></MapRegion>
                <Table  size="small" disabled-hover class="map-table" :show-header="false" :columns="columns" :data="tableData"></Table>
            </div>

            <Row :gutter="12" style="width:99%">
                <Col span="6">
                    <!--批次数量分析-->
                    <div class="list-item">
                        <div class="cloud-table-header">批次数量分析</div>
                        <!--<span class="cloud-table-name">月季年: </span>-->
                        <!--<DatePicker type="daterange" size="small" :options="options2" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>-->
                        <BreakLine></BreakLine>
                    </div>
                </Col>
                <Col span="6">
                    <!--综合风险分析-->
                    <div class="list-item">
                        <div class="cloud-table-header">综合风险分析</div>
                        <Histogram></Histogram>
                    </div>
                </Col>
                <Col span="6">
                    <!--溯源次数分析-->
                    <div class="list-item">
                        <div class="cloud-table-header special">
                            溯源次数分析
                            <Select
                                v-model="selectModal"
                                style="width:120px;margin-left: 10px;"
                                size="small"
                                placeholder="请选择编号"
                                @on-change="selectChange"
                            >
                                <Option
                                    v-for="item in selectList"
                                    :value="item.value"
                                    :key="item.value"
                                    >{{ item.label }}</Option
                                >
                            </Select>
                        </div>
                        <Discounting :changeData="changeData"></Discounting>
                    </div>
                </Col>
                <Col span="6">
                    <!--危害风险分析-->
                    <div class="list-item">
                        <div class="cloud-table-header">危害风险分析</div>
                        <Histogram2 :elementRank="elementRank"></Histogram2>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
import echarts from "echarts";
import MapRegion from "./map_region"; //地图
import BreakLine from "./breakLine"; //波浪线
import Histogram from "./histogram"; //波浪线
import Discounting from "./discounting"; //波浪线
import Histogram2 from "./histogram2"; //波浪线
import LinkRisk from "./linkRisk"; //环节风险
import { setToken } from "@/libs/util";
import {getDate} from "@/libs/tools"
export default {
    name: "data-analysis",
    components: {
        MapRegion,
        BreakLine,
        Histogram,
        Histogram2,
        Discounting,
        LinkRisk
    },
    data() {
        return {
            isOverHidded: false,
            value: false,
            changeData: "",
            selectModal: "",
            selectModal2: "1",
            columns: [
                {
                    title: "日期",
                    key: "date",
                    align: "center",
                    minWidth: 45,
                    className:"table-date"
                },
                {
                    title: "地区",
                    key: "area",
                    minWidth: 30,
                    align: "center"
                },
                {
                    title: "等级",
                    key: "rank",
                    align: "center"
                }
            ],
            selectList2: [],
            selectList: [],
            areaRank: {},
            elementRank: {}
        };
    },
    beforeDestroy() {
        this.exitFullscreen();
        window.removeEventListener("resize", this.setOver)
    },
    methods: {
        getRank(obj) {
            if(obj["高风险"] > 0) {
                return "高"
            }else if(obj["中风险"] > 0) {
                return "中"
            }else {
                return "低"
            }
        },
        goBack() {
            if(this.userTabList.length === 1 && this.userTabList[0] === "大数据分析") {
                this.$router.replace("/")
            }else {
                this.$router.go(-1)
            }
        },
        //
        selectChange(e) {
            this.changeData = this.selectModal;
        },
        // 开启全屏
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
                } else if (main.webkitRequestFullScreen) {
                    main.webkitRequestFullScreen();
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
            let that = this;
            this.$Modal.confirm({
                title: "退出登录",
                content: "是否退出登录？",
                okText: "确定",
                cancelText: "取消",
                onOk() {
                    this.$api.login.logout().then(res => {
                        if (res == "log out successful") {
                            setToken("");
                            that.$router.push("/login");
                        }
                    });
                }
            });
            // this.$router.push("/login");
            // localStorage.removeItem('access_token');
        },
        moduleCongfig() {
            this.$router.push("/service");
            // this.$router.back(-1);
        },
        moduleCongfig2() {
            this.$router.push({
                path: "/service",
                query: {
                    active: 1
                }
            });
            // this.$router.back(-1);
        },
        getModuleCongfig(name) {
            if(name === "信息公告") {
                this.moduleCongfig()
            }else if(name === "报表管理") {
                this.moduleCongfig2()
            }
        },
        handleSpan({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0 && columnIndex === 0) {
                return [1, 2];
            } else if (rowIndex === 0 && columnIndex === 1) {
                return [0, 0];
            }
            if (rowIndex === 2 && columnIndex === 0) {
                return {
                    rowspan: 2,
                    colspan: 1
                };
            } else if (rowIndex === 3 && columnIndex === 0) {
                return {
                    rowspan: 0,
                    colspan: 0
                };
            }
        },
        getAreaRank() {
            this.$api.service.getAreaRank().then(res => {
                for(let i in res) {
                    res[i] = Object.assign({"低风险": 0, "中风险": 0, "高风险": 0}, res[i])
                }
                this.areaRank = res
            })
        },
        getElementRank() {
            this.$api.service.getElementRank().then(res => {
                this.elementRank = {
                    "镉": {
                        "低风险": 0,
                        "中风险": 0,
                        "高风险": 0,
                        ...res["镉"]
                    },
                    "铅": {
                        "低风险": 0,
                        "中风险": 0,
                        "高风险": 0,
                        ...res["铅"]
                    },
                    "砷": {
                        "低风险": 0,
                        "中风险": 0,
                        "高风险": 0,
                        ...res["砷"]
                    }
                }
            })
        },
        getAllcode() {
            this.$api.service.getCodeAll().then(res => {
                this.selectList2 = res.map(item => ({
                    value: item,
                    label: "批次"+item
                }))
                this.selectList = res.map(item => ({
                    value: item,
                    label: "批次"+item
                }))
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
        // window.onresize = () => {
        //   this.charts.resize();
        // };
        this.full();
        window.addEventListener("resize", this.setOver)
        this.getAreaRank()
        this.getElementRank()
        this.getAllcode()
    },
    computed: {
        userTabList() {
            let tabList = ["信息公告", "大数据分析", "报表管理"]
            let access = this.$store.state.user.access.service
            if(!access) return tabList
            return tabList.filter(item => {
                if(item === "信息公告" && access.find(item2 => item2 === "信息公告")) return true
                if(item === "大数据分析" && access.find(item2 => item2 === "大数据分析")) return true
                if(item === "报表管理" && access.find(item2 => item2 === "报表管理")) return true
                return false
            })
        },
        tableData() {
            let dateStr = getDate(Date.now()/1000,"year").slice(0, 10).replace(/-/g,".")
            let result = []
            for(let i in this.areaRank) {
                let obj = {}
                obj.date = dateStr
                obj.area = i
                obj.rank = this.getRank(this.areaRank[i])
                result.push(obj)
            }
            return result
        }
    }
};
</script>

<style lang="less" scoped>
@paddingLeft: 10px;
@background: #1c4f80;
@titleColor: #19f7ff;
@titleSize: 14px;

.special {
    margin-top: 17px;
    /deep/.ivu-select-placeholder{
       color:#07F1F9;
    }
    /deep/.ivu-select-arrow{
         color:#07F1F9;
         margin-right: 4px;
    }
    /deep/ .ivu-select .ivu-select-small {
        margin: 0;
       
    }
}
.titleList {
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
}
.list-item {
    /*width: 24%;*/
    height: 330px;
    background: url("../../../assets/images/cloud/cloud-content-day.png")
        no-repeat;
    background-size: 100% 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    /deep/.ivu-input,
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
    // /deep/ .ivu-select {
    //     /*margin: 10px 0;*/
    // }
    /deep/ .ivu-table-wrapper {
        margin: 0 20px;
    }
    .cloud-table-name {
        color: #fff;
        font-size: 14px;
        margin: 0 20px 0 20px;
        vertical-align: text-top;
    }
    .cloud-table-header {
        width: 100%;
        height: 54px;
        line-height: 28px;
        padding-left: 10px;
        background: url("../../../assets/images/cloud/cloud-content-border1.png")
            no-repeat;
        background-size: 100% 100%;
        font-size:21px;
        font-weight: bold;
        color: @titleColor;
    }
}
.overHidden {
    overflow: hidden;
}
.cloudPlatform {
    width: 100%;
    height: 100%;
    background: rgb(4, 29, 47);
    .cloud-header {
        width: 100%;
        background: url("../../../assets/images/cloud/cloud-header-bg.png")
            no-repeat;
        padding-top: 10px;
        background-size: 100% 100%;
        position: relative;
        .cloud-header-logo {
            width: 320px;
            height: 40px;
            margin: 0 auto;
            background: url("../../../assets/images/dataAnalysis/cloud-header.png")
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
            color:#84f2ff;
            padding: 5px 0 0 0;
            cursor: pointer;
        }
        .exit {
            position: absolute;
            right: 10px;
            font-size: 32px !important;
            cursor: pointer;
        }
        .back {
            position: absolute;
            right: 60px;
            font-size: 32px !important;
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
            width: 44%;
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
                    color: #fff;
                    font-size: 14px;
                    .cloud-day-grade-content-current,
                    .cloud-day-grade-content-next {
                        padding: 10px 60px;
                    }
                }
                .cloud-day-grade-content-border {
                    width: 80px;
                    height: 30px;
                    border-radius: 12px;
                    border: 2px solid rgb(41, 138, 226);
                    display: flex;
                    padding: 7px;
                    margin-top: 10px;
                    justify-content: space-between;
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
            position: relative;
            width: 53.5%;
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
        }

        .cloud-table {
            width: 99.5%;
            height: 27%;
            background: url("../../../assets/images/cloud/cloud-content-day.png")
                no-repeat;
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
                margin: 10px 0;
            }
            /deep/ .ivu-table-wrapper {
                margin: 0 20px;
            }
            .cloud-table-name {
                color: #fff;
                font-size: 14px;
                margin: 0 20px 0 20px;
                vertical-align: text-top;
            }
        }
    }
}
.selected {
    color: #ffc704 !important;
}
.map-table  {
    position: absolute;
    bottom: 27px;
    right: 45px;
    width: 340px;
    background-color: rgba(12, 41, 80, .5);
    border: none;
}
/deep/.map-table .ivu-table {
    background-color: rgba(0,0,0,0);
}
/deep/.map-table .ivu-table:before,/deep/.map-table .ivu-table:after {
    display: none;
}
/deep/.map-table .ivu-table-row td {
    background-color: transparent;
    color: #fff;
    border: none;
}
/deep/.map-table .ivu-table-row:nth-of-type(2n) td {
    background-color: rgba(8, 79, 140, .3);
}
/deep/.table-date {
    color: rgb(0, 144, 255) !important;
}
/deep/.ivu-table-body>table {
    width: auto !important;
}
/deep/.ivu-row {
    background: #041d2f;
    width: auto !important;
}
</style>
