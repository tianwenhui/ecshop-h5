// page/component/login/login.js
Page({

  userLogin: function () {
    wx.checkSession({
      success: function () {
        //存在登陆态
      },
      fail: function () {
         //不存在登陆态
        wx.login({
          success: function (res) {
            if (res.code) {
              // 发起网络请求
              wx.request({
                // 这里是接口地址,建议部署配置域名为https，否则可能会出问题，nginx加密证书配置见文章尾
                url: 'http://127.0.0.1:8080/login/login',
                data: {
                  code: res.code
                },
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  console.log(res.data);
                }, fail: function (res) {

                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })
  }
})