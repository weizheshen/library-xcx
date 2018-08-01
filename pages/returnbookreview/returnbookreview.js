// pages/returnbookreview/returnbookreview.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },


  review: function (e) {
    var apiurl = app.globalData.apiurl; 
    var index = e.currentTarget.dataset.index
    var id = this.data.myArray[index].id;
    var that = this
    wx.request({
      url: apiurl +'/reviewreturn?id=' + id,
      data: {

      },
      method: 'GET',
      success: function (res) {
        console.log('审核功能反馈：' + res.data)
        if (res.data == 1) {
          wx.showToast({
            title: '审核成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          that.onLoad()
        }


      }
    })



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var apiurl = app.globalData.apiurl; 
    var that = this;

    wx.setNavigationBarTitle({
      title: '审核信息'  //页面标题
    })

    wx.request({
      url: apiurl +'/returnbookinfo',
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})