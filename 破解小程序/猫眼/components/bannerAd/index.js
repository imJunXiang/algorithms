var _extends = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    }
    return t;
}, app = getApp(), u = function(t) {
    return "https://ad.maoyan.com/api" + t;
}, stats = require("../../scripts/stats.js"), _require = require("../../scripts/banner"), maoyanBanner = _require.maoyanBanner, statsChannel = "rediantong", tap_bid = "b_xmm5sgjk", display_bid = "b_cy70t5em", val_cid = "c_hw1gt8n5";

Component({
    externalClasses: [ "custom-class" ],
    properties: {
        url: {
            type: String,
            value: "defaultValue"
        },
        adId: {
            type: String,
            value: "1081"
        },
        domain: {
            type: String,
            value: "defaultDomain"
        }
    },
    data: {
        indicatorDots: !0,
        val_cid: "c_hw1gt8n5",
        reportedAd: [],
        show: !1
    },
    methods: {
        getAd: function() {
            var t = this, a = {
                clientType: app.clientType || "",
                channelId: app.channelId || ""
            }, e = app.getPropSafely("$location.city.id", app, 0), n = this.properties.adId, r = app.getPropSafely("$user.userId", app, 0);
            maoyanBanner(e, n, r, a).then(function(a) {
                a && a.length > 0 ? (t.setData({
                    banners: a,
                    show: !0
                }), t.triggerEvent("showBanner", {
                    showBanner: !0
                }), t.onShow(0), t.data.reportedAd.push(t.data.banners[0])) : (t.triggerEvent("showBanner", {
                    showBanner: !1
                }), t.setData({
                    show: !1
                }));
            }).catch(function(a) {
                t.triggerEvent("showBanner", {
                    showBanner: !1
                }), t.setData({
                    show: !1
                });
            });
        },
        onBannerChange: function(t) {
            this.data.banners.length > this.data.reportedAd.length && (this.data.reportedAd.push(this.data.banners[t.detail.current]), 
            this.onShow(t.detail.current));
        },
        goToAdDetail: function(t) {
            var a = t.currentTarget.dataset.idx, e = this.data.banners[a];
            this.data.stats(tap_bid, {
                positionId: this.properties.adId,
                ad_id: e.adId,
                materialId: e.materialId
            }), this.data.reportedAd = [], app.goto(e.link);
        },
        send: function(t, a) {
            stats(t, _extends({}, a));
        },
        onShow: function(t) {
            this.data.stats(display_bid, {
                positionId: this.properties.adId,
                ad_id: this.data.banners[t].adId,
                materialId: this.data.banners[t].materialId
            });
        },
        emptyList: function() {
            this.data.reportedAd = [];
        }
    },
    pageLifetimes: {
        hide: function() {
            this.data.reportedAd = [];
        }
    },
    ready: function() {
        stats({
            channel: statsChannel,
            appnm: app.lxAppname || app.appName,
            noPending: !0
        })(this.data), this.getAd();
    }
});