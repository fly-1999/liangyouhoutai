import base from "../base"; // 导入接口域名列表
import axios from "axios"; // 导入http中创建的axios实例
axios.interceptors.response.use(
  res => {
    // NProgress.done();
    if (res.status === 200) {
      if (res.data.code == 200 || res.data.code == 10405) {
        return Promise.resolve(res.data);
      } else {
        return Promise.resolve(res.data);
      }
    } else {
      return Promise.reject(res.data);
    }
  }
);
const key = "9b74275bc30043e2b12e3383e291dde0"
const weather = {
  /**
   * @description 获取地区ID
   * @param { Object{location: String, adm?: String} } params 请求参数
   */
  getCityID(params) {
    return axios.get(base.cityID, { params: { ...params, key } })
  },

  /**
   * 通过ID获取当前天气
   * @param { Object{location: String} } params   location表示ID
   */
  getWeatherNowByID(params) {
    return axios.get(`${base.weather}/v7/weather/now`, { params: { ...params, key } });
  },

  /**
   * 通过ID获取七天的预报
   * @param { Object{location: String} } params   location表示ID
   */
  getWeather7dByID(params) {
    return axios.get(`${base.weather}/v7/weather/7d`, { params: { ...params, key } });
  },

  /**
   * 通过城市name获取当天的预报,默认选取第一个
   * @param { Object{name: String} } params   
   */
  getWeatherNowByName(params) {
    return new Promise((resolve, reject) => {
      this.getCityID({ location: params.name }).then(res => {
        if (res.location[0]) {
          axios.get(`${base.weather}/v7/weather/now`, { params: { location: res.location[0].id, key } }).then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        } else {
          reject(new error("no city"))
        }
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * 通过城市name获取七天的预报
   * @param { Object{name: String} } params
   */
  getWeather7dByName(params) {
    return new Promise((resolve, reject) => {
      this.getCityID({ location: params.name }).then(res => {
        if (res.location[0]) {
          axios.get(`${base.weather}/v7/weather/7d`, { params: { location: res.location[0].id, key } }).then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        } else {
          reject(new error("no city"))
        }
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * 通过城市name获取24小时天气
   * @param { Object{name: String} } params
   */
  getWeather24hByName(params) {
    return new Promise((resolve, reject) => {
      this.getCityID({ location: params.name }).then(res => {
        if (res.location[0]) {
          axios.get(`${base.weather}/v7/weather/24h`, { params: { location: res.location[0].id, key } }).then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        } else {
          reject(new error("no city"))
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
};
export default weather