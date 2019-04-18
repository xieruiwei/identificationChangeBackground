// pages/newIndex/newIndex.js

var app = getApp();
Page({
  data: {
    phone_height: '50px',      //获取手机高度
    matrix_margin_top:'100rpx',//提醒框距离顶部距离
    m_z_index:1,               //提醒窗口在第二层 点击变成第四层
    model_bottom:'300rpx',//滑块距离顶部距离
    /*轮播三色 */
    imgUrls: [
      '../image/blue.jpg',
      '../image/red.jpg',
      '../image/white.jpg'
    ],
  },
  know: function () {
    var that = this;
    wx.navigateTo({
      url: '../takePhoto/takePhoto',
      success: function () { },       //成功后的回调；
    })
    that.setData({
      m_z_index: 1,
    })
  },
  takePhoto:function(){
    var that = this;
    that.setData({
      m_z_index: 5,
    })
  },
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
      matrix_margin_top: (phone_height * 750 / phone_width-800)/2+'rpx',
      model_bottom: phone_height/4+'px',
    });
    app.globalData.phone_height = phone_height;
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