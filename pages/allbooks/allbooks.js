// allbooks/allbooks.js
const app = getApp()
Page({
  detail: function (e) {
    var index = e.currentTarget.dataset.index

    var code = this.data.myArray[index].code;
    var type1 = 'admin'

    wx.navigateTo({
      url: '../detail/detail?code=' + code + '&type=' + type1
    })

  },

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var apiurl = app.globalData.apiurl; 

    wx.setNavigationBarTitle({
      title: '所有书籍'  //页面标题
    })

    var that = this;
    wx.request({
      url: apiurl +'/allbooks',
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