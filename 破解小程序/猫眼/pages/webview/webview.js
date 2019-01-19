function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var r = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function n(a, i) {
                try {
                    var o = r[a](i), u = o.value;
                } catch (e) {
                    return void t(e);
                }
                if (!o.done) return Promise.resolve(u).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(u);
            }
            return n("next");
        });
    };
}

var _slicedToArray = function() {
    function e(e, r) {
        var t = [], n = !0, a = !1, i = void 0;
        try {
            for (var o, u = e[Symbol.iterator](); !(n = (o = u.next()).done) && (t.push(o.value), 
            !r || t.length !== r); n = !0) ;
        } catch (e) {
            a = !0, i = e;
        } finally {
            try {
                !n && u.return && u.return();
            } finally {
                if (a) throw i;
            }
        }
        return t;
    }
    return function(r, t) {
        if (Array.isArray(r)) return r;
        if (Symbol.iterator in Object(r)) return e(r, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), _extends = Object.assign || function(e) {
    for (var r = 1; r < arguments.length; r++) {
        var t = arguments[r];
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
}, _url = require("../../models/url"), _url2 = _interopRequireDefault(_url), app = getApp();

Page({
    data: {
        url: ""
    },
    onShareAppMessage: function() {
        var e = this.options, r = e.shareUrl, t = void 0 === r ? "" : r, n = e.imgUrl, a = e.title, i = void 0 === a ? "" : a, o = _url2.default.getCurrentPageUrlWithArgs();
        if (/giftpackage/gim.test(o)) return o = "pages/movie/index?redirect=" + encodeURIComponent("/" + o), 
        {
            path: o,
            title: "19.9元《江湖儿女》在线看，送价值238元法国红酒",
            imageUrl: "http://p0.meituan.net/scarlett/e1ef1f44403b155b3ec68e7bd89b467586052.jpg"
        };
        if (t && n) {
            var u = decodeURIComponent(t);
            return o = app.shareParams({
                redirect: "/" + u
            }), {
                path: "pages/movie/index?" + o,
                imageUrl: n,
                title: i
            };
        }
        return {
            path: o
        };
    },
    onLoad: function(e) {
        var r = this;
        this.options = e, app.$user.token ? this.loginAfter(e) : app.checkLogin({
            success: function() {
                r.loginAfter(e);
            }
        });
    },
    isAddFingerprintParam: function(e) {
        return [ "meituan.com" ].every(function(r) {
            return e.indexOf(r) < 0;
        });
    },
    loginAfter: function(e) {
        var r = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function t() {
            var n, a, i, o, u, p, s, c, l, f, d, g, h, y, m, v;
            return regeneratorRuntime.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return n = decodeURIComponent(e.url), /wenjuan\.meituan\.com/gim.test(n) ? wx.hideShareMenu && wx.hideShareMenu() : wx.showShareMenu && wx.showShareMenu({}), 
                    a = app.$location, i = app.getPropSafely("$location.city.id", app, ""), o = app.getPropSafely("$location.latitude", app, ""), 
                    u = app.getPropSafely("$location.longitude", app, ""), p = app.getPropSafely("$user.token", app, ""), 
                    s = app.getPropSafely("$user.userId", app, ""), c = app.getPropSafely("$user.openId", app, ""), 
                    t.next = 11, app.getFingerprint();

                  case 11:
                    l = t.sent, f = app.$uuid || "", d = {
                        ci: i,
                        lat: o,
                        lng: u,
                        token: p,
                        userid: s,
                        openid: c,
                        uuid: f,
                        cityId: i,
                        from: "wxapp"
                    }, r.isAddFingerprintParam(n) && (d = _extends({}, d, {
                        fingerprint: l
                    })), g = n.split("?"), h = _slicedToArray(g, 2), y = h[0], m = h[1], v = {}, m && (v = m.split("&").reduce(function(e, r) {
                        var t = r.split("="), n = _slicedToArray(t, 2), a = n[0], i = n[1];
                        return e[a] = i, e;
                    }, {})), v = Object.assign(d, v), n = [ y, app.queryStringify(v) ].join("?"), r.setData({
                        url: n
                    });

                  case 21:
                  case "end":
                    return t.stop();
                }
            }, t, r);
        }))();
    }
});