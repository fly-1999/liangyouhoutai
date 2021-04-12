import base from "../base"; // 导入接口域名列表
import axios from "../http"; // 导入http中创建的axios实例

const getMain = {
  //获取所有数据的总数
  getTotalData() {
    return axios.get(`${base.sq}/home/info`)
  },
  //获取每天批次
  getDayBatch() {
    return axios.get(`${base.sq}/home/info/product-batch-quantity-day/list`)
  },
  //获取每小时批次
  getHourBatch() {
    return axios.get(`${base.sq}/home/info/product-batch-quantity-hour/list`)
  },
  //获取每天风险等级
  getDayWarn() {
    return axios.get(`${base.sq}/home/info/high-risk-day/list`)
  },
  //获取每小时风险等级
  getHourWarn() {
    return axios.get(`${base.sq}/home/info/high-risk-hour/list`)
  },
  //年度统计
  getYearlyQuantityData(year) {
    let time = `${year}-01-01`
    return axios.get(`${base.sq}/home/info/yearly-data`,{params: {time}})
  }
}
export default getMain