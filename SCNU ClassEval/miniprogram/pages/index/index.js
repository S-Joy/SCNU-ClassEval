Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [{
      id: 0,
      type: 'image',
      fileid: 'cloud://scnuca-4gp9nq6bd1a6b150.7363-scnuca-4gp9nq6bd1a6b150-1304921864/release.jpg'
    }, {
      id: 1,
        type: 'image',
        fileid: 'cloud://scnuca-4gp9nq6bd1a6b150.7363-scnuca-4gp9nq6bd1a6b150-1304921864/newyear.png',
    }, {
      id: 2,
      type: 'image',
      fileid: 'cloud://scnuca-4gp9nq6bd1a6b150.7363-scnuca-4gp9nq6bd1a6b150-1304921864/math.png'
    }, {
      id: 3,
      type: 'image',
      fileid: 'cloud://scnuca-4gp9nq6bd1a6b150.7363-scnuca-4gp9nq6bd1a6b150-1304921864/ca.jpg'
    }
  
  ],
    swiper: {
      x: 0,
      i: 0,
      magnify:'false',
      magnify2:'false',
      current_item:0,
      list: [{
          id: 0,
          name: "必修课",
          type: "compulsory",
          url:"https://7363-scnuca-4gp9nq6bd1a6b150-1304921864.tcb.qcloud.la/compulspry.jpg?sign=fbe12039caa77c53dfd054dacbe01ab4&t=1613908517",
          icon:"https://i.loli.net/2021/01/24/djYyk6KvUtAOqI9.png"
        },
        {
          id: 1,
          name: "选修课",
          type: "elctive",
          url:"https://7363-scnuca-4gp9nq6bd1a6b150-1304921864.tcb.qcloud.la/elective.jpg?sign=c3359e914271938c67b16d7b9fb5e9de&t=1613908610",
          icon:"https://i.loli.net/2021/01/24/bcdsSQoCPNean2U.png"
        },
        
      ]
    },
    
  },

  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  magnify: function(e){
    var that= this;
    let cuu=e.currentTarget.dataset.i;//获取index值
    that.setData({
      current_item:cuu
    })
   
  },
  change:function(e){
    wx.vibrateShort({
      
    });
    var id=e.currentTarget.dataset.i;
    if(id==0){ wx.navigateTo({
      url:'/pages/courses/courses-compulsory/courses'
    })}
    if(id==1){
      wx.navigateTo({
        url:'/pages/courses/courses-elective/courses'
      })
    }
  },
  torank:function(){
    wx.navigateTo({
      url: '/pages/ranking/ranking',
    })

  },

  magnify1: function(e){
    var that= this;
    that.setData({
      magnify:'true'
    })
   
  },
  magnify2: function(e){
    var that= this;
    that.setData({
      magnify2:'true'
    })
   
  },
   

  return:function(){
    var that= this;
      that.setData({
        current_item:100
      })
    
  },
  return1:function(){
    var that= this;
    that.setData({
      magnify:'false'
    })
    
  },
  return2:function(){
    var that= this;
    that.setData({
      magnify2:'false'
    })
    
  },
  toexercise:function(){
    wx.showToast({
      title: '该功能还在研发，敬请期待',
      icon:'none',
      duration:2000
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   

 
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
      
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 0
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