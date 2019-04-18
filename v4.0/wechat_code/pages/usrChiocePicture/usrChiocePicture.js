// pages/usrChiocePicture/usrChiocePicture.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**AI智能生成中  隐藏 */
    loadingHidden: true,

    phone_height: '1000px',

    /**用户选择 图像规格 */
    targetName: app.globalData.targetName,
    targetWidth:app.globalData.targetWidth,
    targetHeight:app.globalData.targetHeight,

    /**图标路径 */
    bingo:'../image/bingo.png',
    money:'../image/money.png',

    /*导航图片  相册 相机 */
    photoAlbum_image: '../image/photoAlbum.png',
    takePhoto_image: '../image/takePhoto.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      targetName:options.targetName,
      targetWidth:options.targetWidth,
      targetHeight:options.targetHeight,
    });
    app.globalData.targetName=options.targetName;
    app.globalData.targetWidth=options.targetWidth;
    app.globalData.targetHeight=options.targetHeight;
    console.log(app.globalData.targetName)
  },

  //从相册获取图片
  getPhotoAlubum: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success(res) {
        /**AI智能生成中  隐藏 */
        that.setData({
          loadingHidden:false,
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
          },
          success(res) {
            var json1 = JSON.parse(res.data);
            app.globalData.path = json1.path;

            //获取人像抠图后  与形成目标图像 的高度差
            app.globalData.lostHeight = json1.lostHeight;
            //获取服务器  人像抠图后的图片
            app.globalData.serverPath = app.globalData.url + 'bodyanalysisPath' + app.globalData.path+'.png';
            //获取图片成功后跳转到另一页面
            wx.redirectTo({
              url: '../bodyanalysis/bodyanalysis',
              success: function () { },       //成功后的回调；
            })
          },
        })  
      }
    })

  },
  //从相机拍照获取图片
  getTakePhoto: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera'],
      success(res) {
        /**AI智能生成中  隐藏 */
        that.setData({
          loadingHidden: false,
        })
        //上传图片
        var targetName = app.globalData.targetName;
        var targetWidth = app.globalData.targetWidth;
        var targetHeight = app.globalData.targetHeight;
        app.globalData.imageChangePath = res.tempFilePaths[0]
        console.log(app.globalData.imageChangePath)
        wx.uploadFile({
          url: app.globalData.url + 'UploadImage', // 仅为示例，非真实的接口地址
          filePath: app.globalData.imageChangePath,
          name: 'file',
          formData: {
            targetName: targetName,
            targetWidth: targetWidth,
            targetHeight: targetHeight,
          },
          success(res) {
            var json1 = JSON.parse(res.data);
            app.globalData.path = json1.path;            
            //获取人像抠图后  与形成目标图像 的高度差
            app.globalData.lostHeight = json1.lostHeight;
            //获取服务器  人像抠图后的图片
            app.globalData.serverPath = app.globalData.url + 'bodyanalysisPath' + app.globalData.path+'.png';
            //获取图片成功后跳转到另一页面
            wx.redirectTo({
              url: '../bodyanalysis/bodyanalysis',
              success: function () { },       //成功后的回调；
            })
          }
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