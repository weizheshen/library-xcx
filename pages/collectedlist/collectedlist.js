//logs.js
var util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    userInfo: {},
    books: []
  },
  onLoad: function (options) {
    var apiurl = app.globalData.apiurl;  
    var that = this;
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: {
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl
        }
      })
    })
      wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    //查询借书记录
      wx.login({
        success: function (resu) {
          console.log('借书记录code：' + resu.code);
          wx.request({
            url: apiurl +'/checkrecord?logincode='+ resu.code,
            data: {
            },
            method: 'GET',
            success: function (resul) {
              var myArray = new Array();
              that.setData({
                myArray: resul.data,
                length: resul.data.length

              })
              
            }
          })

        }
      })

  },
  onShow: function () {
    this.onLoad()
  },
  detail: function (e) {
    var apiurl = app.globalData.apiurl; 
    var code = e.currentTarget.dataset.code
    var id = e.currentTarget.dataset.id
    wx.request({
      url: apiurl +'/detail?id=' + id,
      data: {

      },
      method: 'GET',
      success: function (res) {
        if(res.data==1){
          var type1 = 'review'
        } else if (res.data==2){
          var type1 = 'again'
        } else if (res.data == 3){
          var type1 = 'return'
        }else if(res.data == 5){
          var type1 = 'borrowreviewno'
        }else{
          var type1 = 'application'
        }
        wx.navigateTo({
          url: '../detail/detail?code=' + code + '&type=' + type1 + '&id=' + id,

        })

      }
       
      })

    

 
  },
})
