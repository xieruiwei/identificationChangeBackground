//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
   url:'https://www.k-o.xin/identificationChangeBackground/',
  //   url:'http://localhost:8080/identificationChangeBackground/',
    imageChangePath:'../image/test.jpg',   //从小程序上传的图片路径
    serverPath:'../image/test.jpg',        //服务器人像抠图，在服务器的图片路径
    beautyPath: '../image/test.jpg',        //服务器美颜人像抠图，在服务器的图片路径
    path:'2019/',                          //保存在文件夹中的路径
    downloadPath:'../image/test.jpg',      //最终生成图片
    lostHeight: 0,                         //获取人像抠图后  与形成目标图像 的高度差
    phone_height:'504',                    //手机屏幕高度
    userInfo: null,
    againHidden:false,
    /***名称   宽度  高度  需要变成的背景色*** */
    targetName: '一寸',
    targetWidth: '144',
    targetHeight: '192',
    backgroundColor:'#5599FF',

    /**最终合成时的颜色 及图片 */
    saveSrc:'../image/test.jpg',      //用户人像
    saveRed:85,      //用户保存时的颜色
    saveGreen:153,
    saveBlue:255,
  },

})