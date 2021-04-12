import Main from '@/components/main'
import homePng from '@/assets/icons/home.png'
import xxcj from '@/assets/icons/xxcj.png'
import yjpg from '@/assets/icons/yjpg.png'
import zlsy from '@/assets/icons/zlsy.png'
import zhfw from '@/assets/icons/zhfw.png'
import xtsz from '@/assets/icons/xtsz.png'
export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: false,
      notCache: true,
      icon: homePng,
      requireAuth: true
    },
    children: [
      {
        path: '/home',
        name: '主页',
        component: () => import('@/view/home'),
        meta: {
          title: '主页',
          notCache: true,
          requireAuth: true
        },
        children: [
          {
            name: '主页',
            path: '/',
            component: () => import('@/view/home/page/main'),
            meta: {
              title: '主页',
              notCache: true,
              requireAuth: true
            }
          },
          {
            name: '主页',
            path: 'weather',
            meta: {
              title: '天气',
              notCache: true,
              requireAuth: true
            },
            component: () => import('@/view/home/page/weather')
          },
          {
            name: '主页',
            path: 'day/batch',
            meta: {
              title: '当天批次数量',
              notCache: true,
              requireAuth: true
            },
            component: () => import('@/view/home/page/DayBatch')
          },
          {
            name: '主页',
            path: 'day/warn',
            meta: {
              title: '当天预警次数',
              notCache: true,
              requireAuth:true
            },
            component: () => import('@/view/home/page/DayWarn')
          },
          {
            name: '主页',
            path: 'month/batch',
            meta: {
              title: '本月预警次数',
              notCache: true,
              requireAuth:true
            },
            component: () => import('@/view/home/page/MonthBatch')
          },
          {
            name: '主页',
            path: 'month/warn',
            meta: {
              title: '本月预警次数',
              notCache: true
            },
            component: () => import('@/view/home/page/MonthWarn')
          },
          {
            name: '主页',
            path: 'year/statistics',
            meta: {
              title: '年度统计',
              notCache: true
            },
            component: () => import('@/view/home/page/YearStatistics')
          }
        ]
      }
    ]
  },
  {
    path: '/information',
    name: 'information',
    component: Main,
    meta: {
      hideInMenu: false,
      notCache: true,
      icon: xxcj,
      requireAuth: true
    },
    children: [
      {
        path: '/information',
        name: '信息采集',
        meta: {
          title: '信息采集',
          notCache: true,
          requireAuth: true
        },
        component: () => import('@/view/information/information.vue'),
      }
    ]
  },
  {
    path: '/earlyWarning',
    name: 'earlyWarning',
    component: Main,
    meta: {
      hideInMenu: false,
      notCache: true,
      icon: yjpg,
      requireAuth: true
    },
    children: [
      {
        path: '/earlyWarning',
        name: '预警防控',
        meta: {
          title: '预警防控',
          notCache: true,
          requireAuth: true
        },
        component: () => import('@/view/earlyWarning')
      },
    ]
  },
  {
    path: '/qualityTraceability',
    name: 'qualityTraceability',
    component: Main,
    meta: {
      hideInMenu: false,
      notCache: true,
      icon: zlsy,
      requireAuth: true
    },
    children: [
      {
        path: '/qualityTraceability',
        name: '质量溯源',
        meta: {
          title: '质量溯源',
          notCache: true,
          requireAuth: true
        },
        component: () => import('@/view/qualityTraceability')
      }
    ]
  },
  {
    path: '/service',
    name: 'service',
    component: Main,
    meta: {
      hideInMenu: false,
      notCache: true,
      icon: zhfw,
      requireAuth: true
    },
    children: [
      {
        path: '/service',
        name: '综合服务',
        meta: {
          title: '综合服务',
          // pageTitle:"中南地区稻米供应链重金属风险快速预警及防控系统",
          notCache: true,
          requireAuth: true
        },
        component: () => import('@/view/service')
      }
    ]
  },
  {
    path: '/setting',
    name: 'setting',
    component: Main,
    meta: {
      hideInMenu: false,
      notCache: true,
      icon: xtsz,
      requireAuth: true
    },
    children: [
      {
        path: '/setting',
        name: '系统设置',
        meta: {
          title: '系统设置',
          notCache: true,
          requireAuth: true
        },
        component: () => import('@/view/setting'),
        // 重定向到基本设置，重定向会让侧边的选中效果出现未选中的bug，改了写法
        // redirect:'/setting/setingList',
        // 基本设置的子路由
        // children:[
        //  {
        //    path: '/setting/setingList',
        //    name: '基本设置',
        //    meta: {
        //      title: '中南地区稻米供应链重金属风险快速预警及防控系统',
        //      notCache: true
        //    },
        //    component: () => import('@/view/setting/setingList')
        //  },
        //  {
        //    path: '/setting/setingUser',
        //    name: '用户设置',
        //    meta: {
        //      title: '中南地区稻米供应链重金属风险快速预警及防控系统',
        //      notCache: true
        //    },
        //    component: () => import('@/view/setting/setingUser')
        //  },
        // ]
      },

    ]
  },
  {
    path: '/cloud-platform',
    name: '粮油食品供应链云平台',
    meta: {
      hideInMenu: true,
      notCache: true,
      title: '粮油食品供应链云平台',
      requireAuth: true
    },
    component: () => import('@/view/earlyWarning/component/cloud-platform')
  },
  {
    path: '/dataAnalysis',
    name: '粮油食品供应链大数据分析',
    meta: {
      hideInMenu: true,
      notCache: true,
      title: '粮油食品供应链大数据分析',
      requireAuth: true
    },
    component: () => import('@/view/service/component/dataAnalysis')
  },
  {
    path: '/logistics/:id',
    name: "追溯码",
    meta: {
      hideInMenu: true,
      notCache: true,
      title: "追溯码",
      requireAuth: true
    },
    component: () => import('@/view/logistics')
  },
  {
    path: '/label/:id',
    name: "标签打印",
    meta: {
      hideInMenu: true,
      notCache: true,
      title: "标签打印",
      requireAuth: true
    },
    component: () => import('@/view/label')
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
