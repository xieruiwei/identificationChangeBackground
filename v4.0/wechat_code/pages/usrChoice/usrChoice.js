var app = getApp();
var timer; // 计时器
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone_height: '504px',        //获取手机高度
    phone_height_half:'25px',    //手机高度的一半
    imgPath:'../image/test.jpg', //展示图片  路径
    img_height:'25px',           //用户图片所占高度  也是白色图层的高
    img_height_noChange: '25',   //用户图片所占高度  也是白色图层的高  不会变换  没有px
    scroll_height:'200px',       //横向滑块高度
    backgroundColor_red: '255',  //用户图片的背景颜色  rgb通道red
    backgroundColor_green: '0',  //用户图片的背景颜色  rgb通道green
    backgroundColor_blue: '0',   //用户图片的背景颜色  rgb通道blue
    sizeChoice:'一寸',        //用户选择文字显示
    colorChoice: '_红底',          //用户选择颜色显示
    meiyanChoice:'',        //用户是否选择轻美颜
    usrChoiceContent: "一寸_红底", //用户选择尺寸颜色显示
    loadingHidden:false,         //AI智能生成中  弹窗是否隐藏
    loadingHidden1: true,        //AI智能合成中  弹窗是否隐藏
    loadingHidden2:true,         //美颜中
    beautyFace_have:0,           //是否已经美颜
    saveImgWidth:'260',          //合成保存的图像 宽度
    saveImgHeigth: '378',        //合成保存的图像 高度

    /**白色图层的宽 高（高与用户图片所占高度一样）*/
    bw: '500rpx',
    bh: '200px',
    /**生成的图片  宽高*/
    imgw: '0rpx',
    imgh: '730rpx',

    /**五个颜色球点击  大小，阴影颜色，margin-top 的变化 */
    circle: [
    {width:'60rpx',height:'60rpx',margin_top:'25rpx',box_shadow:'20rpx 20rpx 10rpx #E6E6F2'},
    {width:'60rpx',height:'60rpx',margin_top:'25rpx',box_shadow:'20rpx 20rpx 10rpx #E6E6F2'},
    {width:'60rpx',height:'60rpx',margin_top:'25rpx',box_shadow:'20rpx 20rpx 10rpx #E6E6F2'},      {width:'60rpx',height:'60rpx',margin_top:'25rpx',box_shadow:'20rpx 20rpx 10rpx #E6E6F2'},
    {width:'60rpx',height:'60rpx',margin_top:'25rpx',box_shadow:'20rpx 20rpx 10rpx #E6E6F2'}],
    circle_2_have_change:0,  //美颜球是否已经点击
    circle_have_change: 1,   //保存哪个球是否已经点击

    /**所有size选项长方形点击 阴影颜色，margin-top 的变化 */
    matrix: [{margin_top:'50rpx',margin_bottom:'0rpx',box_shadow: '20rpx 20rpx 10rpx #E6E6F2'},
      { margin_top: '50rpx', margin_bottom: '0rpx', box_shadow: '20rpx 20rpx 10rpx #E6E6F2' },
      { margin_top: '50rpx', margin_bottom: '0rpx', box_shadow: '20rpx 20rpx 10rpx #E6E6F2' },
      { margin_top: '50rpx', margin_bottom: '0rpx', box_shadow: '20rpx 20rpx 10rpx #E6E6F2' },
      { margin_top: '50rpx', margin_bottom: '0rpx', box_shadow: '20rpx 20rpx 10rpx #E6E6F2' },
      { margin_top: '50rpx', margin_bottom: '0rpx', box_shadow: '20rpx 20rpx 10rpx #E6E6F2' },
      { margin_top: '50rpx', margin_bottom: '0rpx', box_shadow: '20rpx 20rpx 10rpx #E6E6F2' },
      { margin_top: '50rpx', margin_bottom: '0rpx', box_shadow: '20rpx 20rpx 10rpx #E6E6F2' },
      { margin_top: '50rpx', margin_bottom: '0rpx', box_shadow: '20rpx 20rpx 10rpx #E6E6F2' },
      { margin_top: '50rpx', margin_bottom: '0rpx', box_shadow: '20rpx 20rpx 10rpx #E6E6F2' },],    
       matrix_have_change:9,

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
  },

  onLoad: function (options) {
    var that = this;

    that.faceTocut();  //则进行人像分割处理

    //获取手机屏幕 宽度 高度
    that.setData({
      imgPath: app.globalData.imageChangePath,                        //原图像
      phone_height: app.globalData.phone_height+'px',          //设置手机屏幕高度
      phone_height_half: app.globalData.phone_height / 2 + 'px', 
      img_height: app.globalData.phone_height / 12 * 5 + 'px',
      img_height_noChange: app.globalData.phone_height / 12 * 5,
      bh: app.globalData.phone_height / 10 * 4 + 'px',
      bw: app.globalData.phone_height * 0.3 + 'px',
      imgh: app.globalData.phone_height / 10 * 4 - 10 + 'px',
      imgw: app.globalData.phone_height * 0.3 - 10 + 'px',
      scroll_height: app.globalData.phone_height / 4.2 + 'px',
    });
    console.log(that.data.img_height)
  },

  onReady: function () {
  },
  onShow: function () {
  },
  onHide: function () {
  },
  onUnload: function () {
  },
  onPullDownRefresh: function () {
  },
  onReachBottom: function () {
  },
  onShareAppMessage: function () {
  },

