<template>
  <div class="logistics">
    <div class="logistics-header">
      扫码结果
    </div>
    <div class="logistics-item">
      <div class="logistics-item-title">
        中南海地区稻米供应链
      </div>
      <table class="logistics-item-table1">
        <tr>
          <td colspan="6">
            <span style="float: left;margin-left: 20pt">批次编号:{{data[0] ? data[0].productCode : 1}}</span>
            <span style="float: right;margin-right: 20pt">产品名称:{{data[0] ? data[0].productName : ""}}</span>
          </td>
        </tr>
        <tr>
          <td rowspan="2">供应链环节</td>
          <td colspan="3">实测预测值(mg/kg)</td>
          <td rowspan="2">检测人员</td>
          <td rowspan="2">检测时间</td>
        </tr>
        <tr>
          <td>镉</td>
          <td>铅</td>
          <td>砷</td>
        </tr>
        <tr v-for="(item,index) in data" :key="index">
          <td>{{item.riceSupplyChainNode}}</td>
          <td>{{item.realMeasureCadmium}}</td>
          <td>{{item.realMeasureLead}}</td>
          <td>{{item.realMeasureArsenic}}</td>
          <td></td>
          <td>{{getFormatDate(item.createdTime)}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import API from "@/api"
import {getDate} from "@/libs/tools.js"
export default {
  name: "label",
  data() {
    return {
      data: []
    }
  },
  beforeRouteEnter (to, from, next) {
    //qgmdyhlqddonsgi
    API.label.getLabelData(to.params.id).then(res => {
      next((vm) => {
        vm.data = res
      })
    }).catch(err => {
      next("/404")
    })
  },
  methods: {
    getFormatDate(time) {
      return getDate(time/1000,"year").slice(0,10)
    }
  },
  computed: {

  }
}
</script>

<style lang="less" scoped>
.logistics {
  overflow: auto;
  &-header {
    font-size: 18pt;
    line-height: 40pt;
    text-align: center;
    border-bottom: .5pt solid #E6E6E6;
    color: #333;
    font-weight: bold;
  }
  &-item {
    margin: 16pt auto;
    width: 90%;
    &-title {
      font-size: 14pt;
      font-weight: bold;
      text-align: center;
      color: #333;
    }
    &-table1 {
      margin-top: 15pt;
      width: 100%;
      border: .5pt solid #E6E6E6;
      border-collapse:collapse;
      table-layout: fixed;
      td {
        min-width: 40%;
        height: 28pt;
        font-size: 9pt;
        color: #333;
        vertical-align: middle;
        text-align: center;
        border: .5pt solid #E6E6E6;
      }
    }
    &-table2 {
      margin-top: 15pt;
      width: 100%;
      border: .5pt solid #E6E6E6;
      border-collapse:collapse;
      >tr:first-of-type {
        td {
          line-height: 20.5pt;
        }
      }
      td {
        font-size: 9pt;
        color: #333;
        line-height: 19pt;
        text-align: center;
        border: .5pt solid #E6E6E6;
      }
    }
  }
}
</style>