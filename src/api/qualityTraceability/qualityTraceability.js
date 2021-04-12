import base from "../base"; // 导入接口域名列表
import axios from "../http"; // 导入http中创建的axios实例
import qs from "qs"; // 根据需求是否导入qs模块

const ak='TWIPOkX4zp0jpgz0uDSRPdir8mT5GP8d';
const qualityTraceability = {
  getChainData(code) {
    return axios.get(`${base.sq}/supply-chain-info/rice/info`,{params:{code, node:1}})
  },
  getAllCode() {
    return axios.get(`${base.sq}/stat/supplychain/code/list`,{params:{isLast:0}})
  },
  //溯源统计
  getSupplyInfoByCode(code) {
    return axios.get(`${base.sq}/supply-chain-info/getByCode`,{params:{code}})
  },
  //获取物流信息
  getservice(params) {
    return axios.get(`${base.sq}/general-service/logistics/all`, {params:params});
  },
  //创建物流信息
  createservice(params) {
    return axios.post(`${base.sq}/general-service/logistics/new`, params);
  },
  //删除物流信息
  deleteservice(params) {
    return axios.delete(`${base.sq}/general-service/logistics/id`, {
        params: params
      });
  },
  //修改物流信息
  updateservice(params) {
    return axios.put(`${base.sq}/general-service/logistics/id`, params);
  },
  //获取经纬度
  getbaidulocation(params){
    return axios.get(`${base.baidu}/geocoding/v3/`, { params: { ...params, ak } });
  }
}

export default qualityTraceability;
