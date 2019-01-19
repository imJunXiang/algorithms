var Tpl = require("../scripts/tpl"), locationModel = require("../models/location");

module.exports = Tpl.extends({
    key: "LocateBanner",
    data: {
        content: "",
        isShow: !0
    },
    bindEvent: function() {
        var t = this;
        locationModel.on("error", function() {
            t.setData({
                content: "无法获取定位，请您开启定位或者点击右侧刷新"
            });
        }), locationModel.on("locationChange", function(e) {
            t.setData({
                content: e.address
            });
        }), this.page.onTapFresh = this.onTapFresh.bind(this);
        var e = this.page.onPageScroll;
        this.page.onPageScroll = function() {
            for (var o = arguments.length, n = Array(o), a = 0; a < o; a++) n[a] = arguments[a];
            t.onPageScroll.apply(t, n), e && e.apply(t.page, n);
        };
    },
    onTapFresh: function() {
        var t = this;
        getApp().checkLocationAuth().then(function() {
            t.render(!0);
        });
    },
    onPageScroll: function(t) {
        var e = this;
        clearTimeout(this.showTimer), this.showTimer = setTimeout(function() {
            e.setData({
                isShow: !0
            });
        }, 200), this.data.isShow && this.setData({
            isShow: !1
        });
    },
    render: function(t) {
        var e = this;
        this.setData({
            content: "正在获取定位..."
        }), locationModel.fetch(t).then(function(t) {
            e.setData({
                content: t.address
            });
        });
    }
});