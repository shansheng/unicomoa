const { PG, REQ, loginUser} = require("../../common/base.js")
const { $wuxCalendarPlain } = require( '../../../wux/index')
const { formatDate} = require("../../../utils/util")
PG({
  data: {
    selectedDate: formatDate(new Date()),
    list:[],
    userId:null
  },
  onLoad(){
    var u = loginUser();
    if(u){
      this.setData({
        userId:u.userId
      })
    }
  },
  addPlan(){
    wx.navigateTo({
      url: '../addsale/index'
    })
  },
  godetail(event){
    var id = event.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '../detail/index?id='+id,
    })
  },
  onReady: function(){
    $wuxCalendarPlain().open({
      value:[new Date()],
      direction: 'vertical',
      onChange: (values, displayValues) => {
        if(displayValues && displayValues.length>0){
          this.setData({"selectedDate":displayValues})
          this.refresh()
        }
      },
    })
    this.refresh();
  },
  onPullDownRefresh:function(){
      wx.showNavigationBarLoading();
      this.refresh(()=>{
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      })
  },
  refresh(cb){
    this.list(cb);
  },
  list(cb){
    REQ({
      url: "/workplan/list?userId=" + this.data.userId + "&selectedDate=" + this.data.selectedDate,
    }).then(res=>{
      if (res.data.result == "success") {
        var data = res.data.data;
        data.forEach(d => {
          var canyureninfo = d.canyuren;
          canyureninfo = JSON.parse(canyureninfo);
          var names = canyureninfo.map(e => {
            return e.name;
          });
          d.canyuren = names;
          d.startTime = d.startTime.split(" ")[1];
          d.endTime = d.endTime.split(" ")[1];
        })
        this.setData({
          list: data
        })
        cb ? cb() : null;
      }
    })
  },
  search(){
    wx.navigateTo({
      url: '../search/index',
    })
  }
})