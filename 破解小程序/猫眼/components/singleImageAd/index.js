var app = getApp(), u = function(a) {
    return "https://ad.maoyan.com/api" + a;
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
            value: "1082"
        },
        domain: {
            type: String,
            value: "defaultDomain"
        }
    },
    data: {
        val_cid: "c_hw1gt8n5"
    },
    methods: {
        getAd: function() {
            var a = this, t = {
                clientType: app.clientType || "",
                channelId: app.channelId || ""
            }, n = app.getPropSafely("$location.city.id", app, 0), e = this.properties.adId, i = app.getPropSafely("$user.userId", app, 0);
            maoyanBanner(n, e, i, t).then(function(t) {
                t && t.length > 0 && (a.setData({
                    ad: t[0],
                    show: !0
                }), a.onShow(display_bid), a.triggerEvent("showBanner", {
                    showBanner: !0
                }));
            }).catch(function(t) {
                a.triggerEvent("showBanner", {
                    showBanner: !1
                }), a.setData({
                    show: !1
                }), console.log(t);
            });
        },
        goToAdDetail: function() {
            this.onShow(tap_bid);
            var a = this.data.ad;
            app.goto(a.link);
        },
        onShow: function(a) {
            this.data.stats(a, {
                positionId: this.properties.adId,
                ad_id: this.data.ad.adId,
                materialId: this.data.ad.materialId
            });
        }
    },
    attached: function() {
        this.getAd(), stats({
            channel: statsChannel,
            appnm: app.lxAppname || app.appName,
            noPending: !0
        })(this.data);
    }
});