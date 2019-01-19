function genWxaHeader() {
    var e = getApp(), t = e.page(), r = e.pages().slice(-2)[0];
    if (t && r) return {
        "x-wxa-page": t.route,
        "x-wxa-query": t.options ? encodeURIComponent(JSON.stringify(t.options)) : void 0,
        "x-wxa-referer": r.route
    };
}

var _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
}, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, apiConfig = require("./api-config"), config = require("./config"), MD5 = require("./md5");

require("./polyfill");

var PROD_SERVER = "https://wx.maoyan.com", $requestLimit = 7, $requestList = [], $requestingMap = {}, $requests = [], DOMAIN = PROD_SERVER, client_id = "X8YSRYRVckgNK1vfKFIs", SPACE = ":";

module.exports = function(e, t, r, o) {
    var n = getApp();
    "object" === (void 0 === e ? "undefined" : _typeof(e)) && (t = e.url, e.data, e.header, 
    e = e.method);
    var s = "prod";
    try {
        s = getApp().$debug ? apiConfig.getApiEnv() : "prod";
    } catch (e) {
        console.error(e);
    }
    var i = {
        method: e,
        url: t,
        header: {
            "X-Requested-With": "wxapp",
            version: n.version
        },
        data: {},
        query: {},
        sign: !1
    };
    try {
        var a = genWxaHeader();
        Object.assign(i.header, a);
    } catch (e) {
        console.error(e);
    }
    var u = {
        config: function(e, t) {
            return 2 === arguments.length ? (i.options = i.options || {}, i.options[e] = t) : i.options = e, 
            u;
        },
        header: function(e, t) {
            return 2 === arguments.length ? i.header[e] = t : i.header = _extends({}, i.header, e), 
            u;
        },
        host: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wx";
            return i.url = config.host[e] + i.url, u;
        },
        proxyhost: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "api";
            return i.url = "/hostproxy" + i.url, this.header("x-host", config.proxyhost[e]), 
            u;
        },
        proxy: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "api";
            return i.url = "/proxy" + i.url, this.header("x-host", config.proxyhost[e]), u;
        },
        token: function() {
            return this.header("token", n.$user && n.$user.token), u;
        },
        query: function(e, t) {
            return 2 === arguments.length ? i.query[e] = t : i.query = _extends({}, i.query, e), 
            u;
        },
        send: function(e, t) {
            return 2 === arguments.length ? i.data[e] = t : i.data = e, u;
        },
        sign: function() {
            return i.sign = !0, u;
        },
        end: function(e) {
            function r(e, t) {
                Object.keys(e).forEach(function(r) {
                    if (void 0 === e[r] && ("TOKEN" === r.toUpperCase() ? e[r] = "" : delete e[r]), 
                    "object" === _typeof(e[r]) && "application/json" !== i.header["content-type"]) try {
                        e[r] = JSON.stringify(e[r]);
                    } catch (e) {}
                    i.sign && t && "number" == typeof e[r] && (e[r] += "");
                });
            }
            if (i.options && i.options.key) {
                if ($requestingMap[i.options.key]) return Promise.reject();
                $requestingMap[i.options.key] = !0;
            }
            var o = new Promise(function(t, r) {
                e || (e = function(e, o) {
                    if (e) return r(e);
                    t(o);
                });
            });
            if ("staging" === s && apiConfig.prod2Staging(i), i.header["content-type"] || (i.method && "GET" != i.method.toUpperCase() ? i.header["content-type"] = "application/x-www-form-urlencoded" : i.header["content-type"] = "multipart/form-data"), 
            r(i.header), r(i.query, !0), r(i.data, !0), i.url.indexOf("http") && (i.url = config.host.wx + i.url), 
            i.sign) {
                var a = +new Date(), u = Math.random().toString(36).substr(2, 8), p = i.url.split("?")[0], d = {};
                "GET" === i.method.toUpperCase() && (d = Object.assign({}, i.query)), "POST" === i.method.toUpperCase() && (d = Object.assign({}, i.data)), 
                d = JSON.stringify(d);
                var c = i.header.token || "", g = [ u, a, p, d, c ].join(SPACE);
                i.header["x-sign"] = MD5(g, client_id), i.header["x-timestamp"] = a, i.header["x-random"] = u;
            }
            return Object.keys(i.query).forEach(function(e) {
                i.url += (i.url.includes("?") ? "&" : "?") + [ encodeURIComponent(e), encodeURIComponent(i.query[e]) ].join("=");
            }), i.timestamp = +new Date(), i.complete = function(r) {
                var o = $requestList.indexOf(i);
                for ($requestList.splice(o, 1), o = 0; o < $requestList.length; o++) {
                    var s = $requestList[o];
                    if ("pending" === s.status) {
                        wx.request(s), delete s.status;
                        break;
                    }
                }
                r.statusCode = r.statusCode || 0;
                var a = null;
                if (r.errMsg.includes("request:fail") && (a = new Error(r.errMsg), a.name = "Network Error", 
                a.type = 1, a.errType = "networkError", a.res = r), r.errMsg.includes("request:ok")) {
                    if ([ 4, 5 ].includes(parseInt(r.statusCode / 100, 10))) a = new Error(r.errMsg), 
                    a.name = "Server Error", a.type = 2, a.errType = "serverError", a.res = r; else if (r.data && r.data.error) a = new Error(r.data.error.message), 
                    a.name = "Internal Error", a.type = 3, a.errType = "otherError", a.res = r, a.errRes = r.data.error, 
                    [ 401 ].includes(r.data.error.code) && n && n.logout(); else {
                        var u = getCurrentPages().slice(-1)[0];
                        u && u.hideErrorPage && "function" == typeof u.hideErrorPage && u.hideErrorPage();
                    }
                }
                i.options && (i.options.loading && wx.hideToast(), i.options.barLoading && wx.hideNavigationBarLoading());
                var p = {
                    request: i,
                    timestamp: +new Date(),
                    header: r.header,
                    body: r.data,
                    statusCode: parseInt(r.statusCode, 10)
                };
                e && e(a, p);
                var d = {};
                a && (d = {
                    logContent: a.message,
                    firstCategory: a.name,
                    secondCategory: i.url
                });
                try {
                    n.owl.resource.pushApi(Object.assign({
                        name: t,
                        timestamp: i.timestamp,
                        statusCode: parseInt(r.statusCode, 10),
                        resourceUrl: t,
                        header: i.header,
                        responsetime: +new Date() - i.timestamp
                    }, d));
                } catch (e) {
                    console.error(e);
                }
                i.options && i.options.key && setTimeout(function() {
                    delete $requestingMap[i.options.key];
                }, 100), wx.stopPullDownRefresh();
            }, i.options && (i.options.loading && wx.showToast({
                icon: "loading",
                title: "加载中...",
                duration: 1e4
            }), i.options.barLoading && wx.showNavigationBarLoading()), $requestList.push(i), 
            $requestList.length > $requestLimit ? i.status = "pending" : wx.request(i), $requests > 100 && $requests.clear(), 
            $requests.push(i), o;
        }
    };
    return "get post put delete".split(" ").forEach(function(e) {
        u[e] = function() {
            return function(t) {
                return i.url = i.url || t, i.method = (i.method || e).toUpperCase(), u;
            };
        }();
    }), u;
};