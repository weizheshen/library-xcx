// pages/modifyinfo/modifyinfo.js
const app = getApp()
Page({
  globalData: {
    code: 0,
    stock:0,
    id:0,
  },

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  //获取用户输入的信息
  booktitleInput: function (e) {
    this.setData({
      booktitle: e.detail.value
    })
  },

  authorInput: function (e) {
    this.setData({
      author: e.detail.value
    })
  },

  publishInput: function (e) {
    this.setData({
      publish: e.detail.value
    })
  },

  stockInput: function (e) {
    this.setData({
      stock: e.detail.value
    })
  },


  loginBtnClick: function (e) {
    var apiurl = app.globalData.apiurl; 
    if (this.data.stock==undefined){
      var sto = app.globalData.stock
    }else{
      sto = this.data.stock
    }
    if(sto<0){
      wx.showToast({
        title: '库存不能小于零',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
    }else{
    wx.request({
      url: apiurl +'/modifybookinfo?code=' + app.globalData.code + '&booktitle=' + this.data.booktitle + '&author=' + this.data.author + '&publish=' + this.data.publish + '&stock=' + sto,
      data: {

      },
      method: 'GET',
      success: function (res) {
        if (res.data == 1) {
          wx.showToast({
            title: '修改成功！',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        } else {
          wx.showToast({
            title: '修改失败！',
            icon: 'loading',
            duration: 1000,
            mask: true
          })
        }

      }

    })
    }

  },

  del:function(e){
    var apiurl = app.globalData.apiurl; 
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          wx.request({
            url: apiurl +'/delbookinfo?id=' + app.globalData.id,
            data: {

            },
            method: 'GET',
            success: function (res) {
              if (res.data == 1) {
                wx.showToast({
                  title: '删除成功！',
                  icon: 'succes',
                  duration: 1000,
                  mask: true
                })
              } else {
                wx.showToast({
                  title: '删除失败！',
                  icon: 'loading',
                  duration: 1000,
                  mask: true
                })
              }

            }

          })
          
        } else if (sm.cancel) {
          console.log('用户点击取消')
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
    app.globalData.code = options.code
    app.globalData.id = options.id
    wx.request({
      url: apiurl +'/bookinfo?code=' + app.globalData.code,
      data: {

      },
      method: 'GET',
      success: function (res) {
        var book;
        app.globalData.stock = res.data.stock;
        that.setData({
          book: res.data,

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