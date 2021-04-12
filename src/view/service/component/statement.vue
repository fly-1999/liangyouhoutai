<template>
    <div class="com-Content">
        <div class="info_title">
            <div class="radioGroup">
                <RadioGroup v-model="buttonType" type="button" @on-change="ChooseData">
                    <Radio label="day">日</Radio>
                    <Radio label="month">月</Radio>
                    <Radio label="year">年</Radio>
                </RadioGroup>
                <span class="font14">时间</span>
                <!-- 日期选择 -->
                <DatePicker
                    v-if="dayShow"
                    type="daterange"
                    placement="bottom-start"
                    placeholder="请选择日期"
                    @on-change="getDay"
                    class="datePicker"
                    :editable="false"
                ></DatePicker>
                <!-- 月份选择 -->
                <div v-if="monthShow" style="display: inline-block;">
                    <DatePicker
                        type="month"
                        placement="bottom-start"
                        placeholder="请选择开始月份"
                        @on-change="getBeginMonth"
                        :options="startMonthOptions"
                        :editable="false"
                        class="datePicker"
                    ></DatePicker>
                    <span class="monthSpan"></span>
                    <DatePicker
                        type="month"
                        placement="bottom-start"
                        placeholder="请选择结束月份"
                        @on-change="getEndMonth"
                        :options="endMonthOptions"
                        :editable="false"
                        class="datePicker"
                    ></DatePicker>
                </div>
                <!-- 年份选择 -->
                <DatePicker
                    v-if="yearShow"
                    type="year"
                    placement="bottom-start"
                    placeholder="请选择年份"
                    @on-change="getYear"
                    class="datePicker"
                    :editable="false"
                ></DatePicker>
            </div>
            <Button
                type="primary"
                class="infoButton"
                @click="downloadFile()"
            >下载</Button>
        </div>
        <div style="margin-top: 15px">
            <Table border :columns="columns" :data="dataParts[page - 1]"></Table>
        </div>
        <div class="footer">
            <!-- <Page
                :total="100"
                :page-size="this.getReport.pageSize"
                :current="this.getReport.pageNum"
                @on-change="handleCurrentChange"
                show-elevator
                show-total
                class="page"
            /> -->
            <Page
                :total="dataLenth"
                @on-change="stPageChange"
                show-elevator
                show-total
                class="page"
            />
        </div>
    </div>
</template>

