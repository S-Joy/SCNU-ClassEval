Component({
  data: {
    selected: 0,
    "list": [
      {
        "pagePath": "/pages/index/index",
        "iconPath": "/img/home.png",
        "selectedIconPath": "/img/homed.png"
        
      },
      {
        "pagePath": "/pages/my/my",
        "iconPath": "/img/user.png",
        "selectedIconPath": "/img/usered.png"
        
      }]
    

  },
  attached() {
  },
  methods: {
    switchTab(e) {
      // wx.vibrateShort({});
      console.log(e)
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }


})