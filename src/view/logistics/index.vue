<template>
  <div class="logistics">
    <div class="logistics-header">
      扫码结果
    </div>
    <div class="logistics-item">
      <div class="logistics-item-title">
        车辆信息
      </div>
      <table class="logistics-item-table1">
        <tr>
          <td>出发时间</td>
          <td>{{logisticsData.departureTime}}</td>
        </tr>
        <tr>
          <td>抵达时间</td>
          <td>{{logisticsData.arrivalTime}}</td>
        </tr>
        <tr>
          <td>出发地</td>
          <td>{{logisticsData.departureAddr}}</td>
        </tr>
        <tr>
          <td>到达地</td>
          <td>{{logisticsData.arrivalAddr}}</td>
        </tr>
        <tr>
          <td>车牌号</td>
          <td>{{logisticsData.vehiclePlate}}</td>
        </tr>
        <tr>
          <td>司机姓名</td>
          <td>{{logisticsData.driverName}}</td>
        </tr>
        <tr>
          <td>联系方式</td>
          <td>{{logisticsData.driverContact}}</td>
        </tr>
        <tr>
          <td>物品名称</td>
          <td>{{logisticsData.cargoName}}</td>
        </tr>
        <tr>
          <td>物品数量</td>
          <td>{{logisticsData.quantity}}</td>
        </tr>
      </table>
    </div>
    <div class="logistics-item">
      <div class="logistics-item-title">
        环节信息
      </div>
      <table class="logistics-item-table2">
        <tr>
          <td>供应链环节</td>
          <td>危害物信息</td>
          <td>风险等级</td>
        </tr>
        <tr v-for="(item,index) in chainData" :key="index">
          <td>{{item.node}}</td>
          <td>{{item.logistics}}</td>
          <td>{{item.risk}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import API from "@/api"
import {getDate} from "@/libs/tools.js"
export default {
  name: "logistics",
  data() {
    return {
      data: [{},[]]
    }
  },
  beforeRouteEnter (to, from, next) {
    //qgmdyhlqddonsgi
    API.logistics.getAllData(to.params.id).then(res => {
      next((vm) => {
        vm.data = res
      })
    }).catch(err => {
      next("/404")
    })
  },
  methods: {
    getLogistics(arsenic, cadmium, lead) {
        let arrStr = []
        if(arsenic>0) {
            arrStr.push("砷")
        }
        if(cadmium>0) {
            arrStr.push("镉")
        }
        if(lead>0) {
            arrStr.push("铅")
        }
        if(arrStr.length === 0) {
            return "无"
        }
        return arrStr.join("/")
    },
    getRisk(riskNum) {
        switch(riskNum) {
            case 3:
                return "高风险"
            case 2:
                return "中风险"
            default:
                return "低风险"
        }
    },
  },
  computed: {
    logisticsData() {
      return {
        arrivalTime: this.data[0].arrivalTime ? getDate(this.data[0].arrivalTime/1000,"year") : "",
        departureTime: this.data[0].departureTime ? getDate(this.data[0].departureTime/1000,"year") : "",
        departureAddr: this.data[0].departureAddr || "",
        arrivalAddr: this.data[0].arrivalAddr || "",
        vehiclePlate: this.data[0].vehiclePlate || "",
        driverName: this.data[0].driverName || "",
        driverContact: this.data[0].driverContact || "",
        cargoName: this.data[0].cargoName || "",
        quantity: this.data[0].quantity || ""
      }
    },
    chainData() {
      return this.data[1].map(item => {
        return {
          node: item.riceSupplyChainNode,
          logistics: this.getLogistics(item.arsenic, item.cadmium, item.lead),
          risk: this.getRisk(item.levelWorkingnodeAll)
        }
      })
    }
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