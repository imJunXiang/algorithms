var _slicedToArray = function() {
    function t(t, e) {
        var n = [], a = !0, r = !1, o = void 0;
        try {
            for (var i, u = t[Symbol.iterator](); !(a = (i = u.next()).done) && (n.push(i.value), 
            !e || n.length !== e); a = !0) ;
        } catch (t) {
            r = !0, o = t;
        } finally {
            try {
                !a && u.return && u.return();
            } finally {
                if (r) throw o;
            }
        }
        return n;
    }
    return function(e, n) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}();

!function(t) {
    function e(e, a) {
        var i = {}, u = {
            order: "BO",
            pay: "BP",
            appOnload: "AS",
            appOnshow: "AS",
            mpt: "PV",
            mge: "MC"
        }, l = __wxRoute, v = {
            val_cid: function() {
                return a.val_cid || (l !== t ? l : "");
            },
            val_val: function() {
                return s({}, i, a.val_val);
            }
        };
        a.stats = function(t, n, a) {
            "order" !== t && "pay" !== t && (a = n, n = t), t = u[t] || "MC", o(e, s({
                nm: t,
                val_bid: n,
                val_lab: a
            }, v));
        }, a.fullParamStats = function(t) {
            !t || Object.keys(t).length <= 0 || o(e, s(t, v));
        }, n(a, "onLoad", function(e, n, a) {
            if ("{}" !== JSON.stringify(a[0] || {})) {
                a[0].q && (a[0] = s(a[0], r(a[0].q)));
                var o = {
                    utm_source: a[0].utm_source,
                    utm_medium: a[0].utm_medium,
                    utm_term: a[0].utm_term,
                    utm_content: a[0].utm_content,
                    utm_campaign: a[0].utm_campaign
                };
                "{}" !== JSON.stringify(o) && (Object.keys(o).forEach(function(e) {
                    o[e] === t && delete o[e];
                }), o = Object.assign({}, c("stats_utm"), o), c("stats_utm", o)), i.custom = s({}, i.custom, a[0]);
            }
            n.apply(this, a);
        });
        var d;
        n(a, "onShow", function(t, n, a) {
            d = +new Date(), v.req_id = 1e3 * d + (1e3 * Math.random() | 0), setTimeout(function() {
                o(e, s({
                    nm: "PV",
                    val_act: "pageview",
                    val_ref: m
                }, v)), m = v.val_cid();
            }, 100), n.apply(this, a);
        }), n(a, "onHide", function(t, n, a) {
            setTimeout(function() {
                o(e, s({
                    isauto: 1,
                    nm: "PD",
                    val_act: "quit",
                    val_bid: "pagehide",
                    val_lab: {
                        duration: new Date() - d
                    }
                }, v));
            }, 100), n.apply(this, a);
        });
        for (var _ in a) (a.hasOwnProperty(_) && function(t) {
            var n = !S[t] && "function" == typeof a[t];
            return e.injectFilter && (n = n && e.injectFilter(t)), n;
        }(_) || a[_ + "_val_bid"]) && n(a, _, function(n, r, i) {
            var u = i[0], l = u && u.currentTarget ? u.currentTarget : {
                dataset: {}
            };
            return setTimeout(function() {
                o(e, s({
                    event_type: u && "tap" === u.type ? "click" : t,
                    nm: "MC",
                    val_bid: l.dataset && l.dataset.val_bid || a[n + "_val_bid"] || n,
                    val_lab: l.dataset && l.dataset.val_lab,
                    val_act: l.id || t
                }, v));
            }, 100), r.apply(this, i);
        });
    }
    function n(t, e, n) {
        var r = t[e] || a;
        t[e] = function() {
            var t = [].slice.call(arguments, 0);
            return n.call(this, e, r, t);
        };
    }
    function a() {}
    function r(t) {
        var e = t.split("?"), n = _slicedToArray(e, 2), a = (n[0], n[1]), r = {};
        return a && (r = a.split("&").reduce(function(t, e) {
            var n = e.split("="), a = _slicedToArray(n, 2), r = a[0], o = a[1];
            return t[r] = o, t;
        }, {})), r;
    }
    function o(e, n) {
        if (!n.val_cid) throw new Error("val_cid 是必须的");
        if ("PV" !== n.nm && !n.val_bid && !n.val_act) throw new Error("非 PV 事件的 val_bid 或 val_act 是必须的");
        "function" == typeof n.val_cid && (n.val_cid = n.val_cid()), "function" == typeof n.val_val && (n.val_val = n.val_val()), 
        "string" == typeof n.val_lab && (n.val_lab = v(n.val_lab)), n.val_lab || (n.val_lab = {}), 
        null == n.tm && (n.tm = +new Date()), null == n.seq && (n.seq = b++), null == n.nt && (n.nt = 3), 
        null == n.isauto && (n.isauto = 0), e.env || (e.env = s({
            category: "data_sdk_" + e.channel,
            appnm: e.appnm,
            app: e.app,
            uuid: c("stats_uuid", d)
        }, f)), e.env.utm = c("stats_utm") || t, e.utm && (e.env.utm = e.utm(e.env.utm)), 
        e.env.msid = c("stats_msid", _), p();
        var a = e.uid && e.uid();
        if (a && (e.env.uid = a), n.val_val) {
            var r = getApp();
            if (!r || !r.$uuidV2) return void T.push({
                _opts: e,
                _ev: n
            });
            var o = i(n.val_val.custom, e), m = o.custom;
            n.val_val.custom = m;
        }
        wx.getNetworkType({
            success: function(t) {
                e.env.net = t.networkType.toUpperCase(), e.env.ua = e.env.ua.replace(/(NetType\/).*/, "$1" + e.env.net), 
                e.noPending ? l(e, n) : T.length > 0 ? (T.forEach(function(t) {
                    var e = t._opts, n = t._ev, a = i(n.val_val.custom, e), r = a.custom;
                    e = a.opts, n.val_val.custom = r, n.val_lab.custom = s({}, n.val_lab.custom, r), 
                    u(e, n);
                }), T = []) : (n.val_lab.custom = s({}, n.val_lab.custom, n.val_val.custom), u(e, n));
            }
        });
    }
    function i() {
        var e = arguments.length > 0 && arguments[0] !== t ? arguments[0] : {}, n = arguments[1], a = getApp();
        return e.openId = a.$openId, e.myuuid = a.$uuidV2, e.version = a.version, n.env.wxid = a.$openId, 
        a.$location && Object.keys(a.$location).length > 0 && (e.cityId = (a.$location.city || {}).id || 0, 
        e.gcityId = (a.$location.locationCity || {}).id || 0), {
            custom: e,
            opts: n
        };
    }
    function u(t, e, n) {
        var a = c("stats_evs", function() {
            return [];
        });
        if (e) a.push(e); else if (n) {
            do {
                e = a.shift();
            } while (e && e.seq < n);
            e = null, n = null;
        }
        t ? c("stats_opts", t) : t = c("stats_opts"), c("stats_evs", a), clearTimeout(x), 
        x = setTimeout(function() {
            a[0] && !h && (h = 1, wx.request({
                method: "POST",
                url: t.url + "?stats_sdk",
                data: [ s({
                    evs: a
                }, t.env) ],
                header: t.header ? t.header() : {
                    "X-Host": "http://report.vip.sankuai.com"
                },
                success: function(t) {
                    t.statusCode + "" == "200" && (n = a.slice(-1)[0].seq);
                },
                complete: function() {
                    h = 0, n ? u(null, null, n) : setTimeout(u, 3e4);
                }
            }));
        }, 200);
    }
    function l(t, e) {
        wx.request({
            method: "POST",
            url: (t.url ? t.url : g) + "?stats_sdk",
            data: [ s({
                evs: [ e ]
            }, t.env) ],
            header: t.header ? t.header() : {
                "X-Host": "http://report.vip.sankuai.com"
            }
        });
    }
    function s(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var a in n) n.hasOwnProperty(a) && (t[a] = n[a]);
        }
        return t;
    }
    function c(t, e, n) {
        if (void 0 === e || "function" == typeof e) {
            var a = e;
            return e = wx.getStorageSync(t), e && e.__v && (e = e.expires < +new Date() ? "" : e.__v), 
            "" === e && a && (n = a.length ? {} : null, void 0 !== (e = a(n)) && c(t, e, n)), 
            e;
        }
        n && (n.__v = e, e = n);
        try {
            wx.setStorageSync(t, e);
        } catch (t) {
            console.error("storage", t);
        }
    }
    function v(t) {
        if (null != t) {
            if (t = ((t || "") + "").replace(/(\w+):/g, '"$1":').replace(/'/g, '"')) try {
                t = JSON.parse(t);
            } catch (t) {
                console.error(t);
            }
            return t;
        }
    }
    function d() {
        function t(t, e) {
            var n, a = 0;
            for (n = 0; n < e.length; n++) a |= i[n] << 8 * n;
            return t ^ a;
        }
        var e, n, a = function() {
            for (var t = 1 * new Date(), e = 0; t === 1 * new Date() && e < 200; ) e++;
            return t.toString(16) + e.toString(16);
        }, r = +(Math.random() + "").slice(2), o = f.ua || "", i = [], u = 0;
        for (e = 0; e < o.length; e++) n = o.charCodeAt(e), i.unshift(255 & n), i.length >= 4 && (u = t(u, i), 
        i = []);
        i.length > 0 && (u = t(u, i)), o = u;
        var l = 0;
        return f.sc && (l = f.sc.split("*"), l = +l[0] * +l[1]), [ a(), r, o, l, a() ].map(function(t) {
            return t.toString(16);
        }).join("-");
    }
    function _(t) {
        var e = function() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).slice(1);
        };
        return t.expires = +new Date() + y, b = 1, e() + e() + e() + e() + e() + e() + e();
    }
    function p() {
        var t = wx.getStorageSync("stats_msid");
        t.expires = +new Date() + y, c("stats_msid", t);
    }
    var f, m, h, y = 216e5, g = "https://report.meituan.com/", w = !1, b = 1, S = (module.exports = function(t) {
        if (w || (wx.removeStorageSync("stats_utm"), w = !0), !f) {
            var n = wx.getSystemInfoSync(), a = /(\w+)\s*([\d+\.]+)?/.exec(n.system);
            f = {
                sdk_ver: "wx_stats_2.0",
                ch: "weixin",
                ct: a && a[1].toLowerCase(),
                os: a && a[2],
                lch: n.platform,
                ua: "MicroMessengerWXA (" + n.model + "; " + n.system + "; " + n.pixelRatio + "dpr; language/" + n.language + ") " + n.platform + "/" + n.version + " NetType/",
                sc: n.windowHeight + "*" + n.windowWidth
            }, wx.getNetworkType({
                success: function(t) {
                    f.ua.replace(/(NetType\/).*/, "$1" + t.networkType.toUpperCase());
                }
            });
        }
        return function(n) {
            e(t, n);
        };
    }, {
        stats: 1,
        fullParamStats: 1,
        data: 1,
        onLoad: 1,
        onReady: 1,
        onShow: 1,
        onHide: 1,
        onPullDownRefresh: 1,
        onUnload: 1
    }), T = [], x = null;
}();