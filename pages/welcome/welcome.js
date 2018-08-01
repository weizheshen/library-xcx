//index.js
//获取应用实例
const app = getApp()

Page({

  data: {
    motto: 'Riking!',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function () {
    var apiurl = app.globalData.apiurl; 
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    }),
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("登录code:" + res.code)

        wx.request({
          url: apiurl+'/getusertype?logincode=' + res.code,
          data: {
            //grant_type: 'authorization_code'

          },
          method: 'GET',
          success: function (res) {
            console.log('用户类型：' + res.data)
            //用户类型跳转
            if (res.data == 0) {
              wx.redirectTo({
                url: '../personal/personal'
              })
            } else if (res.data == 1) {
              wx.redirectTo({
                url: '../message/message'
              })
            } else if (res.data == 2) {

              wx.switchTab({
                url: '../index/index'
              })
            } else {
              wx.redirectTo({
                url: '../admin/admin'
              })
            }

          }
        })

      }
    })

  },



})
