import base from "../base"; // 导入接口域名列表
import axios from "../http"; // 导入http中创建的axios实例
import qs from "qs"; // 根据需求是否导入qs模块

const cloud = {
    getTableInfo(params) {
        return axios.get(`${base.sq}/supply-chain-info/rice/info`,{
            params: params
        });
    },
    getTodayRiskQuantityData() {
        return axios.get(`${base.sq}/home/info/today-risk`);
    },
    getSupplyData(node) {
        return axios.get(`${base.sq}/supply-chain-info/rice/info`,{params:{code: 1, node}});
    },
    getSupplyWords(node) {
        return axios.get(`${base.sq}/supply-chain-info/rice/getPreventionControlStrategy`,{params:{code: 1, node}});
    },
};
export default cloud;