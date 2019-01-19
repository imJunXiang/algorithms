Page({
    data: {
        viedoList: []
    },
    onLoad: function(o) {
        console.log(o.viedo), this.setData({
            viedoList: o.viedo
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});