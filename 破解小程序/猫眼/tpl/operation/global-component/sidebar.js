function _asyncToGenerator(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, n) {
            function a(i, r) {
                try {
                    var o = e[i](r), s = o.value;
                } catch (t) {
                    return void n(t);
                }
                if (!o.done) return Promise.resolve(s).then(function(t) {
                    a("next", t);
                }, function(t) {
                    a("throw", t);
                });
                t(s);
            }
            return a("next");
        });
    };
}

var _slicedToArray = function() {
    function t(t, e) {
        var n = [], a = !0, i = !1, r = void 0;
        try {
            for (var o, s = t[Symbol.iterator](); !(a = (o = s.next()).done) && (n.push(o.value), 
            !e || n.length !== e); a = !0) ;
        } catch (t) {
            i = !0, r = t;
        } finally {
            try {
                !a && s.return && s.return();
            } finally {
                if (i) throw r;
            }
        }
        return n;
    }
    return function(e, n) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
}, Tpl = require("../../../scripts/tpl"), ActivityModal = require("./modal"), util = require("../../../scripts/utils"), TabBarPages = [ "/pages/movie/index", "/pages/cinema/index", "/wesai/indexpage/index", "/pages/show/index/index", "/pages/user/index" ];

module.exports = Tpl.extends({
    key: "operationSidebar",
    data: {
        showSideBar: !1,
        appId: "",
        navUseAPI: !1,
        path: "",
        jumpUrl: "",
        backgroundImageUrl: "",
        associationExhibitionId: "",
        activityId: "",
        version: "release",
        data: {}
    },
    bindEvent: function() {
        this.page.onTapSideBar = this.onTapSideBar.bind(this), this.page.getSidebarData = this.getSidebarData.bind(this);
    },
    getSidebarData: function() {
        var t = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function e() {
            var n, a, i, r, o;
            return regeneratorRuntime.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return n = getApp(), a = "/" + t.page.route, i = n.getPropSafely("$location.city.id", n, 0), 
                    r = n.getPropSafely("$user.token", n, null), e.t0 = n.$openId, e.t1 = n.channelId, 
                    e.t2 = n.scene, e.t3 = i, e.t4 = a, e.next = 11, n.uuidV2();

                  case 11:
                    return e.t5 = e.sent, e.next = 14, n.getFingerprint();

                  case 14:
                    return e.t6 = e.sent, o = {
                        openId: e.t0,
                        positionId: 4,
                        channelId: e.t1,
                        scene: e.t2,
                        cityId: e.t3,
                        pageUrl: e.t4,
                        versionCompatible: !0,
                        uuid: e.t5,
                        clientType: 9,
                        wechatFingerprint: e.t6
                    }, r && (o.token = r), e.abrupt("return", n.request().get("https://api.maoyan.com/operation/exhibition.json").header({
                        "content-type": "application/json"
                    }).query(o).end().then(function(t) {
                        return t.body;
                    }).then(function(e) {
                        var i = e.data, r = i.exhibit, o = i.exhibitionContentMap, s = i.backgroundImageUrl;
                        if (r) {
                            var c = n.system(), u = c.windowWidth, d = c.windowHeight;
                            d / u < 1.48 && (o.scale = 375 / u * d / 555);
                            var p = _extends({}, o, {
                                backgroundImageUrl: s
                            });
                            if (p.jumpUrl) {
                                var l = t._isNavToMiniProgram(p.jumpUrl), h = _slicedToArray(l, 2), g = h[0], v = h[1];
                                p.appId = g, p.path = v, p.version = "release", p.navUseAPI = t.canUseNavAPI();
                            }
                            var b = JSON.stringify({
                                activity_id: p.activityId
                            });
                            p.val_bid = "b_2nkw3n2u", p.val_lab = b, p.showSideBar = !0, -1 === TabBarPages.indexOf(a) && (p.style = "bottom: 184rpx;"), 
                            t.setData(p), t.page.stats && t.page.stats("b_9m1jsd8k", b);
                        }
                    }).catch(function(t) {
                        console.log(t);
                    }));

                  case 18:
                  case "end":
                    return e.stop();
                }
            }, e, t);
        }))();
    },
    getSidebarModal: function() {
        var t = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function e() {
            var n, a, i, r, o, s, c;
            return regeneratorRuntime.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (n = t.data, a = n.associationExhibitionId, i = n.businessActivityIdentity, i) {
                        e.next = 3;
                        break;
                    }
                    return e.abrupt("return");

                  case 3:
                    return r = getApp(), o = r.getPropSafely("$user.token", r, null), s = r.getPropSafely("$location.city.id", r, 0), 
                    e.t0 = r.channelId, e.t1 = a, e.t2 = i, e.t3 = s, e.next = 12, r.uuidV2();

                  case 12:
                    return e.t4 = e.sent, e.next = 15, r.getFingerprint();

                  case 15:
                    return e.t5 = e.sent, c = {
                        channelId: e.t0,
                        exhibitionId: e.t1,
                        businessActivityIdentity: e.t2,
                        cityId: e.t3,
                        uuid: e.t4,
                        clientType: 9,
                        wechatFingerprint: e.t5
                    }, o && (c.token = o), e.abrupt("return", r.request().get("https://api.maoyan.com/operation/getExhibitionById.json").header({
                        "content-type": "application/json"
                    }).query(c).end().then(function(t) {
                        return t.body;
                    }).catch(function(t) {
                        return console.log(t), {
                            data: {
                                exhibit: !1
                            }
                        };
                    }).then(function(e) {
                        var n = e.data, a = n.exhibit, r = n.exhibitionContentMap, o = n.backgroundImageUrl;
                        !1 === a && (r = {
                            data: [],
                            businessActivityIdentity: i
                        });
                        var s = new ActivityModal({
                            page: t.page
                        });
                        s.isFormSidebar = !0, r.data && r.businessActivityIdentity && s.renderRedpacketModal({
                            backgroundImageUrl: o,
                            exhibitionContentMap: r
                        });
                    }).catch(function(t) {
                        console.log(t);
                    }).then(function() {
                        t.setData({
                            showSideBar: !1,
                            appId: "",
                            path: "",
                            jumpUrl: "",
                            backgroundImageUrl: "",
                            associationExhibitionId: "",
                            activityId: "",
                            data: {}
                        });
                    }));

                  case 19:
                  case "end":
                    return e.stop();
                }
            }, e, t);
        }))();
    },
    onTapSideBar: function() {
        var t = getApp(), e = this.data, n = e.val_bid, a = e.val_lab, i = e.jumpUrl;
        this.data.associationExhibitionId ? this.getSidebarModal() : (this.page.stats && this.page.stats(n, a), 
        t.goto(i));
    },
    canUseNavAPI: function() {
        var t = getApp(), e = t.system().SDKVersion || "2.0.7";
        return util.compareVersion(e, "2.0.6") < 1;
    },
    _isNavToMiniProgram: function(t) {
        var e = [], n = /\/(wx\w{16})(\/[\w\W]*$)/, a = t.match(n);
        return a && a.length >= 3 && (e = a.slice(1, 3)), e;
    },
    navToMiniProgram: function() {
        var t = this, e = this.data, n = e.val_bid, a = e.val_lab, i = e.version, r = e.appId, o = e.path;
        wx.navigateToMiniProgram({
            appId: r,
            path: o,
            envVersion: i,
            success: function(e) {
                n && a && t.page.stats && t.stats(n, a);
            }
        });
    }
});