<script>
import api from "@/api/index.js";
import base from "@/api/base";
import axios from "@/api/http"
const  { service } = api;
export default {
    name: "statement",
    data() {
        return {
            buttonType: "day",
            dayShow: true,
            monthShow: false,
            yearShow: false,
            page: 1,
            getReport:{
                type: 1,
                pageNum: 0,
                pageSize: 0
            },
            beginMonth: "", // 选择的开始年月
            endMonth: "", // 选择的结束年月
            // 限制可选的开始年月
            startMonthOptions: {
                disabledDate: date => {
                    if (this.endMonth) {
                        let endDate = this.getDate(this.endMonth);
                        return (date && date > endDate);
                    } else {
                        return 0;
                    }
                }
            },
            // 限制可选的结束年月
            endMonthOptions: {
                disabledDate: date => {
                    if (this.beginMonth) {
                        let beginDate = this.getDate(this.beginMonth);
                        return (date && date < beginDate);
                    } else {
                        return 0;
                    }
                }
            },
            columns: [
                {
                    title: "时间",
                    key: "time",
                    align: "center"
                },
                {
                    title: "当天批次数量",
                    key: "num",
                    align: "center"
                },
                {
                    title: "相比上一天变化%",
                    key: "changeA",
                    align: "center"
                },
                {
                    title: "当天高风险次数",
                    key: "risksNum",
                    align: "center"
                },
                {
                    title: "相比上一天变化%",
                    key: "changeB",
                    align: "center"
                }
            ],
            data: [
                // {
                //     time: "2020/10/19",
                //     num: 18,
                //     risksNum: 15,
                //     changeA: "33%",
                //     changeB: "33%",
                // },
            ],
            dataOld:[],
        };
    },
    methods: {
        // 选择 日/月/年
        ChooseData(value){
            if(value == 'month'){
                this.dayShow = false;
                this.monthShow = true;
                this.yearShow = false;
                this.columns[1].title = "本月批次数量";
                this.columns[4].title = this.columns[2].title = "相比上月变化%";
                this.columns[3].title = "本月高风险次数";
                this.getTableReport();
            } else if(value == 'year'){
                this.dayShow = false;
                this.monthShow = false;
                this.yearShow = true;
                this.columns[1].title = "本年批次数量";
                this.columns[4].title = this.columns[2].title = "相比上年变化%";
                this.columns[3].title = "本年高风险次数";
                this.getTableReport();
            } else {
                this.dayShow = true;
                this.monthShow = false;
                this.yearShow = false;
                this.columns[1].title = "当天批次数量";
                this.columns[4].title = this.columns[2].title = "相比上一天变化%";
                this.columns[3].title = "当天高风险次数";
                this.getTableReport();
            }
        },
        // 选择时间以后对数据进行筛选
        chooseData(begin, end){
            let result = [];
            if(end == "year"){
                result = this.data.filter((data) =>{
                    return data.chooseTime == begin;
                })
            } else if(begin && end){
                result = this.data.filter((data) => {
                    return data.chooseTime >= begin && data.chooseTime <= end;
                })
            } else {
                result = this.dataOld;
            }
            this.data = result;
        },
        // 获取日期
        getDay(day){
            // let result = [];
            let beginDay = Number(day[0].split('-').join(''));
            let endDay = Number(day[1].split('-').join(''));
            this.chooseData(beginDay, endDay);
        },
        // 获取开始月份
        getBeginMonth(month) {
            this.beginMonth = month;
            this.selectMonth();
        },
        // 获取结束月份
        getEndMonth(month) {
            this.endMonth = month;
            this.selectMonth();
        },
        // 月份选择完毕调用筛选
        selectMonth(){
            if(this.beginMonth && this.endMonth){
                let beginMonth = Number(this.beginMonth.split('-').join(''));
                let endMonth = Number(this.endMonth.split('-').join(''));
                this.chooseData(beginMonth, endMonth);
            }
        },
        // 获取年份
        getYear(year){
            year = Number(year.split('-').join(''));
            this.chooseData(year, "year")
        },
        // 字符串转日期
        getDate(strDate) {
            let monthStr = strDate.split("-")[1];
            let newMonthStr =  parseInt(monthStr)+"";
            strDate = strDate.split("-")[0]+"-"+ newMonthStr +"-1";
            var date = eval(
                "new Date(" +
                    strDate.replace(/\d+(?=-[^-]+$)/, 
                    function(a) {
                        return parseInt(a, 10) - 1;
                    })
                    .match(/\d+/g) + ")"
            );
            return date;
        },
        // 获取报表数据
        getTableReport(){
            if(this.buttonType == "month"){
                this.getReport.type = 2;
            } else if(this.buttonType == "year"){
                this.getReport.type = 3;
            } else {
                this.getReport.type = 1;
            }
            service.getList(this.getReport).then(res => {
                let result = [];
                if (res[0] == null) {
                    result = [];
                } else {
                    for(let i in res){
                        let item ={};
                        item.time = res[i].time;
                        item.chooseTime = Number(item.time.split('.').join(''));
                        item.num = res[i].quantity;
                        item.risksNum = res[i].highRiskQuantity;
                        if(res[i].lastQuantity && res[i].quantity){
                            let x = ((res[i].quantity - res[i].lastQuantity) / res[i].lastQuantity).toFixed(3);
                            item.changeA = x*100 + '%';
                        }
                        if(res[i].lastHighRiskQuantity && res[i].highRiskQuantity){
                            let y = ((res[i].highRiskQuantity - res[i].lastHighRiskQuantity) / res[i].lastHighRiskQuantity).toFixed(3);
                            item.changeB = y*100 + '%';
                        }
                        result.push(item);
                    }
                }
                this.data = result;
                this.dataOld = result;
            })
        },
        downloadFile(){
            let url = `type=${this.getReport.type}&pageNum=${this.getReport.pageNum}&pageSize=${this.getReport.pageSize}`
            window.open(`${base.sq}/general/export-report-form?${url}`)
        },
        // 分页
        stPageChange(val) {
            this.page = val;
        }
    },
    computed:{
        dataLenth(){
            return this.data.length;
        },
        dataParts() {
            let rusult = [];
            let pageArr = [];
            this.data.forEach((item, index) => {
                pageArr.push(item);
                if (
                    pageArr.length >= 7 ||
                    index === this.data.length - 1
                ) {
                    rusult.push(pageArr);
                    pageArr = [];
                }
            });
            return rusult;
        }
    },
    mounted(){
        this.getTableReport();
    }
};
</script>

<style scoped lang="less">
.font14{
    font-size: 14px;
    margin: 0 15px;
}
.monthSpan{
    display: inline-block;
    margin: 0 15px;
    width: 8px;
    border-top: 1px solid #000;
    margin-bottom: 3px;
}
.datePicker{
    width: 200px;
    font-size: 14px
}
.com-Content {
    padding: 27px 37px 40px 36px;
    /deep/.ivu-input {
        font-size: 14px !important;
    }
    /deep/.ivu-table-row {
        height: 65px;
        font-size: 15px;
        color: #999999;
    }
    /deep/.ivu-table-border th {
        height: 60px;
        font-size: 20px;
    }
    /deep/.ivu-table-border td {
        font-size: 18px;
    }
    .ivu-radio-group-button .ivu-radio-wrapper {
        font-size: 14px;
    }
}
.info_title {
    width: 100%;
}
.info_title::after{
    content: '';
    display: block;
    clear: both;
}
.radioGroup{
    float: left;
}
.infoButton{
    float: right;
    width: 80px;
    height: 34px;
    padding: 0;
    border-radius: 5px;
    font-size: 17px;
    font-family: Adobe Heiti Std;
    box-shadow: 0 0 0 2px transparent;
    /deep/span{
        display: block;
        width: 100%;
        height: 100%;
        line-height: 31px;
    }
}

.page {
    position: absolute;
    bottom: 40px;
    right: 30px;
}
</style>
