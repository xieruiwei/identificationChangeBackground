// pages/bodynanlysis/bodyanalysis.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**AI智能生成*/
    loadingHidden:true,
    oldImage: '../image/1.jpg',           //人像抠图前图片
    serverPath: '../image/test.jpg',    //人像抠图  图片
    backgroundColor:'#5599FF',                   //被更换的背景颜色
  },
  /** 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    //获取服务器生成的  人像抠图  图片
    var that = this;
    var serverPath = app.globalData.serverPath;
    that.setData({
      serverPath:serverPath,
    });
  },
  //更换背景的--更换原来图片的按钮
  setImage: function () {
    var that = this;
    var imageChangePath = app.globalData.imageChangePath;
    app.globalData.backgroundColor = 'white';
    that.setData({
      backgroundColor: app.globalData.backgroundColor,
      serverPath: imageChangePath
    });
  },
  //更换背景的红色按钮
  setRed: function () {
    //获取服务器生成的  人像抠图  图片
    var that = this;
    var serverPath = app.globalData.serverPath;
    app.globalData.backgroundColor = 'red';
    that.setData({
      serverPath: serverPath,
      backgroundColor: app.globalData.backgroundColor
    });
  },
  //更换背景的白色按钮
  setWhite: function () {
    //获取服务器生成的  人像抠图  图片
    var that = this;
    var serverPath = app.globalData.serverPath;
    app.globalData.backgroundColor = 'white';
    that.setData({
      serverPath: serverPath,
      backgroundColor: app.globalData.backgroundColor,
    }); 
  },
  //更换背景的蓝色按钮
  setBlue:function () {
    //获取服务器生成的  人像抠图  图片
    var that = this;
    var serverPath = app.globalData.serverPath;
    app.globalData.backgroundColor = '#5599FF';
    that.setData({
      serverPath: serverPath,
      backgroundColor: app.globalData.backgroundColor,
    }); 
  },
  /**与背景  合成图片 */
  addImage: function () {
    var that = this;
    /**AI智能生成中  隐藏 */
    that.setData({
      loadingHidden: false,
    }),
    wx.request({
      url: app.globalData.url + 'AddImage', // 仅为示例，并非真实的接口地址
      data: {
        backgroundColor: app.globalData.backgroundColor,
        targetWidth: app.globalData.targetWidth,
        targetHeight: app.globalData.targetHeight,
        path: app.globalData.path,
        lostHeight:app.globalData.lostHeight,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.downloadPath);
        app.globalData.downloadPath = app.globalData.url + res.data.downloadPath;
        wx.navigateTo({
          url: '../download/download',  
          success: function() {
            /**AI智能生成中  隐藏 */
            that.setData({
              loadingHidden: true,
            })
           }        //成功后的回调
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})