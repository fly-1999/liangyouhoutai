"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _base = _interopRequireDefault(require("../base"));

var _http = _interopRequireDefault(require("../http"));

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 导入接口域名列表
// 导入http中创建的axios实例
// 根据需求是否导入qs模块
var setting = {
  // 获取权限列表
  getPermiss: function getPermiss() {
    return _http["default"].get("".concat(_base["default"].sq, "/system/settings"));
  },
  // 更新权限
  postUpPermiss: function postUpPermiss(params) {
    return _http["default"].post("".concat(_base["default"].sq, "/system/settings"), _qs["default"].stringify(params));
  },
  // 删除权限
  deletePermiss: function deletePermiss(params) {
    return _http["default"]["delete"]("".concat(_base["default"].sq, "/system/settings"), {
      params: params
    });
  },
  // 获取用户列表
  getUsers: function getUsers(params) {
    return _http["default"].get("".concat(_base["default"].sq, "/system/users"), params);
  },
  // 增加用户
  postCreate: function postCreate(params) {
    return _http["default"].post("".concat(_base["default"].sq, "/system/users"), params);
  },
  // 更新用户信息
  putUpDate: function putUpDate(params) {
    return _http["default"].put("".concat(_base["default"].sq, "/system/users"), params);
  },
  // 删除用户
  deleteUser: function deleteUser(params) {
    return _http["default"]["delete"]("".concat(_base["default"].sq, "/system/users"), {
      params: params
    });
  }
};
var _default = setting;
exports["default"] = _default;