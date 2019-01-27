var app = getApp();
Page({

  data: {
    phone_height: '1000px',

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

    /*导航图片  相册 相机 */
    photoAlbum_image: '../image/photoAlbum.png',
    takePhoto_image: '../image/takePhoto.png',
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





  //从相册获取图片
  getPhotoAlubum:function(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original','compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        app.globalData.imageChangePath = res.tempFilePaths
        //console.log(app.globalData.imageChangePath)  
        //获取图片成功后跳转到另一页面
         wx.navigateTo({
             url: '../changeBackground/changeBackground', 
             success: function() { } ,       //成功后的回调；
          })
      }
    })
  },
  //从相机拍照获取图片
  getTakePhoto:function(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original','compressed'],
      sourceType: ['camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        app.globalData.imageChangePath = res.tempFilePaths     
         //获取图片成功后跳转到另一页面
        wx.navigateTo({
          url: '../changeBackground/changeBackground',
          success: function () { 
            
          },       //成功后的回调；
        })
      }
    })
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
      title: 'k.o照片换底',
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


})