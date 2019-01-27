// pages/changeBackground/changeBackground.js
var app = getApp();
Page({
  data: {
    imageChangePath:'../image/photoAlbum.png',
    serverPath:app.globalData.url+'img/upload',
    phone_height:'10px',
    colorChange1: '255',
    colorChange2:'255',
    colorChange3:'255'
  },

  onLoad: function () {
    var that = this;
    console.log("加载刷新~");
    //获取手机屏幕高度
    var phone_height;
    wx.getSystemInfo({
      success(res) {
        phone_height = res.windowHeight + "px";
      }
    })
    //获取图片地址
    var imageChangePath;
    this.setData({
      imageChangePath: app.globalData.imageChangePath,  //设置图片路径
      phone_height: phone_height,     //设置手机屏幕高度
    });
  },

  //生命周期函数--监听页面初次渲染完成
  onReady: function () {
    //上传图片
    var that = this;
    wx.uploadFile({
      url: app.globalData.url + 'UploadImage', // 仅为示例，非真实的接口地址
      filePath: app.globalData.imageChangePath[0],
      name: 'file',
      formData: {
        user: 'test'
      },
      success(res) {
        var json1 = JSON.parse(res.data);
        var path = json1.path;
        app.globalData.serverPath = path;
        console.log(app.globalData.serverPath);
      }
    })  
  },
  setRed:function() {
    var that = this;
    console.log("上传的地址" + app.globalData.serverPath);
    wx.request({
      url: app.globalData.url+'ChangeBackgroundServlet', // 仅为示例，并非真实的接口地址
      data: {
        image: app.globalData.serverPath,
        color1: '0',
        color2: '0',
        color3: '255'
      },
      method: 'get',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        that.data.imageChangePath = app.globalData.url + 'download' + app.globalData.serverPath + '00255.jpg';
        app.globalData.imageChangePath = that.data.imageChangePath;
        console.log(app.globalData.imageChangePath)
        if (getCurrentPages().length != 0) {
          //刷新当前页面的数据
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
        }
      },
    })
  },
  setWhite: function () {
    var that = this;
    console.log("上传的地址" + app.globalData.serverPath);
    wx.request({
      url: app.globalData.url + 'ChangeBackgroundServlet', // 仅为示例，并非真实的接口地址
      data: {
        image: app.globalData.serverPath,
        color1: that.data.colorChange3,
        color2: that.data.colorChange2,
        color3: that.data.colorChange1
      },
      method: 'get',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        that.data.imageChangePath = app.globalData.url + 'download' + app.globalData.serverPath + that.data.colorChange3 + that.data.colorChange2 + that.data.colorChange1 + '.jpg';
        app.globalData.imageChangePath = that.data.imageChangePath;
        console.log(app.globalData.imageChangePath)
        if (getCurrentPages().length != 0) {
          //刷新当前页面的数据
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
        }
      },
    })
  },
  setBlue: function () {
    var that = this;
    console.log("上传的地址" + app.globalData.serverPath);
    wx.request({
      url: app.globalData.url + 'ChangeBackgroundServlet', // 仅为示例，并非真实的接口地址
      data: {
        image: app.globalData.serverPath,
        color1: '210',
        color2: '98',
        color3: '97'
      },
      method: 'get',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        that.data.imageChangePath = app.globalData.url + 'download' + app.globalData.serverPath + '2109897.jpg';
        app.globalData.imageChangePath = that.data.imageChangePath;
        console.log(app.globalData.imageChangePath)
        if (getCurrentPages().length != 0) {
          //刷新当前页面的数据
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
        }
      },
    })
  },



  downloadImage:function(){
    wx.downloadFile({
      url: app.globalData.imageChangePath,
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



  sliderColorChange:function(e){
    console.log( e.detail.value)
    var that = this;
    var colorChange1,colorChange2,colorChange3;
    //设置颜色
    if(e.detail.value <= 45) {
      colorChange1 = 255;
      colorChange2 = 255;
      colorChange3 = 255;
    }
    else if (e.detail.value <= 300){
      colorChange1 = 255;
      colorChange2 = e.detail.value - 45;
      colorChange3 = 0;
    } 
    else if (e.detail.value <= 555) {
      colorChange1 = 555 - e.detail.value;
      colorChange2 = 255;
      colorChange3 = 0;
    }
    else if (e.detail.value <= 810) {
      colorChange1 = 0;
      colorChange2 = 255;
      colorChange3 = e.detail.value - 555;
    }
    else if (e.detail.value <= 1065) {
      colorChange1 = 0;
      colorChange2 = 1065 - e.detail.value;
      colorChange3 = 255;
    }
    else if (e.detail.value <= 1320) {
      colorChange1 = e.detail.value - 1065;
      colorChange2 = 0;
      colorChange3 = 255;
    }
    else if (e.detail.value <= 1565) {
      colorChange1 = 255;
      colorChange2 = 0;
      colorChange3 = 1565 - e.detail.value;
    }
    else if (e.detail.value <= 1610) {
      colorChange1 = 0;
      colorChange2 = 0;
      colorChange3 = 0;
    }
    this.setData({     //设置颜色
      colorChange1: colorChange1,
      colorChange2: colorChange2,
      colorChange3: colorChange3
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
      title: 'xx小程序',
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

  }

})


