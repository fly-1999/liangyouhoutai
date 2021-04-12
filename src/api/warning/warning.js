import base from "../base"; // 导入接口域名列表
import axios from "../http"; // 导入http中创建的axios实例

const warning = {
    getPredictionModel() {
        return axios.get(`${base.sq}/alarm/model/prediction`);
    },
    updataPredictionModel(params) {
        return axios.put(`${base.sq}/alarm/model/prediction`, params);
    },
    getSupplyChainModel() {
        return axios.get(`${base.sq}/alarm/model/supplychain`);
    },
    updataSupplyChainModel(params) {
        return axios.put(`${base.sq}/alarm/model/supplychain`,params);
    },
    getThresholdModel() {
        return axios.get(`${base.sq}/alarm/model/threshold`);
    },
    updataThresholdModel(params) {
        return axios.put(`${base.sq}/alarm/model/threshold`,params);
    },
};
export default warning
