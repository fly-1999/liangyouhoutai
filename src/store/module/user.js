import { setToken, getToken } from '@/libs/util'
import API from "@/api"
import {getPermission} from "@/libs/util"
export default {
  state: {
    userName: '',
    userId: '',
    avatarImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false,
    unreadCount: 0,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {}
  },
  mutations: {
    setAvatar(state, avatarPath) {
      state.avatarImgPath = avatarPath
    },
    setUserId(state, id) {
      state.userId = id
    },
    setUserName(state, name) {
      state.userName = name
    },
    setAccess(state, access) {
      state.access = access
    },
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo(state, status) {
      state.hasGetInfo = status
    },
    setMessageCount(state, count) {
      state.unreadCount = count
    },
    setMessageUnreadList(state, list) {
      state.messageUnreadList = list
    },
    setMessageReadedList(state, list) {
      state.messageReadedList = list
    },
    setMessageTrashList(state, list) {
      state.messageTrashList = list
    },
    updateMessageContentStore(state, { msg_id, content }) {
      state.messageContentStore[msg_id] = content
    },
    moveMsg(state, { from, to, msg_id }) {
      const index = state[from].findIndex(_ => _.msg_id === msg_id)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    },
    logout(state) {
      state.access = ""
      state.hasGetInfo = false
    }
  },
  getters: {
    messageUnreadCount: state => state.messageUnreadList.length,
    messageReadedCount: state => state.messageReadedList.length,
    messageTrashCount: state => state.messageTrashList.length
  },
  actions: {
    getUserInfo(state, next) {
      API.setting.getPermiss().then(res => {
        if(!res) {
          setToken("")
          next({ replace: true, name: 'login' })
        }
        let permission = parseInt(getPermission())
        let resultArr = []
        let result = {
          "information": [],
          "earlyWarning": [],
          "qualityTraceability": [],
          "service": [],
          "setting": []
        }
        for(let i in res) {
          if(res[i].find(item => item.id === permission)) {
            resultArr.push(i)
          }
        }
        resultArr.forEach(item => {
          if(item === "基地信息" || item === "供应链信息" || item === "子系统信息") {
            result["information"].push(item)
          }else if(item === "预测加权配置" || item === "危险物风险门限值" || item === "供应链权重") {
            result["earlyWarning"].push(item)
          }else if(item === "物流跟踪" || item === "标签打印" || item === "溯源查询") {
            result["qualityTraceability"].push(item)
          }else if(item === "信息公告" || item === "大数据分析" || item === "报表管理") {
            result["service"].push(item)
          }else if(item === "基本设置" || item === "用户管理") {
            result["setting"].push(item)
          }
        })
        state.commit("setAccess",result)
        state.commit("setHasGetInfo", true)
      })
    }
  }
}
