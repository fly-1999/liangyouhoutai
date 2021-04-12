import base from "../base"; // 导入接口域名列表
import axios from "../http"; // 导入http中创建的axios实例
import qs from "qs"; // 根据需求是否导入qs模块

const setting = {
  // 获取权限列表
  getPermiss() {
    return axios.get(`${base.sq}/system/settings`);
  },
  // 更新权限
  postUpPermiss(params) {
    return axios.post(`${base.sq}/system/settings`, qs.stringify(params));
  },
  // 删除权限
  deletePermiss(params) {
    return axios.delete(`${base.sq}/system/settings`, {
      params: params
    });
  },
  // 获取用户列表
  getUsers(params) {
    return axios.get(`${base.sq}/system/users`, {
      params: params
    });
  },
  // 增加用户
  postCreate(params) {
    return axios.post(`${base.sq}/system/users`, params);
  },
  // 更新用户信息
  putUpDate(params) {
    return axios.put(`${base.sq}/system/users`, params);
  },
  // 删除用户
  deleteUser(params) {
    return axios.delete(`${base.sq}/system/users`, {
      data: params
    });
  },
  // 获取电话号码
  getPhone(){
    return axios.get(`${base.sq}/system/info`);
  },
  putPhone(params){
    return axios.put(`${base.sq}/system/info`,qs.stringify(params));
  }
  
}
export default setting;
