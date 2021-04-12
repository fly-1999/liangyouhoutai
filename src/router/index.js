import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
// canTurnTo
import { getToken, setTitle } from '@/libs/util'
// import config from '@/config'
// const { homeName } = config

Vue.use(Router)
const router = new Router({
  routes
})
const LOGIN_PAGE_NAME = 'login'
const canTurnTo = (name, access, routes) => {
  if (name === 'home') {
    return true
  }
  if(name === 'earlyWarning' && (access["service"].find(item => item==="大数据分析"))) return true
  if (access[name]) {
    if (access[name].length === 0) {
      return false
    }
  }
  return true
}
const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  var token = getToken()
  next()
  if(to.name === "追溯码" || to.name === "标签打印") {
    next()
  }else if (!token && to.name !== LOGIN_PAGE_NAME) {
    next({
      name: LOGIN_PAGE_NAME
    })
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    next({
      path: '/'
    })
  }else {
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.access, next)
    } else {
      if (token) {
        store.dispatch('getUserInfo', next)
      }
    }
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
