// personal/personal.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userPwd: ""

  },


  //获取用户输入的信息
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },

  userPhoneInput: function (e) {
    this.setData({
      userTel: e.detail.value
    })
  },

  userNumberInput: function (e) {
    this.setData({
      userNumber: e.detail.value
    })
  },

  userPlaceInput: function (e) {
    this.setData({
      userPlace: e.detail.value
    })
  },


  loginBtnClick: function (e) {
    var apiurl = app.globalData.apiurl; 
    console.log("用户名：" + this.data.userName + "  手机号：" + this.data.userTel + "  工号：" +
      this.data.userNumber + "  办公地点：" + this.data.userPlace);
    if (this.data.userName == '' || this.data.userName ==undefined){
      this.setData(
        { popErrorMsg: "姓名不能为空" }
      );
      this.ohShitfadeOut();
      return;      

     

    }else if (this.data.userTel == '' || this.data.userTel == undefined){
      this.setData(
        { popErrorMsg: "手机号不能为空" }
      );
      this.ohShitfadeOut();
      return; 

    }else if (this.data.userNumber == '' || this.data.userNumber == undefined){
      this.setData(
        { popErrorMsg: "工号不能为空" }
      );
      this.ohShitfadeOut();
      return; 

    }else if (this.data.userPlace == '' || this.data.userPlace == undefined){
      this.setData(
        { popErrorMsg: "办公地点不能为空" }
      );
      this.ohShitfadeOut();
      return; 
    }else{
      wx.login({
        success: res => {
          console.log("插入code:" + res.code)

          wx.request({
            url: apiurl +'/adduserinfo?username=' + this.data.userName + '&tel=' + this.data.userTel
              + '&number=' + this.data.userNumber + '&place=' + this.data.userPlace + '&logincode=' + res.code,
            data: {

            },
            method: 'GET',
            success: function (res) {
              console.log('信息插入反馈：' + res.data)
              if (res.data == 1) {
                wx.navigateTo({
                  url: '../message/message'
                })
              } else {
                console.log('信息插入失败！')
              }
            }
          })
        }
      })
    }
},

  //定时器提示框1秒消失
  ohShitfadeOut() {
    var fadeOutTimeout = setTimeout(() => {
      this.setData({ popErrorMsg: '' });
      clearTimeout(fadeOutTimeout);
    }, 1000);
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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