// page/component/login/login.js
Page({

  data:{
    userId:'',
    thumb: '',
    nickname: '',
    status:false
  },
  onShow() {
    const that = this;
    wx.checkSession({
      success: function () {
        //存在登陆态
        wx.getStorage({
          key: 'userInfo',
          success: function(res) {
            that.setData({
              thumb: res.data.avatarUrl,
              nickname: res.data.nickName,
              status: true
            })
          },fail:function(){
            //获取缓存失败
          }
        })
      },
      fail: function () {
        //不存在登陆态
          }
    })
  },
  userLogin: function () {
    const that = this;
        wx.login({
          success: function (res) {
            if (res.code) {
              // 发起网络请求
              that.onLogin(res.code);
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
  },
  onLogin: function(code){
    const that = this;
    wx.request({
      // 这里是接口地址,建议部署配置域名为https，否则可能会出问题，nginx加密证书配置见文章尾
      url: 'http://127.0.0.1:8080/login/login',
      data: {
        code: code
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          userId: res.data
        })
        //获取用户信息
        that.getUserInfo();
      }, fail: function (res) {

      }
    })
  },
  getUserInfo: function(){
      var that = this;
      wx.getUserInfo({
        success: function (res) {
          console.log(res);
          //存本地缓存
          wx.setStorage({
            key: 'userInfo',
            data: res.userInfo,
          })
          that.setData({
            thumb: res.userInfo.avatarUrl,
            nickname:res.userInfo.nickName
          })
          that.updateUser();
        }
      })
  },
  // onShow: function () {
  //   const self = this;
  //   self.getUserInfo();
  // },
  updateUser: function () {
    const that = this;
    //修改数据库用户信息
    wx.request({
      url: 'http://127.0.0.1:8080/user/update',
      data: {
        userId: that.data.userId,
        userName: that.data.nickname,
        password:123
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded;'
      },
      success: function (res) {
        console.log(res);
        wx.switchTab({
          url: '../index',
        })
      }, fail: function (res) {

      }
    })
  } 
})