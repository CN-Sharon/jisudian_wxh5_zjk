/*
 用户模块
*/
import request from '@/http/request'

// 根据token获取用户信息
// export function getUserInfo () {
//   return request({
//     url: '/Wxsite/User/api',
//     method: 'post',
//     data:{
//       api_name: 'getUserInfo'
//     }
//   })
// }


// 用户信息
export const getUserInfo = function(params) {
  return request({
    url: '/api/sys-users/front/getUserInfo',
    method: 'get',
    params
  })
};

// // 验证修改手机验证码
// export function putPhone (data) {
//   return request({
//     url: '/api/sys-users/front/putPhone',
//     method: 'put',
//     data
//   })
// }
//
//
// // 绑定新手机
// export function bindNewPhone (data) {
//   return request({
//     url: '/api/sys-users/front/bindNewPhone',
//     method: 'put',
//     data
//   })
// }


//余额
export const getBalance = function(params) {
  return request({
    url: '/api/finance/front/balance',
    method: 'get',
    params
  })
};
//余额明细
export const getFinanceList = function(params) {
  return request({
    url: '/api/finance/front/getFinanceList',
    method: 'get',
    params
  })
};

//充值列表
export const getOptionsList = function(params) {
  return request({
    url: '/api/options/front/optionsList',
    method: 'get',
    params
  })
};

//充值
export const recharge = function(data) {
  return request({
    url: '/api/options/front/recharge',
    method: 'post',
    data
  })
};


//领劵中心
export const getDiscountList = function(params) {
  return request({
    url: '/api/discount/front/getDiscountList',
    method: 'get',
    params
  })
};

//领取优惠卷
export const addUsersDiscount = function(data) {
  return request({
    url: '/api/discount/front/addUsersDiscount',
    method: 'post',
    data
  })
};

//用户优惠卷
export const getUsersDiscountList = function(params) {
  return request({
    url: '/api/discount/front/getUsersDiscountList',
    method: 'get',
    params
  })
};


//
//
// //商家促销
// export const getPromotion = function(params) {
//   return request({
//     url: '/api/sys-message/front/messageList',
//     method: 'get',
//     params
//   })
// };
// //获取机柜详情
// export const getDeviceInfo = function(params) {
//   return request({
//     url: '/api/sys-category/getDeviceInfo',
//     method: 'get',
//     params
//   })
// };
// //获取商品分类列表
// export const getCategoryList = function(params) {
//   return request({
//     url: '/api/sys-category/getCategoryList',
//     method: 'get',
//     params
//   })
// };
// //获取商品分类列表
// export const getGoodsListByDeviceNumber = function(params) {
//   return request({
//     url: '/api/sys-goods/getGoodsListByDeviceNumber',
//     method: 'get',
//     params
//   })
// };
// //获取用户订单列表
// export const getUserOrdersList = function(params) {
//   return request({
//     url: '/api/sys-orders/front/getUserOrdersList',
//     method: 'get',
//     params
//   })
// };
//
// //获取用户订单列表
// export const updataOrderToPay = function(data) {
//   return request({
//     url: '/api/sys-orders/front/updataOrderToPay',
//     method: 'POST',
//     data
//   })
// };
// //公众号端用户订单详情
// export const getUserOrdersInfo = function(params) {
//   return request({
//     url: '/api/sys-orders/front/getUserOrdersInfo',
//     method: 'get',
//     params
//   })
// };
// //创建订单
// export const addPulilcOrder = function(data) {
//   return request({
//     url: '/api/sys-orders/front/addPulilcOrder',
//     method: 'post',
//     data
//   })
// };
//
// // 登录
// export function login (data) {
//   return request({
//     url: '',
//     method: 'post',
//     data
//   })
// }
//
// //获取公共信息
// export const getParameter = function(params) {
//   return request({
//     url: '/api/sys-systemparameter/getParameter',
//     method: 'get',
//     params
//   })
// };
//
// //商家促销详情
// export const getMessage = function(params) {
//   return request({
//     url: '/api/sys-message/front/getMessage',
//     method: 'get',
//     params
//   })
// };
//
// // 上传图片
// export function upload (data) {
//   return request({
//     url: '/api/file/front/upload',
//     method: 'post',
//     data
//   })
// }
//
// // 联系加盟
// export function addFranchisee (data) {
//   return request({
//     url: '/api/sys-franchisee/front/addFranchisee ',
//     method: 'post',
//     data
//   })
// }
//*********
// llx start
//*********