/*判断是否要用  美颜图片  还是切割图片 */
  beautyImage_or_no:function(){
    var that = this;
    if (that.data.circle_2_have_change==0){  //没有点击美颜
      that.setData({
        imgPath: app.globalData.serverPath, //更换用户图片   改为人像分割图
      })
    }
    else{
      that.setData({
        imgPath: app.globalData.beautyPath, //更换用户图片   改为人像分割图
      })
    }
  },

/**人抠图 分割函数 */
  faceTocut:function () {   //人像背景分割处理
  var that = this;
    wx.request({
      url: app.globalData.url + 'BodyanalysisServlet', // 仅为示例，并非真实的接口地址
      data: {
        path: app.globalData.path,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        app.globalData.serverPath = app.globalData.url + "bodyanalysisPath" + app.globalData.path + '.png';     //成功后的回调
        console.log(app.globalData.serverPath);
        that.setData({
          loadingHidden:true,
        })
      }
    })
  },

  /**五个颜色球点击  大小，阴影颜色，margin-top 的变化 */
  change_circle_1: function () {
    var that = this;
    var index = that.data.circle_have_change;
    if (index==0)
      return;
    var c_width = 'circle[' + index + '].width';
    var c_height = 'circle[' + index + '].height';
    var c_margin_top = 'circle[' + index + '].margin_top';
    var c_box_shadow = 'circle[' + index + '].box_shadow';
    var colorChoice = '_原图';
    that.setData({
      imgPath: app.globalData.url+'upload'+app.globalData.path+'.png',      //更换用户图片   改为原图
      backgroundColor_red: '255',  //用户图片的背景颜色  rgb通道red   总体白色
      backgroundColor_green: '255',  //用户图片的背景颜色  rgb通道green
      backgroundColor_blue: '255',   //用户图片的背景颜色  rgb通道blue
      colorChoice: '_原图',            //原图
      usrChoiceContent: that.data.sizeChoice + colorChoice, //用户选择尺寸 与颜色
      'circle[0].width':'80rpx',
      'circle[0].height': '80rpx',
      'circle[0].margin_top': '0rpx',
      'circle[0].box_shadow': '20rpx 20rpx 10rpx #888888', 
      [c_width]: '60rpx',
      [c_height]: '60rpx',
      [c_margin_top]: '25rpx',
      [c_box_shadow]: '20rpx 20rpx 10rpx #E6E6F2',
      circle_have_change:0,
    });
  },
  change_circle_3: function () {
    var that = this;

    //判断是否点击美颜   点击则选择美颜图片  否则选择不美颜图片
    that.beautyImage_or_no();

    var index = that.data.circle_have_change; 
    if (index == 2)
      return;
    var c_width = 'circle[' + index + '].width';
    var c_height = 'circle[' + index + '].height';
    var c_margin_top = 'circle[' + index + '].margin_top';
    var c_box_shadow = 'circle[' + index + '].box_shadow';
    var colorChoice = '_白底';
    that.setData({          
      backgroundColor_red: '255',  //用户图片的背景颜色  rgb通道red     总体白色
      backgroundColor_green: '255',  //用户图片的背景颜色  rgb通道green
      backgroundColor_blue: '255',   //用户图片的背景颜色  rgb通道blue
      colorChoice: '_白底',            //白色
      usrChoiceContent: that.data.sizeChoice + colorChoice, //用户选择尺寸 与颜色
      'circle[2].width': '80rpx',
      'circle[2].height': '80rpx',
      'circle[2].margin_top': '0rpx',
      'circle[2].box_shadow': '20rpx 20rpx 10rpx #888888',
      [c_width]: '60rpx',
      [c_height]: '60rpx',
      [c_margin_top]: '25rpx',
      [c_box_shadow]: '20rpx 20rpx 10rpx #E6E6F2',
      circle_have_change: 2,
    });
  },
  change_circle_4: function () {
    var that = this;
    //判断是否点击美颜   点击则选择美颜图片  否则选择不美颜图片
    that.beautyImage_or_no();

    var index = that.data.circle_have_change;
    if (index == 3)
      return;
    var c_width = 'circle[' + index + '].width';
    var c_height = 'circle[' + index + '].height';
    var c_margin_top = 'circle[' + index + '].margin_top';
    var c_box_shadow = 'circle[' + index + '].box_shadow';
    var colorChoice = '_蓝底';
    that.setData({
      backgroundColor_red: '85',  //用户图片的背景颜色  rgb通道red   总体蓝色
      backgroundColor_green: '153',  //用户图片的背景颜色  rgb通道green
      backgroundColor_blue: '255',   //用户图片的背景颜色  rgb通道blue
      colorChoice: '_蓝底',            //蓝色
      usrChoiceContent: that.data.sizeChoice + colorChoice, //用户选择尺寸 与颜色
      'circle[3].width': '80rpx',
      'circle[3].height': '80rpx',
      'circle[3].margin_top': '0rpx',
      'circle[3].box_shadow': '20rpx 20rpx 10rpx #888888',
      [c_width]: '60rpx',
      [c_height]: '60rpx',
      [c_margin_top]: '25rpx',
      [c_box_shadow]: '20rpx 20rpx 10rpx #E6E6F2',
      circle_have_change: 3,
    });
  },
  change_circle_5: function () {
    var that = this;
    //判断是否点击美颜   点击则选择美颜图片  否则选择不美颜图片
    that.beautyImage_or_no();

    var index = that.data.circle_have_change;
    if (index == 4)
      return;
    var c_width = 'circle[' + index + '].width';
    var c_height = 'circle[' + index + '].height';
    var c_margin_top = 'circle[' + index + '].margin_top';
    var c_box_shadow = 'circle[' + index + '].box_shadow';
    var colorChoice = '_红底';
    that.setData({
      backgroundColor_red: '255',  //用户图片的背景颜色  rgb通道red   总体红色
      backgroundColor_green: '0',  //用户图片的背景颜色  rgb通道green
      backgroundColor_blue: '0',   //用户图片的背景颜色  rgb通道blue
      colorChoice: '_红底',            //红色
      usrChoiceContent: that.data.sizeChoice + colorChoice, //用户选择尺寸 与颜色
      'circle[4].width': '80rpx',
      'circle[4].height': '80rpx',
      'circle[4].margin_top': '0rpx',
      'circle[4].box_shadow': '20rpx 20rpx 10rpx #888888',
      [c_width]: '60rpx',
      [c_height]: '60rpx',
      [c_margin_top]: '25rpx',
      [c_box_shadow]: '20rpx 20rpx 10rpx #E6E6F2',
      circle_have_change: 4,
    });
  },
  change_circle_2: function () {
    var that = this;
    var index = that.data.circle_have_change;
    if (that.data.circle_2_have_change==0){
      //美颜servlet
      that.setData({
        loadingHidden2: false,
        backgroundColor_red: '255',         //用户图片的背景颜色  rgb通道red   总体白色
        backgroundColor_green: '255',       //用户图片的背景颜色  rgb通道green
        backgroundColor_blue: '255',        //用户图片的背景颜色  rgb通道blue
        meiyanChoice:'轻美颜_',
        'circle[1].width': '80rpx',
        'circle[1].height': '80rpx',
        'circle[1].margin_top': '0rpx',
        'circle[1].box_shadow': '20rpx 20rpx 10rpx #888888',
        circle_2_have_change: 1,
      });
      if(that.data.beautyFace_have==0){
        that.beauthFace();
      }
      else{
        that.setData({
          loadingHidden2: true,
          imgPath: app.globalData.beautyPath,      //更换用户图片   改为美颜后的人像分割图
        });
      }
      
    }
    else if(index==0){
      that.setData({
        meiyanChoice: '',
        imgPath: app.globalData.imageChangePath,   //更换用户图片   改为没有美颜的人像分割图
        backgroundColor_red: '255',  //用户图片的背景颜色  rgb通道red   总体白色
        backgroundColor_green: '255',  //用户图片的背景颜色  rgb通道green
        backgroundColor_blue: '255',   //用户图片的背景颜色  rgb通道blue
        'circle[1].width': '60rpx',
        'circle[1].height': '60rpx',
        'circle[1].margin_top': '25rpx',
        'circle[1].box_shadow': '20rpx 20rpx 10rpx #E6E6F2',
        circle_2_have_change: 0,
      });
    }
    else{
      that.setData({
        meiyanChoice: '',
        imgPath: app.globalData.serverPath,      //更换用户图片   改为没有美颜的人像分割图
        backgroundColor_red: '255',  //用户图片的背景颜色  rgb通道red   总体白色
        backgroundColor_green: '255',  //用户图片的背景颜色  rgb通道green
        backgroundColor_blue: '255',   //用户图片的背景颜色  rgb通道blue
        'circle[1].width': '60rpx',
        'circle[1].height': '60rpx',
        'circle[1].margin_top': '25rpx',
        'circle[1].box_shadow': '20rpx 20rpx 10rpx #E6E6F2',
        circle_2_have_change: 0,
      });
    }

  },



  matrix_0: function () {
    var that = this;
    var index = that.data.matrix_have_change;
    if (index == 0)
      return;
    var m_margin_top = 'matrix[' + index + '].margin_top';
    var m_margin_bottom = 'matrix[' + index + '].margin_bottom';
    var m_box_shadow = 'matrix[' + index + '].box_shadow';
    var sizeChoice = "英语四六级";
    var img_height = that.data.img_height_noChange;
    that.setData({
      saveImgWidth: '144',          //合成保存的图像 宽度
      saveImgHeigth: '192',        //合成保存的图像 高度
      bh: img_height + 'px',
      bw: img_height * 144 / 192 + 'px',
      imgh: img_height - 10 + 'px',
      imgw: img_height * 144 / 192 - 10 + 'px',
      sizeChoice: "英语四六级",     //用户选择尺寸
      usrChoiceContent: sizeChoice + that.data.colorChoice, //用户选择尺寸 与颜色: sizeChoice,
      matrix_have_change: 0,
      'matrix[0].margin_top': '0rpx',
      'matrix[0].margin_bottom': '50rpx',
      'matrix[0].box_shadow': '20rpx 20rpx 10rpx #888888',
      [m_margin_top]: '50rpx',
      [m_margin_bottom]: '0rpx',
      [m_box_shadow]: '20rpx 20rpx 10rpx #E6E6F2',
    });
  },
  matrix_1: function () {
    var that = this;
    var index = that.data.matrix_have_change;
    if (index == 1)
      return;
    var m_margin_top = 'matrix[' + index + '].margin_top';
    var m_margin_bottom = 'matrix[' + index + '].margin_bottom';
    var m_box_shadow = 'matrix[' + index + '].box_shadow';
    var sizeChoice = "全国计算机等级考试";
    var img_height = that.data.img_height_noChange;
    that.setData({
      saveImgWidth: '144',          //合成保存的图像 宽度
      saveImgHeigth: '192',        //合成保存的图像 高度
      bh: img_height + 'px',
      bw: img_height * 144 / 192 + 'px',
      imgh: img_height - 10 + 'px',
      imgw: img_height * 144 / 192 - 10 + 'px',
      sizeChoice: "全国计算机等级考试",     //用户选择尺寸
      usrChoiceContent: sizeChoice + that.data.colorChoice, //用户选择尺寸 与颜色: sizeChoice,
      matrix_have_change: 1,
      'matrix[1].margin_top': '0rpx',
      'matrix[1].margin_bottom': '50rpx',
      'matrix[1].box_shadow': '20rpx 20rpx 10rpx #888888',
      [m_margin_top]: '50rpx',
      [m_margin_bottom]: '0rpx',
      [m_box_shadow]: '20rpx 20rpx 10rpx #E6E6F2',
    });
  },
  matrix_2: function () {
    var that = this;
    var index = that.data.matrix_have_change;
    if (index == 2)
      return;
    var m_margin_top = 'matrix[' + index + '].margin_top';
    var m_margin_bottom = 'matrix[' + index + '].margin_bottom';
    var m_box_shadow = 'matrix[' + index + '].box_shadow';
    var sizeChoice = "驾驶证、驾照";
    var img_height = that.data.img_height_noChange;
    that.setData({
      saveImgWidth: '144',          //合成保存的图像 宽度
      saveImgHeigth: '192',        //合成保存的图像 高度
      bh: img_height + 'px',
      bw: img_height * 144 / 192 + 'px',
      imgh: img_height - 10 + 'px',
      imgw: img_height * 144 / 192 - 10 + 'px',
      sizeChoice: "驾驶证、驾照",     //用户选择尺寸
      usrChoiceContent: sizeChoice + that.data.colorChoice, //用户选择尺寸 与颜色: sizeChoice,
      matrix_have_change: 2,
      'matrix[2].margin_top': '0rpx',
      'matrix[2].margin_bottom': '50rpx',
      'matrix[2].box_shadow': '20rpx 20rpx 10rpx #888888',
      [m_margin_top]: '50rpx',
      [m_margin_bottom]: '0rpx',
      [m_box_shadow]: '20rpx 20rpx 10rpx #E6E6F2',
    });
  },
  matrix_3: function () {
    var that = this;
    var index = that.data.matrix_have_change;
    if (index == 3)
      return;
    var m_margin_top = 'matrix[' + index + '].margin_top';
    var m_margin_bottom = 'matrix[' + index + '].margin_bottom';
    var m_box_shadow = 'matrix[' + index + '].box_shadow';
    var sizeChoice = "小一寸";
    var img_height = that.data.img_height_noChange - 30;
    that.setData({
      saveImgWidth: '260',          //合成保存的图像 宽度
      saveImgHeigth: '378',        //合成保存的图像 高度
      bh: img_height + 'px',
      bw: img_height * 260 / 378 + 'px',
      imgh: img_height - 10 + 'px',
      imgw: img_height * 260 / 378 - 10 + 'px',
      sizeChoice: "小一寸",     //用户选择尺寸
      usrChoiceContent: sizeChoice + that.data.colorChoice, //用户选择尺寸 与颜色: sizeChoice,
      matrix_have_change: 3,
      'matrix[3].margin_top': '0rpx',
      'matrix[3].margin_bottom': '50rpx',
      'matrix[3].box_shadow': '20rpx 20rpx 10rpx #888888',
      [m_margin_top]: '50rpx',
      [m_margin_bottom]: '0rpx',
      [m_box_shadow]: '20rpx 20rpx 10rpx #E6E6F2',
    });
  },
  matrix_4: function () {
    var that = this;
    var index = that.data.matrix_have_change;
    if (index == 4)
      return;
    var m_margin_top = 'matrix[' + index + '].margin_top';
    var m_margin_bottom = 'matrix[' + index + '].margin_bottom';
    var m_box_shadow = 'matrix[' + index + '].box_shadow';
    var sizeChoice = "一寸";
    var img_height = that.data.img_height_noChange - 20;
    that.setData({
      saveImgWidth: '295',          //合成保存的图像 宽度
      saveImgHeigth: '413',        //合成保存的图像 高度
      bh: img_height + 'px',
      bw: img_height * 295 / 431 + 'px',
      imgh: img_height - 10 + 'px',
      imgw: img_height * 295 / 431 - 10 + 'px',
      sizeChoice: "一寸",     //用户选择尺寸
      usrChoiceContent: sizeChoice + that.data.colorChoice, //用户选择尺寸 与颜色: sizeChoice,
      matrix_have_change: 4,
      'matrix[4].margin_top': '0rpx',
      'matrix[4].margin_bottom': '50rpx',
      'matrix[4].box_shadow': '20rpx 20rpx 10rpx #888888',
      [m_margin_top]: '50rpx',
      [m_margin_bottom]: '0rpx',
      [m_box_shadow]: '20rpx 20rpx 10rpx #E6E6F2',
    });
  },
  matrix_5: function () {
    var that = this;
    var index = that.data.matrix_have_change;
    if (index == 5)
      return;
    var m_margin_top = 'matrix[' + index + '].margin_top';
    var m_margin_bottom = 'matrix[' + index + '].margin_bottom';
    var m_box_shadow = 'matrix[' + index + '].box_shadow';
    var sizeChoice = "大一寸" ;
    var img_height = that.data.img_height_noChange - 10;
    that.setData({
      saveImgWidth: '390',          //合成保存的图像 宽度
      saveImgHeigth: '567',        //合成保存的图像 高度
      bh: img_height + 'px',
      bw: img_height * 390 / 567 + 'px',
      imgh: img_height - 10 + 'px',
      imgw: img_height * 390 / 567 - 10 + 'px',
      sizeChoice: "大一寸",     //用户选择尺寸
      usrChoiceContent: sizeChoice + that.data.colorChoice, //用户选择尺寸 与颜色: sizeChoice,
      matrix_have_change: 5,
      'matrix[5].margin_top': '0rpx',
      'matrix[5].margin_bottom': '50rpx',
      'matrix[5].box_shadow': '20rpx 20rpx 10rpx #888888',
      [m_margin_top]: '50rpx',
      [m_margin_bottom]: '0rpx',
      [m_box_shadow]: '20rpx 20rpx 10rpx #E6E6F2',
    });
  },
  matrix_6: function () {
    var that = this;
    var index = that.data.matrix_have_change;
    if (index == 6)
      return;
    var m_margin_top = 'matrix[' + index + '].margin_top';
    var m_margin_bottom = 'matrix[' + index + '].margin_bottom';
    var m_box_shadow = 'matrix[' + index + '].box_shadow';
    var sizeChoice = "小二寸";
    var img_height = that.data.img_height_noChange;
    that.setData({
      saveImgWidth: '413',          //合成保存的图像 宽度
      saveImgHeigth: '531',        //合成保存的图像 高度
      bh: img_height + 'px',
      bw: img_height * 413 / 531 + 'px',
      imgh: img_height - 10 + 'px',
      imgw: img_height * 413 / 531 - 10 + 'px',
      sizeChoice: "小二寸",     //用户选择尺寸
      usrChoiceContent: sizeChoice + that.data.colorChoice, //用户选择尺寸 与颜色: sizeChoice,
      matrix_have_change: 6,
      'matrix[6].margin_top': '0rpx',
      'matrix[6].margin_bottom': '50rpx',
      'matrix[6].box_shadow': '20rpx 20rpx 10rpx #888888',
      [m_margin_top]: '50rpx',
      [m_margin_bottom]: '0rpx',
      [m_box_shadow]: '20rpx 20rpx 10rpx #E6E6F2',
    });
  },
  matrix_7: function () {
    var that = this;
    var index = that.data.matrix_have_change;
    if (index == 7)
      return;
    var m_margin_top = 'matrix[' + index + '].margin_top';
    var m_margin_bottom = 'matrix[' + index + '].margin_bottom';
    var m_box_shadow = 'matrix[' + index + '].box_shadow';
    var sizeChoice = "二寸";
    var img_height = that.data.img_height_noChange;
    that.setData({
      saveImgWidth: '413',          //合成保存的图像 宽度
      saveImgHeigth: '579',        //合成保存的图像 高度
      bh: img_height + 'px',
      bw: img_height * 413 / 579 + 'px',
      imgh: img_height - 10 + 'px',
      imgw: img_height * 413 / 579 - 10 + 'px',
      sizeChoice: "二寸",     //用户选择尺寸
      usrChoiceContent: sizeChoice + that.data.colorChoice, //用户选择尺寸 与颜色: sizeChoice,
      matrix_have_change: 7,
      'matrix[7].margin_top': '0rpx',
      'matrix[7].margin_bottom': '50rpx',
      'matrix[7].box_shadow': '20rpx 20rpx 10rpx #888888',
      [m_margin_top]: '50rpx',
      [m_margin_bottom]: '0rpx',
      [m_box_shadow]: '20rpx 20rpx 10rpx #E6E6F2',
    });
  },
  matrix_8: function () {
    var that = this;
    var index = that.data.matrix_have_change;
    if (index == 8)
      return;
    var m_margin_top = 'matrix[' + index + '].margin_top';
    var m_margin_bottom = 'matrix[' + index + '].margin_bottom';
    var m_box_shadow = 'matrix[' + index + '].box_shadow';
    var sizeChoice = "签证";
    var img_height = that.data.img_height_noChange;
    that.setData({
      saveImgWidth: '531',          //合成保存的图像 宽度
      saveImgHeigth: '531',        //合成保存的图像 高度
      bh: img_height + 'px',
      bw: img_height * 531 / 531 + 'px',
      imgh: img_height - 10 + 'px',
      imgw: img_height * 531 / 531 - 10 + 'px',
      sizeChoice: "签证",     //用户选择尺寸
      usrChoiceContent: sizeChoice + that.data.colorChoice, //用户选择尺寸 与颜色: sizeChoice,
      matrix_have_change: 8,
      'matrix[8].margin_top': '0rpx',
      'matrix[8].margin_bottom': '50rpx',
      'matrix[8].box_shadow': '20rpx 20rpx 10rpx #888888',
      [m_margin_top]: '50rpx',
      [m_margin_bottom]: '0rpx',
      [m_box_shadow]: '20rpx 20rpx 10rpx #E6E6F2',
    });
  },
  matrix_9: function () {
    var that = this;
    var index = that.data.matrix_have_change;
    if (index == 9)
      return;
    var m_margin_top = 'matrix[' + index + '].margin_top';
    var m_margin_bottom = 'matrix[' + index + '].margin_bottom';
    var m_box_shadow = 'matrix[' + index + '].box_shadow';
    var sizeChoice = "普通话水平测试" ;
    var img_height = that.data.img_height_noChange;
    that.setData({
      saveImgWidth: '390',          //合成保存的图像 宽度
      saveImgHeigth: '567',        //合成保存的图像 高度
      bh: img_height + 'px',
      bw: img_height * 390 / 567 + 'px',
      imgh: img_height - 10 + 'px',
      imgw: img_height * 390 / 567 - 10 + 'px',
      sizeChoice: "普通话水平测试",     //用户选择尺寸
      usrChoiceContent: sizeChoice + that.data.colorChoice, //用户选择尺寸 与颜色: sizeChoice,
      matrix_have_change: 9,
      'matrix[9].margin_top': '0rpx',
      'matrix[9].margin_bottom': '50rpx',
      'matrix[9].box_shadow': '20rpx 20rpx 10rpx #888888',
      [m_margin_top]: '50rpx',
      [m_margin_bottom]: '0rpx',
      [m_box_shadow]: '20rpx 20rpx 10rpx #E6E6F2',
    });
  },


