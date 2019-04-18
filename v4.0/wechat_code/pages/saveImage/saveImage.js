var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone_height: '1000rpx',      //获取手机高度
    matrix_margin_top: '100rpx',//信息框距离顶部距离
    src:'../image/test.jpg',      //用户人像
    backgroundColor_red:255,      //用户保存时的颜色
    backgroundColor_green:0,
    backgroundColor_blue:0,
    loadingHidden:true,           //保存中
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      phone_height: phone_height + "px",     //设置手机屏幕高度
      matrix_margin_top: (phone_height * 750 / phone_width - 800) / 3 + 'rpx',
      src: app.globalData.saveSrc,      //用户人像
      backgroundColor_red: app.globalData.saveRed,      //用户保存时的颜色
      backgroundColor_green: app.globalData.saveGreen,
      backgroundColor_blue: app.globalData.saveBlue,
    });
    app.globalData.phone_height = phone_height;
  },

  /**下载 */
  downloadImage: function () {
    var that = this;
    that.setData({
      loadingHidden:false,
    })
    wx.downloadFile({
      url: app.globalData.downloadPath,
      success: function (res) {
        console.log(res);
        var rr = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: rr,
          success(res) {
            that.setData({
              loadingHidden: true,
            })
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (res) {
            console.log(res.errMsg)
            if (res.errMsg == "saveImageToPhotosAlbum:fail:auth denied") {
              wx.showModal({
                title: '保存图片授权',
                content: '授权失败，请点击确定重新授权',
                success: function (res) {
                  if (res.confirm) {
                    wx.openSetting({
                      success: (res) => {
                        if (res.authSetting["scope.writePhotosAlbum"]) {////如果用户重新同意了授权登录
                        }
                      }
                    })
                  }
                }
              })
            }
            that.setData({
              loadingHidden: true,
            })
            wx.showToast({
              title: '请再次点击保存',
              icon: 'success',
              duration: 2000
            })
          }
        }) 
      },
      fail:function(){
        that.setData({
          loadingHidden: true,
        })
        wx.showToast({
          title: '请再次点击保存',
          icon: 'success',
          duration: 2000
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