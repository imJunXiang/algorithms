var Tpl = require("../../../scripts/tpl"), advertHandler = require("../../../scripts/advert"), MYT = require("../../../constant/myt"), app = getApp();

module.exports = Tpl.extends({
    key: "specialTopic",
    data: {
        templateId2: [],
        templateId3: [],
        templateId4: [],
        leftPosition: {},
        rightPosition: {},
        singlePosition: {},
        multiPosition: [],
        showActivity: !1
    },
    bindEvent: function() {
        this.page.getOperationPositions = this.getOperationPositions.bind(this);
    },
    getOperationPositions: function() {
        var t = this, i = app.getPropSafely("$location.city.id", app, 0), e = app.getPropSafely("$user.token", app, null), n = {
            userIdentity: app.$openId,
            positionId: 3,
            channelId: app.channelId,
            scene: app.scene,
            cityId: i
        }, a = {
            positionIds: 1077
        };
        e && (n.token = e), n.pageUrl = "/" + this.page.route, app.request().get("https://api.maoyan.com/operation/exhibitions.json").header({
            "content-type": "application/json"
        }).query(n).end().then(function(t) {
            return t.body;
        }).then(function(i) {
            var e = {}, n = {}, o = {}, s = [], p = [], l = [], r = !1, d = [];
            if (i.success) {
                var c = i.data, u = c.exhibit, h = c.contentList;
                if (u) if (h = h.map(function(i, e) {
                    return i.val_bid = "b_j12vbx0a", i.val_lab = JSON.stringify({
                        activity_id: i.activityId.toString(),
                        custom: {
                            index: e + 1
                        }
                    }), t.page.stats("b_vk2enzvd", {
                        activity_id: i.activityId.toString(),
                        custom: {
                            index: e + 1
                        }
                    }), i;
                }), s = h.filter(function(t) {
                    return 2 === t.templateId;
                }), p = h.filter(function(t) {
                    return 3 === t.templateId;
                }), l = h.filter(function(t) {
                    return 4 === t.templateId;
                }), 2 === p.length && (e = p[0], n = p[1], r = !0), 1 === s.length && (o = s[0], 
                r = !0), [ 3, 4, 5 ].indexOf(l.length) > -1) d = [ l ], r = !0; else if ([ 8, 10 ].indexOf(l.length) > -1) {
                    var f = l.length / 2;
                    d = [ l.slice(0, f), l.slice(f) ], r = !0, a.phoneModel = "iPhone X";
                }
            }
            advertHandler.fetch(a, function(i) {
                i.length && (MYT.initStats(app), MYT.props.stats(MYT.mpt_bid, {
                    positionId: 1079,
                    ad_id: i[0].adId,
                    materialId: i[0].materialId
                })), d.forEach(function(t) {
                    t.forEach(function(t) {
                        var i = t.jumpUrl;
                        if (i.includes("?")) {
                            var e = i.split("?")[1].split("&"), n = {};
                            e.forEach(function(t) {
                                var i = t.split("=")[0], e = t.split("=")[1];
                                n[i] = e;
                            }), n.needLogin && (t.needLogin = !0);
                        }
                    });
                }), t.setData({
                    leftPosition: e,
                    rightPosition: n,
                    singlePosition: o,
                    multiPosition: d,
                    templateId2: s,
                    templateId3: p,
                    templateId4: l,
                    showActivity: r,
                    adsBack: i
                });
            }), (s.length || p.length || l.length) && t.page.stats("b_vk2enzvd");
        }).catch(function() {
            t.setData({
                leftPosition: {},
                rightPosition: {},
                singlePosition: {},
                showActivity: !1,
                templateId2: [],
                templateId3: [],
                templateId4: []
            });
        });
    }
});