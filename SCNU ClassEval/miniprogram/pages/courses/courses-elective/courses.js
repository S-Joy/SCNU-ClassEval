// pages/courses/courses-compulsory/courses.js
const DB = wx.cloud.database().collection("electivecourseList")

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
      DB.collection('electivecourseList').orderBy("index", "asc")
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
    var courseId = event.currentTarget.dataset.postId;
    if (courseId == 0) {
      wx.navigateTo({
        url: '/pages/teachers/art/art'
      })
    }
    if (courseId == 1) {
      wx.navigateTo({
        url: '/pages/teachers/health/health'
      })
    };
    if (courseId == 2) {
      wx.navigateTo({
        url: '/pages/teachers/jewelry/jewelry'
      })
    };
    if (courseId == 3) {
      wx.navigateTo({
        url: '/pages/teachers/handwriting-analysis/handwriting-analysis'
      })
    };
    if (courseId == 4) {
      wx.navigateTo({
        url: '/pages/teachers/entrepreneurship-education/entrepreneurship-education'
      })
    };
    if (courseId == 5) {
      wx.navigateTo({
        url: '/pages/teachers/Chinese-dress/Chinese-dress'
      })
    };
    if (courseId == 6) {
      wx.navigateTo({
        url: '/pages/teachers/stick-figure/stick-figure'
      })
    };
    if (courseId == 7) {
      wx.navigateTo({
        url: '/pages/teachers/social-etiquette/social-etiquette'
      })
    };
    if (courseId == 8) {
      wx.navigateTo({
        url: '/pages/teachers/modern-history/modern-history'
      })
    };
    if (courseId == 9) {
      wx.navigateTo({
        url: '/pages/teachers/calligraphy/calligraphy'
      })
    };
    if (courseId == 10) {
      wx.navigateTo({
        url: '/pages/teachers/private-economy/private-economy'
      })
    };
    if (courseId == 11) {
      wx.navigateTo({
        url: '/pages/teachers/music-appreciation/music-appreciation'
      })
    };
    if (courseId == 12) {
      wx.navigateTo({
        url: '/pages/teachers/entrepreneurial-network/entrepreneurial-network'
      })
    };
    if (courseId == 13) {
      wx.navigateTo({
        url: '/pages/teachers/buddhist-art/buddhist-art'
      })
    };
    // if (courseId == 14) {
    //   wx.navigateTo({
    //     url: '/pages/teachers/'
    //   })
    // };
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
  onBottom: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          "wh": res.windowHeight
        })
      }
    })
  },
})