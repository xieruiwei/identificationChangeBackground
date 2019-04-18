var app = getApp();
Page({
  data: {
    imageChangePath:'../image/test.jpg',                     //上传图片
    loadingHidden: true,        /**AI智能生成中  隐藏 */
    loadingHidden1:true,        //上传识别隐藏
    phone_height: '600px',      //获取手机高度
    photo:1,                    // 1 代表摄像头方向为前  0 为后
    device_position:'back',     //摄像头方向
  },

  //点击拍照
  takePhoto() {
    var that = this;
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        //图片地址 res.tempImagePath
        /**AI智能生成中  隐藏 */
        that.setData({
          loadingHidden: false,
          imageChangePath: res.tempImagePath,
        })
        wx.showLoading({
          title: '上传中...',
        })
        //上传图片
        app.globalData.imageChangePath = res.tempImagePath;
        console.log(app.globalData.imageChangePath)
        wx.uploadFile({
          url: app.globalData.url + 'UploadImage', // 仅为示例，非真实的接口地址
          filePath: app.globalData.imageChangePath,
          name: 'file',
          formData: {
            targetName: app.globalData.targetName,
            targetWidth: app.globalData.targetWidth,
            targetHeight: app.globalData.targetHeight,
            targetPhotoPath: app.globalData.imageChangePath,
          },
          success(res) {
            console.log("上传成功");
            var json1 = typeof res.data == 'string' ? JSON.parse(res.data) : res.data;
            console.log(json1);
            //人脸分析 符合规范则跳转另一页面
            if(json1.dealResult=='OK'){
              //获取服务器  人像裁剪后的图片
              app.globalData.path = json1.path;
              console.log(app.globalData.path + "****");
              //获取图片成功后跳转到另一页面
              wx.redirectTo({
                url: '../usrChoice/usrChoice',
                success: function () { },       //成功后的回调；
              })
              console.log("成功则需要跳转")
            }
            else {  //人脸分析 不符合规范 弹窗
              wx.showModal({
                title: '人脸分析',
                content: json1.dealResult,
                showCancel:false,
                confirmText:'重新拍摄',
                success: function (res) {
                  if (res.confirm) {
                    that.setData({
                      loadingHidden: true,
                    })
                  }
                  wx.redirectTo({
                    url: '../takePhoto/takePhoto',
                    success: function () { },       //成功后的回调；
                  })
                }
              })
            }
          },
          fail(res){
            wx.showModal({
              title: '图片上传',
              content: '上传失败，请查看网络连接是否正常',
              showCancel: false,
              confirmText: '退出',
              success: function (res) {
                if (res.confirm) {
                  that.setData({
                    loadingHidden: true,
                  })
                }
              }
            })
          }
        })
      }
    })
  },
  error(e) {
    wx.showModal({
      title: '摄像头授权',
      content: '授权失败，请点击确定重新授权',
      success: function (res) {
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {
              if (res.authSetting["scope.camera"]) {////如果用户重新同意了授权登录
                wx.redirectTo({
                  url: '../takePhoto/takePhoto',
                  success: function () { },       //成功后的回调；
                })
              }
            }
          })
        }
      }
    })
  },
  //点击进入图库 从相册获取图片
  getPhotoAlubum: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success(res) {
        /**AI智能生成中  隐藏 */
        that.setData({
          loadingHidden: false,
          imageChangePath: res.tempFilePaths[0],
        })
        //上传图片
        app.globalData.imageChangePath = res.tempFilePaths[0]
        console.log(app.globalData.imageChangePath)
        wx.uploadFile({
          url: app.globalData.url + 'UploadImage', // 仅为示例，非真实的接口地址
          filePath: app.globalData.imageChangePath,
          name: 'file',
          formData: {
            targetName: app.globalData.targetName,
            targetWidth: app.globalData.targetWidth,
            targetHeight: app.globalData.targetHeight,
            targetPhotoPath: app.globalData.imageChangePath,
          },
          success(res) {
            console.log("上传成功");
            var json1 = typeof res.data == 'string' ? JSON.parse(res.data) : res.data;
            console.log(json1);
            //人脸分析 符合规范则跳转另一页面
            if (json1.dealResult == 'OK') {
              //获取服务器  人像裁剪后的图片
              app.globalData.path = json1.path;
              console.log(app.globalData.path+"****");
              //获取图片成功后跳转到另一页面
              wx.redirectTo({
                url: '../usrChoice/usrChoice',
                success: function () { },       //成功后的回调；
              })
              console.log("成功则需要跳转")
            }
            else {  //人脸分析 不符合规范 弹窗
              wx.showModal({
                title: '人脸分析',
                content: json1.dealResult,
                showCancel: false,
                confirmText: '重新拍摄',
                success: function (res) {
                  if (res.confirm) {
                    that.setData({
                      loadingHidden: true,
                    })
                  }
                }
              })
            }
          },
          fail(res) {
            wx.showModal({
              title: '图片上传',
              content: '上传失败，请查看网络连接是否正常',
              showCancel: false,
              confirmText: '退出',
              success: function (res) {
                if (res.confirm) {
                  that.setData({
                    loadingHidden: true,
                  })
                }
              }
            })
          }
        })
      }
    })
  },
  //点击相机反转
  fanzhuan:function(){
    var that = this;
    if (that.data.photo == 1) {
      that.setData({
        device_position:'back',
        photo:0,
      });
    }
    else {
      that.setData({
        device_position: 'front',
        photo: 1,
      });
    }
    console.log(that.data.device_position)
  },

  onLoad: function () {
    var that = this;
    //获取手机屏幕 宽度 高度
    var phone_height;
    var phone_width;
    wx.getSystemInfo({
      success(res) {
        phone_height = res.windowHeight;
        phone_width = res.windowWidth;
      }
    });
    that.setData({
      phone_height: phone_height+'px',     //设置手机屏幕高度
    });
    console.log(that.data.phone_height);
  }

})