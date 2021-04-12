import base from "../base"; // 导入接口域名列表
import axios from "../http"; // 导入http中创建的axios实例
import qs from "qs"; // 根据需求是否导入qs模块

const information = {
  //获取环节点
  getinformationnode(params) {
    return axios.get(`${base.sq}/supply-chain-info/rice/nodes`, params);
  },
  //上传基地信息
  setinformationedit(params) {
    return axios.post(`${base.sq}/basement/info`, params);
  },
  //获取基地信息
  getinformationmessage(params) {
    return axios.get(`${base.sq}/basement/info`, {params:params});
  },
  //修改供应链信息
  changeinformationoffer(params) {
    return axios.put(`${base.sq}/supply-chain-info/rice/info`, params);
  },
  //搜索供应链信息
  getinformationoffer(params) {
    return axios.get(`${base.sq}/supply-chain-info/rice/info`, {params:params});
  }
 
}

export default information;