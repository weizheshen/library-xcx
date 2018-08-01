//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto:{
      content:"为乐趣而读书。",
      author:"—— 毛姆"
    }
  },
  formSubmit:function(e){
    if (e.detail.value.input == null || e.detail.value.input==''){
      wx.showToast({
        title: '请输入关键字',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
    }else{
    wx.navigateTo({
      url: '../resultlist/resultlist?searchKey='+e.detail.value.input,
    })
    }
  },

  borrowbook: function () {
    var apiurl = app.globalData.apiurl; 
    var bookcode;
    wx.scanCode({
      success: (res) => {
        console.log(res)
        wx.login({
          success: function (resu) {
            console.log('借书code：' + resu.code);
            wx.request({
              url: apiurl +'/borrowbook?code=' + res.result + '&logincode=' + resu.code,
              data: {

              },
              method: 'GET',
              success: function (resul) {
                console.log('借书反馈：' + resul.data)
                if (resul.data == 1) {
                  wx.showToast({
                    title: '借书成功',
                    icon: 'succes',
                    duration: 1000,
                    mask: true
                  })
                }else{
                  wx.showToast({
                    title: '借书失败',
                    icon: 'loading',
                    duration: 1000,
                    mask: true
                  })
                }
              }
            })

          }
        })


      }
    })
  },
  
})
