// pages/modifyuserinfo/modifyuserinfo.js
const app = getApp()
Page({
  globalData: {
    code: 0,
    id:0,
  },

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  //获取用户输入的信息
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  telInput: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },

  numberInput: function (e) {
    this.setData({
      number: e.detail.value
    })
  },

  placeInput: function (e) {
    this.setData({
      place: e.detail.value
    })
  },


  loginBtnClick: function (e) {
    var apiurl = app.globalData.apiurl; 
    if (this.data.name == ''){
      this.setData(
        { popErrorMsg: "姓名不能为空" }
      );
      this.ohShitfadeOut();
      return; 
    } else if (this.data.tel == ''){
      this.setData(
        { popErrorMsg: "手机号不能为空" }
      );
      this.ohShitfadeOut();
      return; 
    } else if (this.data.number == ''){
      this.setData(
        { popErrorMsg: "工号不能为空" }
      );
      this.ohShitfadeOut();
      return; 
    } else if (this.data.place == ''){
      this.setData(
        { popErrorMsg: "办公地点不能为空" }
      );
      this.ohShitfadeOut();
      return; 
    }else{
    wx.request({
      url: apiurl +'/modifyuserinfo?code=' + app.globalData.code + '&name=' + this.data.name + '&tel=' + this.data.tel + '&number=' + this.data.number + '&place=' + this.data.place,
      data: {

      },
      method: 'GET',
      success: function (res) {
        if (res.data == 1) {
          wx.showToast({
            title: '修改成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        } else {
          this.setData(
            { popErrorMsg: "修改失败" }
          );
          this.ohShitfadeOut();
          return; 
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
            url: apiurl +'/deluserinfo?id=' + app.globalData.id,
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
      url: apiurl +'/getuserinfo?code=' + app.globalData.code,
      data: {

      },
      method: 'GET',
      success: function (res) {
        var user;
        that.setData({
          user: res.data,

        })


      }

    })
  },

  ohShitfadeOut() {
    var fadeOutTimeout = setTimeout(() => {
      this.setData({ popErrorMsg: '' });
      clearTimeout(fadeOutTimeout);
    }, 1000);
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