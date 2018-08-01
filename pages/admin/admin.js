//index.js
//获取应用实例
const app = getApp()

Page({
  addbook: function () {
    var that = this
    var apiurl = app.globalData.apiurl; 
    wx.scanCode({
      success: (res) => {
        console.log(res)
        wx.request({
          url: apiurl+'/addbookinfo?code=' + res.result,
          data: {

          },
          method: 'GET',
          success: function (res) {
            console.log('图书插入反馈：' + res.data)
            if (res.data == 1) {
              wx.showToast({
                title: '新增图书成功',
                icon: 'success',
                duration: 1000,
                mask: true
              })
            } else {
              that.setData(
                { popErrorMsg: "新增图书失败" }
              );
              that.ohShitfadeOut();
              return; 

            }
          }
        })


      }
    })
  },


  returnbook: function () {
    var apiurl = app.globalData.apiurl; 
    wx.request({
      url: apiurl+'/returnbookinfo',
      data: {

      },
      method: 'GET',
      success: function (res) {
        if (res.data == 0) {
          wx.navigateTo({
            url: '../reviewmessage/reviewmessage'
          })
        } else {
          wx.navigateTo({
            url: '../returnbookreview/returnbookreview',
          })

        }


      }
    })
    
  },

  borrowbook: function () {
    var apiurl = app.globalData.apiurl; 
    wx.request({
      url: apiurl+'/borrowbookinfo',
      data: {

      },
      method: 'GET',
      success: function (res) {
        if (res.data == 0) {
          wx.navigateTo({
            url: '../reviewmessage/reviewmessage'
          })
        } else {
          wx.navigateTo({
            url: '../borrowbookreview/borrowbookreview',
          })

        }


      }
    })

  },

  manage: function () {
          wx.navigateTo({
            url: '../review/review',
          })

  },

  allbooks: function () {
    wx.navigateTo({
      url: '../allbooks/allbooks',
    })

  },

  reviewbook: function () {
    var apiurl = app.globalData.apiurl; 
    wx.request({
      url: apiurl +'/reviewinfo',
      data: {

      },
      method: 'GET',
      success: function (res) {
        if (res.data == 0) {
          wx.navigateTo({
            url: '../../../reviewmessage/reviewmessage'
          })
        } else {
          wx.navigateTo({
            url: '../../../review/review',
          })

        }


      }
    })


  },


  data: {
    //motto: 'Riking!',
    book_id: '0000',//图书id默认为0000
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../pages/logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //定时器提示框1秒消失
  ohShitfadeOut() {
    var fadeOutTimeout = setTimeout(() => {
      this.setData({ popErrorMsg: '' });
      clearTimeout(fadeOutTimeout);
    }, 1000);
  },

})
