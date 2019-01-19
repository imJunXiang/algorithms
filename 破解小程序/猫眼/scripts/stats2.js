function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var r = 0, e = Array(t.length); r < t.length; r++) e[r] = t[r];
        return e;
    }
    return Array.from(t);
}

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, _slicedToArray = function() {
    function t(t, r) {
        var e = [], o = !0, a = !1, n = void 0;
        try {
            for (var i, u = t[Symbol.iterator](); !(o = (i = u.next()).done) && (e.push(i.value), 
            !r || e.length !== r); o = !0) ;
        } catch (t) {
            a = !0, n = t;
        } finally {
            try {
                !o && u.return && u.return();
            } finally {
                if (a) throw n;
            }
        }
        return e;
    }
    return function(r, e) {
        if (Array.isArray(r)) return r;
        if (Symbol.iterator in Object(r)) return t(r, e);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}();

!function(t) {
    function r(r, o) {
        e(o, "stats", function(r, e, o) {
            var a = _slicedToArray(o, 3), i = a[0], u = a[1], l = a[2], c = l === t ? {} : l;
            switch (i) {
              case "appOnload":
              case "appOnshow":
                break;

              case "order":
                n("order", u, c.orderId || c.order_id, c);
                break;

              case "pay":
                n("pay", u, c.orderId || c.order_id, c);
                break;

              case "view":
                n("moduleView", u, c);
                break;

              default:
                c = u, u = i, n("moduleClick", u, c);
            }
            return e.apply(this, o);
        }), e(o, "onLoad", function(t, r, e) {
            this._hasPv = !1, r.apply(this, e);
        }), e(o, "onShow", function(t, r, e) {
            n("pageView", o.val_cid || this.route, o.val_val), r.apply(this, e);
        });
        for (var a in o) (o.hasOwnProperty(a) && function(t) {
            var e = !f[t] && "function" == typeof o[t];
            return r.injectFilter && (e = e && r.injectFilter(t)), e;
        }(a) || o[a + "_val_bid"]) && e(o, a, function(t, r, e) {
            var a = e[0], i = a && a.currentTarget ? a.currentTarget : {
                dataset: {}
            };
            return n("moduleClick", i.dataset && i.dataset.val_bid || o[t + "_val_bid"] || t, i.dataset && i.dataset.val_lab || {}), 
            r.apply(this, e);
        });
    }
    function e(t, r, e) {
        var a = t[r] || o;
        t[r] = function() {
            var t = [].slice.call(arguments, 0);
            return e.call(this, r, a, t);
        };
    }
    function o() {}
    function a(t) {
        for (var r = 1; r < arguments.length; r++) {
            var e = arguments[r];
            for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
        }
        return t;
    }
    function n(t) {
        for (var r = arguments.length, e = Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) e[o - 1] = arguments[o];
        try {
            if (!l.get("wxid")) return void y.push({
                type: t,
                args: e
            });
            var n = getApp().page();
            if ("pageView" !== t && !n._hasPv) return void d.push({
                type: t,
                args: e
            });
            var i = "pay" === t || "order" === t ? 2 : 1, c = e[i] || {};
            if ("object" !== (void 0 === c ? "undefined" : _typeof(c))) try {
                "string" == typeof c && (c = c.replace(/(\w+):/g, '"$1":').replace(/'/g, '"')), 
                c = JSON.parse(c);
            } catch (t) {
                c = {};
            }
            c.custom = a({}, c.custom, {
                query: n.options,
                path: n.route
            }), e[i] = c, l[t].apply(l, e), "pageView" === t && (n._hasPv = !0, u());
        } catch (t) {
            var s = getApp();
            if (s && s.owl) {
                var p = s.owl.error;
                p.addError("stats2 error", p);
            }
        }
    }
    function i() {
        for (var r = void 0; r = y.shift(); ) n.apply(t, [ r.type ].concat(_toConsumableArray(r.args)));
    }
    function u() {
        for (var r = void 0; r = d.shift(); ) n.apply(t, [ r.type ].concat(_toConsumableArray(r.args)));
    }
    var l = require("./analytics"), c = (require("../config/wallet"), require("./login")), s = require("../models/location");
    module.exports = function(t) {
        return function(e) {
            r(t, e);
        };
    }, l.init("https://report.meituan.com/?lx", {
        appnm: "maoyan_wxwallet_i_test",
        category: "movie"
    });
    var p = App;
    App = function(t) {
        e(t, "onShow", function(t, r, e) {
            var o = this;
            if (!e[0].query.utm_campaign) {
                var n = this.openPlatform && this.openPlatform.get();
                if (n) {
                    var u = n.extChannelId, s = n.extSubChannel;
                    l.setUTM(a({}, e[0].query, {
                        utm_campaign: "openPlatform=" + [ u, s ].filter(function(t) {
                            return !!t;
                        }).join("-")
                    }));
                }
            }
            return setTimeout(function() {
                o.lx = l, c.openId().then(function(t) {
                    l.set("wxid", t), i();
                });
            }, 0), r.apply(this, e);
        }), p(t);
    }, s.on("geo-location", function(t) {
        l.resetGeolocation(t.longitude, t.latitude);
    });
    var f = {
        stats: 1,
        fullParamStats: 1,
        data: 1,
        onLoad: 1,
        onReady: 1,
        onShow: 1,
        onHide: 1,
        onPullDownRefresh: 1,
        onUnload: 1
    }, y = [], d = [];
}();