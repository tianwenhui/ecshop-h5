// page/component/new-pages/user/address/address.js
Page({
  data:{
    address:{
      name:'',
      phone:'',
      detail:''
    }
  },
  onLoad(){
    var self = this;

    wx.request({
      url: 'http://127.0.0.1:8080/delivery/query',
      data: { userId: 1 },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        self.setData({
          addressList: res.data
        })

      }, fail: function (res) {

      }
    })
    wx.getStorage({
      key: 'address',
      success: function(res){
        self.setData({
          address : res.data
        })
      }
    })
  },
  formSubmit(e){
    const value = e.detail.value;
    if (value.name && value.phone && value.detail){

      /**
    * 发起请求获取订单列表信息
    */
      wx.request({
        url: 'http://127.0.0.1:8080/delivery/add',
        data: { delivery: '{peopleName:' + value.name + ',address:' + value.detail+',contactMobile:'+value.phone+'}', userId:1 },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data);
        }, fail: function (res) {

        }
      })


      wx.setStorage({
        key: 'address',
        data: value,
        success(){
          wx.navigateBack();
        }
      })
    }else{
      wx.showModal({
        title:'提示',
        content:'请填写完整资料',
        showCancel:false
      })
    }
  }
})