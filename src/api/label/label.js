import base from "../base"; // 导入接口域名列表
import axios from "../http"; // 导入http中创建的axios实例
const label = {
  getLabelData(code) {
    let sentArr = []
    for(let i = 1; i <= 12; i++) {
      sentArr.push(axios.get(`${base.sq}/supply-chain-info/rice/info`,{params: {code,node: i}}))
    }
    return Promise.all(sentArr)
  }
}
export default label