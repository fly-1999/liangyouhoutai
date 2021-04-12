<template>
  <div class="year-statistics">
    <div class="year-statistics-header">
      <div class="year-statistics-header-title">年度统计</div>
      <DatePicker format="yyyy" type="year" placeholder="" class="year-statistics-header-date" @on-change="setData"></DatePicker>
      <Button type="primary" ghost class="year-statistics-header-button" @click="goBack">返回</Button>
      <Button type="primary" :ghost='isShowChart' class="year-statistics-header-button" @click="setShowChart">切换</Button>
    </div>
    <div class="month-warn-content">
      <YearChart v-show="isShowChart" style="padding: 30px 0 0;height: 40rem; width: 100%; height: 100%" :column="chartData.column" :data="chartData.data" showColumn/>
      <Table v-show="!isShowChart" disabled-hover border :columns="tableColumns" :data="tableData"></Table>
    </div>
  </div>
</template>

<script>
import YearChart from "../components/YaerChart"
import MainTable from "../components/mainTable"
import api from '@/api'
const {main} = api
export default {
  name: "YearStatics",
  components: {
    YearChart
  },
  props: {
    basicData: Array
  },
  data() {
    return({
      isShowChart: true,
      tableColumns: [
        {
          title: '时间',
          key: 'time',
          align: 'center',
          className: "table-style",
        },
        {
          title: '销售额(平均值)',
          key: 'sales',
          align: 'center',
          className: "table-style",
        },
        {
          title: '扫码次数(平均数)',
          key: 'scanNum',
          align: 'center',
          className: "table-style",
        }
      ],
      getData: null
    })
  },
  computed: {
    nowData() {
      return !this.getData ? this.basicData : this.getData
    },
    tableData() {
      return this.nowData.map(item => ({time: item.time, sales: item.sales, scanNum: item.scanNum}))
    },
    chartData() {
      let timeArr = []
      let salesArr = []
      let warnArr = []
      let scanArr = []
      this.nowData.forEach(item => {
        timeArr.push(item.time)
        salesArr.push(item.sales)
        warnArr.push(item.warnNum)
        scanArr.push(item.scanNum)
      })
      return {column: timeArr, data:[salesArr, warnArr, scanArr]}
    }
  },
  methods: {
    setShowChart() {
      this.isShowChart = !this.isShowChart
    },
    goBack() {
      this.$router.go(-1)
    },
    getYearlyQuantityData(year) {
      main.getYearlyQuantityData(year).then(res => {
        let {batch, risk, statistics} = res
        let longArr = null
        let result = []
        if(batch.length < risk.length) {
            longArr = "risk"
            if(risk.length < statistics.length) {
                longArr = "statistics"
            }
        }else {
            longArr = "batch"
            if(batch.length < statistics.length) {
                longArr = "statistics"
            }
        }
        switch(longArr) {
            case "risk":
                result = risk.map(item => ({
                    time: item.time,
                    warnNum: item.quantity,
                    sales: batch.find(item1 => item1.time === item.time) ? batch.find(item1 => item1.time === item.time).quantity : 0,
                    scanNum: statistics.find(item1 => item1.time === item.time) ? statistics.find(item1 => item1.time === item.time).quantity : 0,
                }))
            break
            case 'batch':
                result = batch.map(item => ({
                    time: item.time,
                    sales: item.quantity,
                    warnNum: risk.find(item1 => item1.time === item.time) ? risk.find(item1 => item1.time === item.time).quantity : 0,
                    scanNum: statistics.find(item1 => item1.time === item.time) ? statistics.find(item1 => item1.time === item.time).quantity : 0,
                }))
            break
            case 'statistics': 
                result = statistics.map(item => ({
                    time: item.time,
                    scanNum: item.quantity,
                    warnNum: risk.find(item1 => item1.time === item.time) ? risk.find(item1 => item1.time === item.time).quantity : 0,
                    sales: batch.find(item1 => item1.time === item.time) ? batch.find(item1 => item1.time === item.time).quantity : 0,
                }))
            break;
        }
      this.getData = result;
    })
},
    setData(val) {
      this.getYearlyQuantityData(val)
    }
  }
}
</script>
  
<style lang="less" scoped>
@fontFamily: Adobe Heiti Std R;
  .year-statistics {
    width: 100%;
    height: 100%;
    background: #fff;
    &-header {
      position: relative;
      width: 100%;
      height: 10%;
      border-bottom: 1px solid #E6E6E6;
      &-title {
        display: inline-block;
        margin-left: 36px;
        font-size: 30px;
font-family: @fontFamily;
font-weight: bold;
        color: #333;
        line-height: 68px;
        vertical-align: middle;
      }
      &-date {
        display: inline-block;
        margin-left: 26px;
        width: 181px;
        height: 32px;
        vertical-align: middle;
      }
      &-button {
        position: absolute;
        top: 50%;
        width: 83px;
        height: 39px;
        font-size: 18px;
        transform: translate(0, -50%);
        &:nth-of-type(1) {
          right: 43px;
        }
        &:nth-of-type(2) {
          right: 165px;
        }
      }
    }
  }
  .month-warn-content {
    padding: 0 50px 0;
    height: 90%;

    &-chart{
      width: 100%;
      height: 100%;
    }
  }
  /deep/.table-style {
    height: 78px;
    font-size: 19px;
font-family: @fontFamily;
    color: #333;
    background: #fff;
  }
  /deep/.ivu-table-tbody .table-style {
    color: #999;
  }
  /deep/thead span {
    font-size: 23px;
  }
</style>