// pages/ranking/ranking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ranklist: []
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取课程数据(由于数据大于20条需要云函数)
    wx.cloud.callFunction({
      name: 'getpointlist',
      success(res) {
        console.log(res.result);
        that.setData({
          ranklist:res.result.data
        })
        //要用that！
        console.log(that.data.ranklist)
        console.log(that.data.ranklist[0].averagescore)
      
      },
      fail(err) {
      }
    })
    
      // 大体思路是获取averagescore
     //比较averagescore的大小
     //互换class name averagescore的属性
  
      
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