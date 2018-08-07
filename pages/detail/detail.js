//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js')
Page({
  globalData: {
    id: 0,
    opt:0,
  },

  data: { 
    book: [],
    collected: false,
    purchaseUrl:'./'
  },
  onLoad: function (options) {
    var apiurl = app.globalData.apiurl; 
    app.globalData.id = options.id
    app.globalData.opt = options
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    var that = this
    var code = options.code

    if (options.type==null){
      var type1 = 'borrow'
    }else{
      var type1 = options.type
    }
    console.log("详情码：" + code)
    wx.request({
      url: apiurl +'/bookinfo?code=' + code,
      data: {

      },
      method: 'GET',
      success: function (res) {
        var book;
        var type2;
        
        that.setData({
          book: res.data,
          type2:type1
          
        })


      }

    })
 
    
  },
  modify:function(e){
    var code = e.currentTarget.dataset.code
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../modifyinfo/modifyinfo?code=' + code +'&id='+id,
    })
    

  },

  check:function(e){
    var apiurl = app.globalData.apiurl; 
    var that = this
    var code = e.currentTarget.dataset.code
    wx.request({
      url: apiurl +'/checkborrowrecord?code=' + code,
      data: {

      },
      method: 'GET',
      success: function (res) {
      if(res.data==0){
        that.setData(
          { popErrorMsg: "无数据" }
        );
        that.ohShitfadeOut();
        return; 
      }else{
        wx.navigateTo({
          url: '../checkrecord/checkrecord?code=' + code,
        })

      }


      }
    })

    
  },

  borrowbookbysearch:function(e){
    var apiurl = app.globalData.apiurl; 
    var code = e.currentTarget.dataset.code
    var that = this
    wx.login({
      success: function (resu) {
        console.log('借书code：' + resu.code);
        wx.request({
          url: apiurl +'/borrowbookbysearch?code=' + code + '&logincode=' + resu.code,
          data: {

          },
          method: 'GET',
          success: function (resul) {
            console.log('借书反馈：' + resul.data)
            if (resul.data == 1) {
              wx.showToast({
                title: '申请成功',
                icon: 'succes',
                duration: 1000,
                mask: true
              })
            } else {
              that.setData(
                { popErrorMsg: "申请失败，可能是库存不足" }
              );
              that.ohShitfadeOut();
              return;  
            }
          }
        })

      }
    })

  },

  appbookagain:function(e){
    var apiurl = app.globalData.apiurl; 
    var id = app.globalData.id;
    var that = this
    wx.request({
      url: apiurl + '/appbookagain?id=' + id,
      data: {

      },
      method: 'GET',
      success: function (resul) {
        console.log('再次申请反馈：' + resul.data)
        if (resul.data == 1) {
          wx.showToast({
            title: '申请成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        } else {
          that.setData(
            { popErrorMsg: "申请失败，可能是库存不足" }
          );
          that.ohShitfadeOut();
          return;
        }
      }
    })

  },

  applicationreturn: function (e){
    var apiurl = app.globalData.apiurl; 
    var that = this
    wx.request({
      url: apiurl +'/applicationreturn?id=' + app.globalData.id,
      data: {

      },
      method: 'GET',
      success: function (resul) {
        console.log('还书反馈：' + resul.data)
        if (resul.data == 1) {
          app.globalData.opt.type = 'application'
          wx.showToast({
            title: '申请成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        } else {
          that.setData(
            { popErrorMsg: "申请失败" }
          );
          that.ohShitfadeOut();
          return;  
        }
        that.onLoad(app.globalData.opt)
      }
    })
  },

  borrowreview:function(e){
    var apiurl = app.globalData.apiurl; 
    var that = this

    wx.request({
      url: apiurl +'/borrowreviewno?id=' + app.globalData.id,
      data: {

      },
      method: 'GET',
      success: function (resul) {
        console.log('审核借书不通过反馈：' + resul.data)
        if (resul.data == 1) {
          wx.showToast({
            title: '审核成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        } else {
          that.setData(
            { popErrorMsg: "审核失败" }
          );
          that.ohShitfadeOut();
          return;
        }
      }
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
