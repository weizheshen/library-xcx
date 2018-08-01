//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  },
  onLoad: function () {
    var apiurl = app.globalData.apiurl; 
    var that = this;
    wx.request({
      url: apiurl +'/checkbookstock',
      data: {

      },
      method: 'GET',
      success: function (res) {
        var myArray = new Array();
        that.setData({
          myArray: res.data,
          length: res.data.length

        })
      }
    })
  },
  detail: function (e) {
    var index = e.currentTarget.dataset.index

    var code = this.data.myArray[index].code;


    wx.navigateTo({
      url: '../detail/detail?code=' + code
    })

  },

  onShow: function () {
    this.onLoad()
  },
})
