var app = getApp();
Page({

  data: {
    phone_height: '1000px',

/** 图片规格选择  图标路径 **/
    v1_1_img: '../image/v1_1.png',
    v1_2_img: '../image/v1_2.png',
    v1_3_img: '../image/v1_3.png',
    v1_4_img: '../image/v1_4.png',
    v2_1_img: '../image/v2_1.png',
    v2_2_img: '../image/v2_2.png',
    v2_3_img: '../image/v2_3.png',
    v2_4_img: '../image/v2_4.png',
    v3_1_img: '../image/v3_1.png',
    v3_2_img: '../image/v3_2.png',
    v3_3_img: '../image/v3_3.png',




    swiperCurrent: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 800,
    circular: true,
    imgUrls: [
      '../image/lunbo1.jpg',
      '../image/lunbo2.jpg',
      '../image/lunbo3.jpg'
    ],
    //轮播图的切换事件

  /*  swiperChange: function (e) {
      this.setData({
        swiperCurrent: e.detail.current
      })
    },

    //点击指示点切换

    chuangEvent: function (e) {
      this.setData({
        swiperCurrent: e.currentTarget.id
      })
    },*/


  },

  onLoad: function () {
    //检查是否存在新版本
    wx.getUpdateManager().onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log("是否有新版本：" + res.hasUpdate);
      if (res.hasUpdate) {//如果有新版本

        // 小程序有新版本，会主动触发下载操作（无需开发者触发）
        wx.getUpdateManager().onUpdateReady(function () {//当新版本下载完成，会进行回调
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，单击确定重启应用',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                wx.getUpdateManager().applyUpdate();
              }
            }
          })

        })

        // 小程序有新版本，会主动触发下载操作（无需开发者触发）
        wx.getUpdateManager().onUpdateFailed(function () {//当新版本下载失败，会进行回调
          wx.showModal({
            title: '提示',
            content: '检查到有新版本，但下载失败，请检查网络设置',
            showCancel: false,
          })
        })
      }
    });
    var that = this;
    //获取手机屏幕高度
    var phone_height;
    wx.getSystemInfo({
      success(res) {
        phone_height = res.windowHeight + "px";
      }
    })
    this.setData({
      phone_height: phone_height,     //设置手机屏幕高度
    });
  },






  /**
* 用户点击右上角分享（index.js）
*/
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '小k.o照片换底',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  },

  /******用户选择 规格图片 */
  /**v1_1 */
  v1_1: function () {
      app.globalData.targetName= '小一寸',
      app.globalData.targetWidth='260',
      app.globalData.targetHeight='378',
      //选择规格成功后跳转到另一页面
        wx.navigateTo({
        url: '../usrChiocePicture/usrChiocePicture?targetName=小一寸&targetWidth=260&targetHeight=378',
          success: function () { },       //成功后的回调；
        })
  },
  v1_2: function () {
    app.globalData.targetName = '一寸',
    app.globalData.targetWidth = '295',
    app.globalData.targetHeight = '431',
      //选择规格成功后跳转到另一页面
      wx.navigateTo({
      url: '../usrChiocePicture/usrChiocePicture?targetName=一寸&targetWidth=295&targetHeight=431',
        success: function () { },       //成功后的回调；
      })
  },
  v1_3: function () {
      app.globalData.targetName = '大一寸',
      app.globalData.targetWidth = '390',
      app.globalData.targetHeight = '567',
        //选择规格成功后跳转到另一页面
        wx.navigateTo({
        url: '../usrChiocePicture/usrChiocePicture?targetName=大一寸&targetWidth=390&targetHeight=567',
          success: function () { },       //成功后的回调；
        })
  },
  v1_4: function () {
      app.globalData.targetName = '小二寸',
      app.globalData.targetWidth = '413',
      app.globalData.targetHeight = '531',
        //选择规格成功后跳转到另一页面
        wx.navigateTo({
        url: '../usrChiocePicture/usrChiocePicture?targetName=小二寸&targetWidth=413&targetHeight=531',
          success: function () { },       //成功后的回调；
        })
  },
  /**v2_1 */
  v2_1: function () {
    app.globalData.targetName = '二寸',
      app.globalData.targetWidth = '413',
      app.globalData.targetHeight = '579',
      //选择规格成功后跳转到另一页面
      wx.navigateTo({
      url: '../usrChiocePicture/usrChiocePicture?targetName=二寸&targetWidth=413&targetHeight=579',
        success: function () { },       //成功后的回调；
      })
  },
  v2_2: function () {
    app.globalData.targetName = '驾驶证、驾照',
      app.globalData.targetWidth = '260',
      app.globalData.targetHeight = '378',
      //选择规格成功后跳转到另一页面
      wx.navigateTo({
      url: '../usrChiocePicture/usrChiocePicture?targetName=驾驶证、驾照&targetWidth=260&targetHeight=378',
        success: function () { },       //成功后的回调；
      })
  },
  v2_3: function () {
    app.globalData.targetName = '英语四六级考试',
      app.globalData.targetWidth = '144',
      app.globalData.targetHeight = '192',
      //选择规格成功后跳转到另一页面
      wx.navigateTo({
      url: '../usrChiocePicture/usrChiocePicture?targetName=英语四六级考试&targetWidth=144&targetHeight=192',
        success: function () { },       //成功后的回调；
      })
  },
  v2_4: function () {
    app.globalData.targetName = '全国计算机等级考试',
      app.globalData.targetWidth = '144',
      app.globalData.targetHeight = '192',
      //选择规格成功后跳转到另一页面
      wx.navigateTo({
      url: '../usrChiocePicture/usrChiocePicture?targetName=全国计算机等级考试&targetWidth=144&targetHeight=192',
        success: function () { },       //成功后的回调；
      })
  },
  /**v3_1 */
  v3_1: function () {
    app.globalData.targetName = '签证',
      app.globalData.targetWidth = '531',
      app.globalData.targetHeight = '531',
      //选择规格成功后跳转到另一页面
      wx.navigateTo({
      url: '../usrChiocePicture/usrChiocePicture?targetName=签证&targetWidth=531&targetHeight=531',
        success: function () { },       //成功后的回调；
      })
  },
  v3_2: function () {
    app.globalData.targetName = '普通话水平测试',
      app.globalData.targetWidth = '390',
      app.globalData.targetHeight = '567',
      //选择规格成功后跳转到另一页面
      wx.navigateTo({
      url: '../usrChiocePicture/usrChiocePicture?targetName=普通话水平测试&targetWidth=390&targetHeight=567',
        success: function () { },       //成功后的回调；
      })
  },
})