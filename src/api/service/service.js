import base from "../base"; // 导入接口域名列表
import axios from "../http"; // 导入http中创建的axios实例
import qs from "qs"; // 根据需求是否导入qs模块

const service = {
  //信息公告
  getInfo(params) {
    return axios.get(`${base.sq}/general/publish-info`, {
      params: params
    });
  },
  // 创建
  create(params) {
    return axios.post(`${base.sq}/general/publish-info`, params);
  },
  //根据时间和地区id，查询每个地区的各个预警等级的总和
  getAreaRank(params) {
    return axios.get(`${base.sq}/stat/comprehensive/area`, {params})
  },
  getNodeRank() {
    let arr = []
    for(let i = 0;i < 12; i++) {
        arr.push(axios.get(`${base.sq}/stat/supplychain/node`, {params:{node: i+1}}))
    }
    return Promise.all(arr)
  },
  getNodeRankByCode(code) {
    let arr = []
    for(let i = 0;i < 12; i++) {
        arr.push(axios.get(`${base.sq}/stat/supplychain/nodeAndCode`, {params:{node: i+1,productCode:code}}))
    }
    return Promise.all(arr)
  },
  getElementRank() {
    return axios.get(`${base.sq}/stat/comprehensive/element/all`)
  },
  getList(params){
    return axios.get(`${base.sq}/general/report-form`, { params })
  },
  download(params){
    return axios.get(`${base.sq}/general/export-report-form`, { params },{ responseType: 'blob'})
  },
  getRiskAll() {
    return axios.get(`${base.sq}/stat/comprehensive/area/all`)
  },
  getCodeAll() {
    return axios.get(`${base.sq}/stat/supplychain/code/list`,{params:{isLast: 0}})
  },
  getBatch(startTime, endTime) {
    return axios.get(`${base.sq}/analysis/batch`,{params:{minCreatedTime: startTime, maxCreatedTime: endTime}})
  },
  getTraceability(startTime, endTime, code) {
    if(code) {
      return axios.get(`${base.sq}/analysis/traceability`,{params:{minCreatedTime: startTime, maxCreatedTime: endTime, productCode: code}})
    }else {
      return axios.get(`${base.sq}/analysis/traceability`,{params:{minCreatedTime: startTime, maxCreatedTime: endTime}})
    }
  }
};
export default service;
