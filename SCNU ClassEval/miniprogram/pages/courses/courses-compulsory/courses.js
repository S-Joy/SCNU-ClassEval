// pages/courses/courses-compulsory/courses.js

const DB = wx.cloud.database().collection("compulsorycourseList")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allcourselist: [],
    courselist: []

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      //获取课程数据
      const DB = wx.cloud.database()
      DB.collection('compulsorycourseList').orderBy("index", "asc")
      .get({
          success: (res) => {
            this.setData({
              allcourselist: res.data,
              courselist: res.data
            })
            // console.log(this.data.allcourselist)

          }
        }

      )
    
  },
  toteacher: function (event) {
    wx.vibrateShort({});
    // console.log(event);
    var courseId = event.currentTarget.dataset.postId;
    if (courseId == 0) {
      wx.navigateTo({
        url: '/pages/teachers/math/math'
      })
    }
    if (courseId == 1) {
      wx.navigateTo({
        url: '/pages/teachers/linear/linear'
      })
    };
    if (courseId == 2) {
      wx.navigateTo({
        url: '/pages/teachers/cs/cs'
      })
    };
    if (courseId == 3) {
      wx.navigateTo({
        url: '/pages/teachers/c/c'
      })
    };
    if (courseId == 4) {
      wx.navigateTo({
        url: '/pages/teachers/java/java'
      })
    };
    if (courseId == 5) {
      wx.navigateTo({
        url: '/pages/teachers/st/st'
      })
    };
    if (courseId == 6) {
      wx.navigateTo({
        url: '/pages/teachers/database/database'
      })
    };
    if (courseId == 7) {
      wx.navigateTo({
        url: '/pages/teachers/method/method'
      })
    };
    if (courseId == 8) {
      wx.navigateTo({
        url: '/pages/teachers/require/require'
      })
    };
    if (courseId == 9) {
      wx.navigateTo({
        url: '/pages/teachers/design/design'
      })
    };
    if (courseId == 10) {
      wx.navigateTo({
        url: '/pages/teachers/test/test'
      })
    };
    if (courseId == 11) {
      wx.navigateTo({
        url: '/pages/teachers/manage/manage'
      })
    };
    if (courseId == 12) {
      wx.navigateTo({
        url: '/pages/teachers/alogrithm/alogrithm'
      })
    };
    if (courseId == 13) {
      wx.navigateTo({
        url: '/pages/teachers/communicate/communicate'
      })
    };
    if (courseId == 14) {
      wx.navigateTo({
        url: '/pages/teachers/structures/structures'
      })
    };
    if (courseId == 15) {
      wx.navigateTo({
        url: '/pages/teachers/sj/sj'
      })
    };
    if (courseId == 16) {
      wx.navigateTo({
        url: '/pages/teachers/sm/sm'
      })
    };
    if (courseId == 17) {
      wx.navigateTo({
        url: '/pages/teachers/sh/sh'
      })
    };
    if (courseId == 18) {

    };
  },
  fuzzyQuery: function (list, keyWord) {
    var reg = new RegExp(keyWord);
    var arr = [];
    for (var i = 0; i < list.length; i++) {
      if (reg.test(list[i].coursename)) {
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
        courselist: this.data.allcourselist,
      })
    } else {
      var list = this.fuzzyQuery(this.data.allcourselist, text)
    }
    this.setData({
      courselist: list,
    })

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

  },
  onBottom: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          "wh": res.windowHeight
        })
        // console.log("wh", that.data.wh);
      }
    })
  },

})