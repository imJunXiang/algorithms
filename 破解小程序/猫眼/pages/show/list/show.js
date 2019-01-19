function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var _user = require("../../../scripts/show/user"), _user2 = _interopRequireDefault(_user), app = getApp(), PREFIX = "https://wx.maoyan.com/maoyansh/myshow/ajax";

app.MoviePage({
    data: {
        show: !1
    },
    onLoad: function(e) {
        var a = this;
        app.request().config("loading", 1).get(PREFIX + "/performance/" + e.id + ";detail=2;poi=false").query({
            token: (0, _user2.default)(app.$user) || {},
            sellChannel: 7
        }).end().then(function(e) {
            return e.body.data;
        }).then(function(t) {
            t.detail = JSON.parse(t.detail), a.setData({
                performance: t,
                showBuyBtn: "order" != e.f,
                id: e.id,
                show: !0
            }), app.title(t.name);
        });
    },
    onShow: function() {
        getApp().selectedCoupon && (getApp().selectedCoupon = null);
    },
    onTapPhoto: function(e) {
        if (this.data.performance && this.data.performance.seatUrl.length > 0) {
            var a = [ this.data.performance.seatUrl ];
            wx.previewImage({
                current: this.data.performance.seatUrl,
                urls: a
            });
        }
    },
    onTapAddress: function(e) {
        this.data.performance && this.data.performance.lat > 0 && this.data.performance.lng > 0 && wx.openLocation({
            latitude: this.data.performance.lat,
            longitude: this.data.performance.lng,
            name: this.data.performance.shopName,
            address: this.data.performance.address
        });
    },
    onShareAppMessage: function() {
        var e = "/pages/show/list/show?id=" + this.data.id;
        return {
            title: this.data.performance.name,
            desc: "推荐你一个超精彩演出，一起去看吧~",
            path: e
        };
    }
});