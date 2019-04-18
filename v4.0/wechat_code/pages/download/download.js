// pages/usrChiocePicture/usrChiocePicture.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone_height: '1000px',
    downloadPath: '',

    /**白色图层的宽高   左边距离*/
    bw:'0rpx',
    bh:'750rpx',
    bl:'500rpx',
    /**生成的图片  宽高  左边距 */
    imgw:'0rpx',
    imgh:'730rpx',
    imgl:'0rpx',
  },
  //*/图片加载不出来  重新加载
  loadimage:function(){
    var that = this;
    that.setData({
      downloadPath:that.data.downloadPath+' ',
    })
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
    var downloadPath = app.globalData.downloadPath;

    //设置白色图层的大小及位置
    var w = app.globalData.targetWidth * 750 / app.globalData.targetHeight;
    var l = 375 - app.globalData.targetWidth * 375 / app.globalData.targetHeight;
    if(w>740){
      w = 710;
      l = 20;
    }
    console.log(downloadPath);
    that.setData({
      phone_height: phone_height,     //设置手机屏幕高度
      downloadPath: downloadPath,
      againHidden: app.globalData.againHidden,
                                      
      bw: w + 10 + 'rpx',      //设置白色图层的大小及位置
      bl: l - 5 +'rpx',
      imgw: w + 'rpx',          //设置生成后图片的大小及位置
      imgl: l + 'rpx',
    });
  },
  downloadImage: function () {
    wx.downloadFile({
      url: app.globalData.downloadPath,
      success: function (res) {
        console.log(res);
        var rr = res.tempFilePath;
        wx.saveImageToPhotosAlbum({

          filePath: rr,
          success(res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
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