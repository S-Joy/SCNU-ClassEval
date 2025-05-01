const DB = wx.cloud.database().collection("teachersList")


Page({

  /**
   * 页面的初始数据
   */
  data: {
    class: "艺术色彩鉴赏",
    current_item: null,
    
  },
  fuzzyQuery: function (list, keyWord) {
    var reg = new RegExp(keyWord);
    var arr = [];
    for (var i = 0; i < list.length; i++) {
      if (reg.test(list[i].name)) {
        arr.push(list[i]);
      }
    }
    return arr;
  },
  search: function (e) {
    var text = e.detail.value
    // console.log(e)
    if (text == "") {
      this.setData({
        teacherlist: this.data.alllist,

      })
    } else {
      var list = this.fuzzyQuery(this.data.alllist, text)
    }
    this.setData({
      teacherlist: list,
    })

  },
  tojudge: function (e) {
    wx.vibrateShort({

    });

    setTimeout(function () {
      wx.navigateTo({
        url: '/pages/judge/judge'
      })
    }, 10)
    // console.log(e);
    const app = getApp();
    
    app.globaldata.teacherinfo = {
      name: e.currentTarget.dataset.name,
      sex: e.currentTarget.dataset.sex,
      class: this.data.class
    };

  },
  magnify: function (e) {
    let cuu = e.currentTarget.dataset.id; //获取index值
    // console.log(cuu);
    this.setData({
      current_item: cuu
    })
  },
  return: function () {
    var that = this;
    that.setData({
      current_item: 100
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取课程数据
    var classname = this.data.class;
    const DB = wx.cloud.database()
    DB.collection('teachersList').where({
        class: classname
      })
      .get({
          success: (res) => {
            this.setData({
              alllist: res.data,
              teacherlist: res.data
            })
            
            for (var i=0;i<this.data.alllist.length;i++){
              this.data.alllist[i]["id"]=i
            }
            // console.log(this.data.alllist)
          }
        }
      );

     
     
      
     


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