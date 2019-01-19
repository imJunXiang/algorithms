var Date2 = require("../../scripts/date2.js"), icons = require("../../scripts/icons.js"), app = getApp(), apiConfig = require("../../scripts/api-config"), api = apiConfig.getApiUrl(), defaultHeadImg = "http://p1.meituan.net/movie/657a4f30793555753aeb1fdda660d3c62409.png";

module.exports = {
    formatComments: function(e) {
        var r = function(e) {
            return e.avatarUrl = (e.avatarUrl && e.avatarUrl.split("@")[0] || e.avatarurl && e.avatarurl.split("@")[0] || defaultHeadImg) + "@60w_60h", 
            e.tm = new Date2(e.time).toString("T"), e.tagList && (e.tagDy = !!e.tagList.filter(function(e) {
                return "点映" === e.name;
            }).length, e.tagBuy = !!e.tagList.filter(function(e) {
                return "购票" === e.name;
            }).length), e.pro && app.get("pro-comment-" + e.id + "-approved") && (e.likedByCurrentUser = !0), 
            e.scoreArray = app.star(e.score), e.userLevel > 0 && (e.levelpathBlack = icons.levelNums["lv" + e.userLevel + "-blackfont"], 
            e.levelpathWhite = icons.levelNums["lv" + e.userLevel + "-whitefont"]), e;
        };
        return Array.isArray(e) ? e.map(function(e) {
            return r(e);
        }) : r(e);
    },
    approveRequest: function(e) {
        var r = e.currentTarget.dataset, t = r.id, a = r.likedbycurrentuser;
        app.request().post(api + "/mmdb/approve/comment/" + t + ".json").send({
            userid: app.$user.userId,
            channelId: app.channelId,
            type: a ? 1 : 0,
            token: app.$user.token,
            clientType: app.clientType,
            uuid: app.$uuidV2
        }).end();
    },
    setShareShow: function(e, r, t, a) {
        if (e) if (t) if (a.tipShowCount = 0, Array.isArray(e)) {
            var n = !0, i = !1, o = void 0;
            try {
                for (var s, u = e[Symbol.iterator](); !(n = (s = u.next()).done); n = !0) {
                    var p = s.value;
                    p.isComShow = !1;
                }
            } catch (e) {
                i = !0, o = e;
            } finally {
                try {
                    !n && u.return && u.return();
                } finally {
                    if (i) throw o;
                }
            }
        } else e.isComShow = !1; else {
            var l = function(e) {
                return parseInt(e.id, 10) === parseInt(r, 10) && (1 != e.isComShow ? (e.isComShow = !0, 
                a.tipShowCount++) : (e.isComShow = !1, a.tipShowCount--)), e;
            };
            if (Array.isArray(e)) {
                var c = !0, f = !1, v = void 0;
                try {
                    for (var d, m = e[Symbol.iterator](); !(c = (d = m.next()).done); c = !0) {
                        var h = d.value;
                        h = l(h);
                    }
                } catch (e) {
                    f = !0, v = e;
                } finally {
                    try {
                        !c && m.return && m.return();
                    } finally {
                        if (f) throw v;
                    }
                }
            } else e = l(e);
        }
        return e;
    },
    screen: function(e, r) {
        if (r && r.length > 0) {
            var t = parseInt(e, 10);
            r = r.filter(function(e) {
                return parseInt(e.userId, 10) !== t;
            });
        }
        return r || [];
    }
};