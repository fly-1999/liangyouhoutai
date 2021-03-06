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
          if(item === "????????????" || item === "???????????????" || item === "???????????????") {
            result["information"].push(item)
          }else if(item === "??????????????????" || item === "????????????????????????" || item === "???????????????") {
            result["earlyWarning"].push(item)
          }else if(item === "????????????" || item === "????????????" || item === "????????????") {
            result["qualityTraceability"].push(item)
          }else if(item === "????????????" || item === "???????????????" || item === "????????????") {
            result["service"].push(item)
          }else if(item === "????????????" || item === "????????????") {
            result["setting"].push(item)
          }
        })
        state.commit("setAccess",result)
        state.commit("setHasGetInfo", true)
      })
    }
  }
}