/*合成并保存下载 */
  saveImg:function(){
    var that = this;
    /**与背景合成 */
    that.addImage();
    
  },

  /*与背景合成 */
  addImage:function(){
    var that = this;
    /**AI智能合成中  显示 */
    that.setData({
      loadingHidden1: false,
    }),

    /*合成的时候保存选择的图像 及颜色 */
      app.globalData.saveSrc = that.data.imgPath,      //用户人像
      app.globalData.saveRed = that.data.backgroundColor_red,      //用户保存时的颜色
      app.globalData.saveGreen = that.data.backgroundColor_green,
      app.globalData.saveBlue = that.data.backgroundColor_blue,
      wx.request({
        url: app.globalData.url + 'AddImage', // 仅为示例，并非真实的接口地址
        data: {
          backgroundColor_red: that.data.backgroundColor_red,    //用户图片的背景颜色rgb通道red 
          backgroundColor_green: that.data.backgroundColor_green,//用户图片的背景颜rgb通道green
          backgroundColor_blue: that.data.backgroundColor_blue, //用户图片的背景颜色rgb通道blue
          targetWidth: that.data.saveImgWidth,
          targetHeight: that.data.saveImgHeigth,
          path: app.globalData.path,
          beautyFace_have: that.data.circle_2_have_change,      //用户是否选择了美颜图片
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data.downloadPath);
          app.globalData.downloadPath = app.globalData.url + res.data.downloadPath;
          console.log(app.globalData.downloadPath)
          that.setData({
            loadingHidden1: true
          })
          wx.navigateTo({
            url: '../saveImage/saveImage',
            success: function () { },       //成功后的回调；
          })
        }
      })
  },

  //美颜
  beauthFace:function(){
    var that = this;
    wx.request({
      url: app.globalData.url + 'BeautyFace', // 仅为示例，并非真实的接口地址
      data: {
        path: app.globalData.path,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        app.globalData.beautyPath = app.globalData.url + 'beauty' + app.globalData.path+'.png';
        console.log(app.globalData.beautyPath);
        that.setData({
          loadingHidden2: true,
          imgPath: app.globalData.beautyPath,      //更换用户图片   改为美颜后的人像分割图
          beautyFace_have:1,                       //已经美颜好了
        });
      }
    })
  }
})