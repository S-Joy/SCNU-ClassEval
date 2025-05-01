var wxCharts = require('../../utils/wxcharts.js');
var util = require('../../utils/util.js');
var app = getApp();
var pieChart = null;
var columnChart = null;
var content = "";
let pinglun = [];
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: '',
    inputValue: '',
    currentnum: 0,
    id: '',
    switchItem: 0,
    pointdata: [],
    teacher: {
      name: '蔡妍',
      class: '软件工程导论'
    },
    commentsdata: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const app = getApp();
    app.getUserInfo(function (userinfo) {
      that.setData({
        userinfo: userinfo
      })
    })

    if (app.globaldata.teacherinfo) {
      this.setData({
        teacher: app.globaldata.teacherinfo
      })
    };
    var teachername = this.data.teacher.name;
    var classname = this.data.teacher.class;
    db.collection("pointsList").where({
      class: classname,
      name: teachername
    }).get({
      success: (res) => {
        var x = res.data[0].judgeNum
        this.setData({
          currentnum: x,
          pointdata: res.data[0].pointlist
        })
      },
      fail(res) {
        console.log("获取失败")
      }
    });
    //获取评论
    db.collection('commentlist').where({
      class: classname,
      name: teachername
    }).get({
      success: (res) => {
        this.setData({
          id: res.data[0]._id,
          commentsdata: res.data[0].comments
        })

      },
      fail(res) {
        console.log("获取失败")
      }
    });

    //重置点赞
    db.collection("commentlist").where({
      class: classname,
      name: teachername
    }).get({
      success: (res) => {
        this.setData({
          id: res.data[0]._id,
          showcommentlist:res.data[0].showcomments,
        });
        var showlike = this.data.showcommentlist
        for (var i=0;i<showlike.length;i++){
          showlike[i].islike=0
        }
        console.log(showlike)
        db.collection("commentlist").doc(that.data.id).update({
          data: {
            showcomments:showlike
          },
          success:(res)=>{
            console.log(res)
          }

        })

      }
      });
    this.piechart();
  },
  //获取输入内容
  expInput: function (e) {
    content = e.detail.value
    this.setData({
      comment: content
    })

  },

  fabiao: function (e) {
    if (this.data.coment = '') {
      return
    }
    if (this.data.comment.length < 5) {
      wx.showToast({
        title: "评论太短了",
        icon: "none"
      })
      return
    }
    //先获取数据库中的评论
    const db = wx.cloud.database()
    var teachername = this.data.teacher.name;
    var classname = this.data.teacher.class;
    db.collection("commentlist").where({
      class: classname,
      name: teachername
    }).get({
      success: (res) => {
        this.setData({
          id: res.data[0]._id,
          commentlist: res.data[0].comments
        });
        //恢复默认
        // var array=[]

        var array = this.data.commentlist;
        let pinglunItem = {}
        pinglunItem.username = this.data.userinfo.nickName
        pinglunItem.content = this.data.comment
        var date = util.formatTime(new Date())
        pinglunItem.date = date
        pinglunItem.islike = 0
        pinglunItem.likenum = 0
        pinglunItem.allzaninfo = []
        array.unshift(pinglunItem)
        db.collection("commentlist").doc(this.data.id)
          .update({
            data: {
              comments: array,
              showcomments:array
            },
            success: (res) => {
              wx.showToast({
                title: '评价成功',
                icon: 'success',
                duration: 1500,
                mask: false
              })
              this.setData({
                commentsdata: array,
                inputValue: '',
                comment: ''
              })
              console.log("评论成功", res)
            },
            fail(res) {
              console.log("评论失败", res)
            }
          })
      }
    })

  },

  selectItem(e) {
    const item = e.currentTarget.dataset.item
    this.setData({
      switchItem: item
    })
  },
  piechart: function () {
    pieChart = new wxCharts({
      animation: true,
      canvasId: 'ringCanvas',
      type: 'ring',
      series: [{
          name: '纯干货',
          // data: this.data.pointdata[0]['纯干货'],
          data: 5
        },
        {
          name: '给分高',
          // data: this.data.pointdata[0]['给分高'],
          data: 5
        },
        {
          name: '签到少',
          // data: this.data.pointdata[0]['签到少'],
          data: 5
        },
        {
          name: '实践性',
          // data: this.data.pointdata[0]['实践性'],
          data: 5
        }
      ],
      width: 300,
      height: 300,
      dataLabel: true,
    });


  },
  submit: function () {
    wx.vibrateShort({})
    //获取数据库中的人数
    const db = wx.cloud.database();
    var teachername = this.data.teacher.name;
    var classname = this.data.teacher.class;
    db.collection("pointsList").where({
      class: classname,
      name: teachername
    }).get({
      success: (res) => {
        console.log(res.data[0].class)
        this.setData({
          id: res.data[0]._id,
        })
        //更新数据
        var nnum = res.data[0].judgeNum + 1
        db.collection('pointsList').doc(this.data.id).update({
          data: {
            judgeNum: nnum,
          },
          success: (res) => {
            this.setData({
              currentnum: nnum
            })
            console.log(res)
          },
          fail(res) {
            console.log('更新失败', res)
          }
        })
      },
    })
    //获取平均分数并更新
    var teachername = this.data.teacher.name;
    var classname = this.data.teacher.class;
    db.collection("pointsList").where({
      class: classname,
      name: teachername
    }).get({
      success: (res) => {
        this.setData({
          id: res.data[0]._id,
          currentaveragescore: res.data[0].averagescore
        });
        var g1 = parseFloat(this.progress1.getScore());
        var g2 = parseFloat(this.progress2.getScore());
        var g3 = parseFloat(this.progress3.getScore());
        var g4 = parseFloat(this.progress4.getScore());
        var nnum = res.data[0].judgeNum + 1;
        var thisaveragescore = (g1 + g2 + g3 + g4) / 4;
        var allaverage = this.data.currentaveragescore * res.data[0].judgeNum
        var updateaveragescore = parseFloat(((thisaveragescore + allaverage) / (nnum)).toFixed(1))
        db.collection('pointsList').doc(this.data.id).update({
          data: {
            averagescore: updateaveragescore
          },
          success: (res) => {
            console.log('平均分数更新成功')
          }
        })

      }
    })

    //获取当前页面的分数
    var teachername = this.data.teacher.name;
    var classname = this.data.teacher.class;
    db.collection("pointsList").where({
      class: classname,
      name: teachername
    }).get({
      success: (res) => {
        this.setData({
          id: res.data[0]._id,
        });
        //更新数据
        var g1 = parseFloat(this.progress1.getScore());
        var g2 = parseFloat(this.progress2.getScore());
        var g3 = parseFloat(this.progress3.getScore());
        var g4 = parseFloat(this.progress4.getScore());
        var pointlist = [g1, g2, g3, g4]

        this.data.pointdata[0]["实践性"] += pointlist[3]
        this.data.pointdata[0]["签到少"] += pointlist[2]
        this.data.pointdata[0]["纯干货"] += pointlist[0]
        this.data.pointdata[0]["给分高"] += pointlist[1]
        var updatelist = [{
          "实践性": this.data.pointdata[0]["实践性"],
          "签到少": this.data.pointdata[0]["签到少"],
          "纯干货": this.data.pointdata[0]["纯干货"],
          "给分高": this.data.pointdata[0]["给分高"]
        }];




        //恢复默认
        // var updatelist = [{
        //   "实践性": 0,
        //   "签到少": 0,
        //   "纯干货": 0,
        //   "给分高": 0
        // }];
        console.log(this.data.id);
        db.collection('pointsList').doc(this.data.id).update({
          data: {
            pointlist: updatelist
          },
          success: (res) => {
            this.setData({
              pointdata: updatelist
            })
            console.log("更新成功", res)
            console.log(this.data.pointdata)
          },
          fail(res) {
            console.log('更新失败', res)
          }
        })
      }
    });

    //画图
    var context = wx.createCanvasContext('Canvas', this);
    var windowWidth = 750;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    pieChart = new wxCharts({
      animation: true,
      canvasId: 'ringCanvas',
      type: 'ring',
      series: [{
          name: '纯干货',
          data: this.data.pointdata[0]['纯干货'],
        },
        {
          name: '给分高',
          data: this.data.pointdata[0]['给分高'],
        },
        {
          name: '签到少',
          data: this.data.pointdata[0]['签到少'],
        },
        {
          name: '实践性',
          data: this.data.pointdata[0]['实践性'],
        }
      ],

      width: 300,
      height: 300,
      dataLabel: true,
    });

  },
  onlikeTap: function (e) {
    wx.vibrateShort({
      success: (res) => {},
    })
    var that=this
    if (e.currentTarget.dataset.username == that.data.userinfo.nickName) {
      wx.showToast({
        title: '不能给自己点赞',
        icon: "none"
      })
      return
    }
    var teachername = this.data.teacher.name;
    var classname = this.data.teacher.class;
    const db = wx.cloud.database()
    db.collection("commentlist").where({
      class: classname,
      name: teachername
    }).get({
      success: (res) => {
        this.setData({
          id: res.data[0]._id,
          commentlist: res.data[0].comments,
          showcommentlist:res.data[0].showcomments,
        });
        var index = e.currentTarget.dataset.dex;
        var islike = e.currentTarget.dataset.islike;
        var updatecom = this.data.commentlist
        var showlike = this.data.showcommentlist
        //改变点赞状态
        if (showlike[index].islike == 0) {
          showlike[index].islike = 1
          updatecom[index].likenum += 1
          showlike[index].likenum += 1
        } else {
          showlike[index].islike = 0
          updatecom[index].likenum -= 1
          showlike[index].likenum -= 1
        }
        //记录点赞信息
        var eachlikeinfo = {}
        eachlikeinfo.username = this.data.userinfo.nickName
        eachlikeinfo.cancel = islike
        var date = util.formatTime(new Date())
        eachlikeinfo.date = date
        updatecom[index].allzaninfo.unshift(eachlikeinfo)
        db.collection("commentlist").doc(that.data.id).update({
          data: {
            comments: updatecom,
            showcomments:showlike
          },
          success: (res) => {
            this.setData({
              commentsdata: showlike
            })
            
            console.log('点赞成功并更新数据了')
          }
        })


      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.progress1 = this.selectComponent("#progress1");
    this.progress2 = this.selectComponent("#progress2");
    this.progress3 = this.selectComponent("#progress3");
    this.progress4 = this.selectComponent("#progress4");
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