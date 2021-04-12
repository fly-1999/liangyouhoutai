import base from "../base"; // 导入接口域名列表
import axios from "../http"; // 导入http中创建的axios实例

const getLogistics = {
  //获取所有数据的总数
  getAllData(code) {
    return new Promise((res,rej) => {
      axios.get(`${base.sq}/general-service/logistics/code`,{params:{code}}).then(res1 => {
        let productCode = res1[0].productCode>0 ? res1[0].productCode : 1
        axios.get(`${base.sq}/supply-chain-info/getByCode`,{params:{code: productCode}}).then(res2 => {
          res([res1[0],res2])
        }).catch(err => {
          rej(err)
        })
      }).catch(err => {
        rej(err)
      })
    })
  }
}
export default getLogistics