//上报类型列表
export function typeList () {
  return request({
    url: '/api/recordType/front/typeList',
    method: 'get',
  })
}

// 故障报修
export function addFeedback (data) {
  return request({
    url: '/api/record/front/add',
    method: 'post',
    data
  })
}

// 图片上传
export function fileUpload (data) {
  return request({
    url: '/api/file/front/upload',
    method: 'post',
    data
  })
}

// 投诉建议
export function complaintAdd (data) {
  return request({
    url: '/api/feedback/front/add',
    method: 'post',
    data
  })
}

// 反馈记录
export function getFeedbackList (params) {
  return request({
    url: '/api/feedback/front/getFeedbackList',
    method: 'get',
    params
  })
}

// 反馈记录
export function getUserRecordList (params) {
  return request({
    url: '/api/record/front/getUserRecordList',
    method: 'get',
    params
  })
}

// 用户查询押金
export function getUserDeposit () {
  return request({
    url: '/api/cash-pledge/front/getUserDeposit',
    method: 'get'
  })
}

// 用户缴纳押金
export function getUserPayCashPledge () {
  return request({
    url: '/api/cash-pledge/front/getUserPayCashPledge',
    method: 'post'
  })
}

// 退押金
export function getUserReturnCashPledge () {
  return request({
    url: '/api/cash-pledge/front/getUserReturnCashPledge',
    method: 'post'
  })
}

// 查询待缴纳押金金额
export function getSystemCashPledge () {
  return request({
    url: '/api/cash-pledge/front/getSystemCashPledge',
    method: 'get'
  })
}

// 未读消息个数
export function getMessageCount () {
  return request({
    url: '/api/message/front/getMessageCount',
    method: 'get'
  })
}

// 消息详情
export function getMessage (params) {
  return request({
    url: '/api/message/front/getMessage',
    method: 'get',
    params
  })
}
// 获取设备时间套餐规则
export function getPackageRules (params) {
  return request({
    url: '/api/package-rules/front/getPackageRules',
    method: 'get',
    params
  })
}

// 获取设备开放时间段
export function getUseInterval (params) {
  return request({
    url: '/api/package-rules/front/getUseInterval',
    method: 'get',
    params
  })
}

// 用户下单
export function createOrder (data) {
  return request({
    url: '/api/order/front/createOrder',
    method: 'post',
    data
  })
}

// 开锁（用户下单后调用）
export function openEquipmentLock (data) {
  return request({
    url: '/api/equipment/front/openEquipmentLock',
    method: 'post',
    data
  })
}

// 扫一扫
export function scanQRcode (params) {
  return request({
    url: '/api/order/front/scanQRcode',
    method: 'get',
    params
  })
}

// 获取短信验证码
export function getPhoneCode (params) {
  return request({
    url: '/api/sms/getPhoneCode',
    method: 'get',
    params
  })
}

// 修改用户信息
export function updateUsers (data) {
  return request({
    url: '/api/sys-users/front/updateUsers',
    method: 'post',
    data
  })
}

// 故障报修详情
export function getUserRecord (params) {
  return request({
    url: '/api/record/front/getUserRecord',
    method: 'get',
    params
  })
}

// 投诉建议详情
export function getFeedback (params) {
  return request({
    url: '/api/feedback/front/getFeedback',
    method: 'get',
    params
  })
}

// 订单详情
export function getUserOrderDetail (params) {
  return request({
    url: '/api/order/front/getUserOrderDetail',
    method: 'get',
    params
  })
}

// 结束订单
export function userEndOrder (data) {
  return request({
    url: '/api/order/front/userEndOrder',
    method: 'post',
    data
  })
}

//*********
// llx end
//*********
