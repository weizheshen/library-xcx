const app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    
  },
  onLoad: function (options) {
    var apiurl = app.globalData.apiurl; 
    wx.setNavigationBarTitle({
      title: options.searchKey
    })
    var that = this;
    var searchkey = options.searchKey
    wx.request({
      url: apiurl +'/searchbook?searchkey=' + searchkey,
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
    var code = e.currentTarget.dataset.code
    wx.navigateTo({
      url: '../detail/detail?code=' + code
    })

  },
})
  

