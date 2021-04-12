"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _login = _interopRequireDefault(require("./login/login"));

var _warning = _interopRequireDefault(require("./warning/warning"));

var _information = _interopRequireDefault(require("./information/information"));

var _service = _interopRequireDefault(require("./service/service"));

var _weather = _interopRequireDefault(require("./weather/weather"));

var _main = _interopRequireDefault(require("./main/main"));

var _setting = _interopRequireDefault(require("./setting/setting"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * api接口的统一出口
 */
// 首页接口
//预警防控
//信息采集
//天气
//主页
// 系统设置
var _default = {
  login: _login["default"],
  warning: _warning["default"],
  information: _information["default"],
  service: _service["default"],
  weather: _weather["default"],
  setting: _setting["default"],
  main: _main["default"]
};
exports["default"] = _default;