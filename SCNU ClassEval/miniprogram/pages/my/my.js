
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
    
  },
  wait:function(){
    wx.showToast({
      title: '该功能还在研发，敬请期待',
      icon:'none',
      duration:2000
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    // if (app.globaldata.userInfo) {
    //   this.setData({
    //     userInfo: app.globaldata.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globaldata.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              // console.log(res.userInfo)
              that.setData({
                login:true,// 结果
                nickName:res.userInfo.nickName,// 微信昵称
                avatarUrl:res.userInfo.avatarUrl,// 微信头像
              })
            }
          })
        }else{
          // 未授权，返回false
          that.setData({
            login:false,
          })
        }
      }
    })
  },
  bindGetUserInfo (e) {
    var that = this;
    that.setData({
      login:true,
      nickName:e.detail.userInfo.nickName,    // 微信昵称
      avatarUrl:e.detail.userInfo.avatarUrl,    // 微信头像
    })
  },
//   getUserInfo: function (cb) {
//     var that = this
//     if (this.globaldata.userInfo) {
//         typeof cb == "function" && cb(this.globaldata.userInfo)
//     } else {
//         wx.getUserInfo({
//             success: function (res) {
//                 console.log('用户信息', res.userInfo)
//                 that.globaldata.userInfo = res.userInfo
//                 typeof cb == "function" && cb(that.globaldata.userInfo)
//             }
//         })
//     }
// },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 1
    })

}
    
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