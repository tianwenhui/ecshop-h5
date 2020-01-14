// page/component/new-pages/user/user.js
Page({
  data:{
    thumb:'',
    nickname:'',
    orders:[],
    hasAddress:false,
    address:{}
  },
  onLoad(){
    var self = this;

    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        self.setData({
          thumb: res.data.avatarUrl,
          nickname: res.data.nickName
        })
         /**
         * 检查数据库是否存在此用户去数据库创建用户
         */
        wx.request({
          url: 'http://127.0.0.1:8080/login/ifLogin',
          data: { users: '{userName:"'+res.data.nickName+'"}' },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data);
          }, fail: function (res) {

          }
        })
      },
    })
    
  },
  onShow(){
    var self = this;
   
    /**
     * 获取本地缓存 地址信息
     */
    wx.getStorage({
      key: 'address',
      success: function(res){
        self.setData({
          hasAddress: true,
          address: res.data
        })
      }
    })
  },
  /**
   * 发起支付请求
   */
  payOrders(){
    wx.requestPayment({
      timeStamp: 'String1',
      nonceStr: 'String2',
      package: 'String3',
      signType: 'MD5',
      paySign: 'String4',
      success: function(res){
        console.log(res)
      },
      fail: function(res) {
        wx.showModal({
          title:'支付提示',
          content:'<text>',
          showCancel: false
        })
      }
    })
  }
})