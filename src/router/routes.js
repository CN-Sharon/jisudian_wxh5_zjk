const _import = require(`./_import_${process.env.NODE_ENV}`)
const layout = _import('layout/index')

/**
 *
 * meta 标签字段
 * @param {*} isTab: [boolean]  该页面是否需要是切换的主页面，是的话需要调取未读信息接口，判断是否需要展示未读信息红点
 * @param {*} requiredUserInfo: [boolean]  该页面是否需要用户信息，如果需要store里没有用户信息将会去拉取用户信息
 * @param {*} white: [boolean]             白名单页面，路由拦截器不拦截，直接放行
 * @param {*} cache: [boolean]             是否缓存 配合keep-alive
 * @param {*} wxsdk: [boolean]             是否需要使用wx jssdk 默认 false 开启后路由钩子函数自动请求
 */

export default [
  {
    path: '',
    beforeEnter(to, from, next){
      console.log(6666,`${window.location.protocol}//${document.domain}/wx${to.fullPath}`)
      window.location.replace(`${window.location.protocol}//${document.domain}/wx${to.fullPath}`)
  //         let host, route, token
  //         try {
  //           let t = document.URL.split('?')
  //           host = t[0] + '#/'
  //       let query = getQuery(t[1])
  //       route = query['page'] + '/index'
  //               token = query['token']
  //               let index = token.indexOf('#')
  //               if (index != -1) {
  //                   token = token.substring(0, index)
  //               }
  //               console.log(`domain`, host + route + '?token=' + token)
  //           window.location.replace(host + route + '?token=' + token)
  //         } catch (error) {
  //           console.log(error)
  //           next('/home/index')
  //         }
     }
    },
  {
    path: '/',
    redirect: '/home',
  },
  {
    component: _import('error/404'),
    name: 'error-404',
    path: '/404'
  },
  {
    component: _import('error/500'),
    name: 'error-500',
    path: '/500'
  },
  {
    path: '*', redirect: '/404'
  },
  // ** 以下是【测试】模块
  // 登录页面
  {
    path: '/test-login',
    name: 'testLogin',
    component: _import('login/index'),
    meta: {
      userType: 1,
    }
  },
  // 空白页面
  {
    path: '/white',
    name: 'white',
    component: _import('white/index'),
    meta: {
      userType: 1,
      wxsdk:true,
    }
  },
  // 首页
  {
    path: '/home',
    component: layout,
    redirect: '/home/tab/index',
    meta: {
      // requiredUserInfo: true
      userType: 1
    },
    children: [
      {
        path: 'tab',
        component: _import('layout/tabbar'),
        meta: {title: '首页', userType: 1,},
        children: [
          {
            path: 'index',
            name: 'home',
            component: _import('home/home'),
            meta: {
              title: '首页',
              wxsdk:true,
              isTab:true,
              userType: 1
            },
          },
          {
            path: 'info',
            name: 'info-info',
            component: _import('info/info'),
            meta: {
              title: '个人中心',
              requiredUserInfo: true,
              isTab:true,
              userType: 1
            }
          }
        ]
      }
    ]
  },
  { //个人中心
    path: '/info',
    component: layout,
    redirect: '/home/tab/info',
    meta: {
      requiredUserInfo: true
    },
    children: [
      {//设备详情
        path: 'equipmentDetail',
        name: 'info-equipmentDetail',
        component: _import('info/equipmentDetail'),
        meta: {
          title: '设备详情',
          userType: 1,
          wxsdk:true,
        }
      },
      {//设备详情(模拟测试)
        path: 'equipmentDetailTest',
        name: 'info-equipmentDetail-test',
        component: _import('info/equipmentDetailTest'),
        meta: {
          title: '设备详情',
          requiredUserInfo: true,
          userType: 1
        }
      },
      {//模拟测试记录
        path: 'testReport',
        name: 'info-test-report',
        component: _import('info/testReport'),
        meta: {
          title: '测试记录',
          requiredUserInfo: true,
          userType: 1
        }
      },
    ]
  },
  // ** 以下是【提现】模块
  {
    path: '/withdraw-login',
    name: 'withdrawLogin',
    component: _import('withdraw/login'),
    meta: {
      title: '登录',
      white: true,
      userType: 2,
      wxsdk:true,
    }
  },
  {
    path: '/withdraw',
    name: 'withdraw',
    component: _import('withdraw/withdraw'),
    meta: {
      title: '提现',
      userType: 2,
      requiredUserInfo: true,
    }
  },
  {
    path: '/editPassword',
    name: 'withdrawEditPassword',
    component: _import('withdraw/editPassword'),
    meta: {
      title: '修改密码',
      userType: 2,
    }
  },
  {
    path: '/equipmentList',
    name: 'withdrawEquipmentList',
    component: _import('withdraw/equipmentList'),
    meta: {
      title: '设备列表',
      userType: 2,
      wxsdk:true,
    }
  }
]
