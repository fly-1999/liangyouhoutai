/**
 * api接口的统一出口
 */
// 首页接口
import login from './login/login'
//预警防控
import warning from './warning/warning'
//信息采集
import information from './information/information'

import service from './service/service'
//天气
import weather from "./weather/weather"
//主页
import main from "./main/main"
// 系统设置
import setting from "./setting/setting"
// 云平台
import cloud from "./cloud/cloud"
//质量溯源
import qualityTraceability from './qualityTraceability/qualityTraceability'
//物流追溯码
import logistics from './logistics/logistics'
//标签打印码
import label from './label/label'
export default {
  login,
  warning,
  information,
  service,
  weather,
  setting,
  main,
  cloud,
  qualityTraceability,
  logistics,
  label
};
