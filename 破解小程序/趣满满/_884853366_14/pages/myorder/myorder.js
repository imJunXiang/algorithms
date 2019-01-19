var t = require("../../utils/tools.js"), a = getApp();

Page({
    data: {
        userInfo: {},
        uid: "",
        orderList: [],
        hasMoreNum: !0,
        page: 0,
        loadingText: "加载更多..."
    },
    picerror: function(t) {
        console.log(t, "图片错误");
    },
    onLoad: function(t) {
        var o = this;
        a.setPageColor(this), a.setPageUid(this).then(function() {
            o.loadData(0);
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.data.hasMoreNum && (this.setData({
            page: this.data.page + 1
        }), this.loadData(this.data.page));
    },
    loadData: function(a) {
        var o = this;
        (0, t._post)("v1/movieticket/usertickets", {
            page: a,
            uid: o.data.uid,
            source: "movie"
        }).then(function(t) {
            0 != t.usertickets.length ? (o.data.orderList.push(t.usertickets), o.setData({
                orderList: o.data.orderList
            })) : o.setData({
                loadingText: "暂无更多订单",
                hasMoreNum: !1
            });
        });
    }
});