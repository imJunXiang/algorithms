function _classCallCheck(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _createClass = function() {
    function e(e, r) {
        for (var n = 0; n < r.length; n++) {
            var o = r[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(r, n, o) {
        return n && e(r.prototype, n), o && e(r, o), r;
    };
}(), _env = require("../env"), _util = require("../util/util"), EM = require("./model").default, NAME = "error", errorCache = [], ErrorManager = function() {
    function e(r) {
        _classCallCheck(this, e), this.cfgManager = r;
    }
    return _createClass(e, [ {
        key: "parse",
        value: function(e) {
            return e.project || (e.project = this.cfgManager.get("project")), e.pageUrl || (e.pageUrl = this.cfgManager.get("pageUrl") || (0, 
            _env.getPageUrl)()), e;
        }
    }, {
        key: "pushError",
        value: function(e, r) {
            var n = this, o = this.cfgManager;
            (0, _env.getEnv)().then(function(t) {
                var a = getApp(), c = new EM(e);
                c = c.updateTags({
                    wxLibVersion: t.wxLibVersion,
                    wxVersion: t.wxVersion,
                    wxCodeVersion: a.version
                }), c = n._handleError(c), c = c.toJson(), e = n.parse(c);
                var i = t.network, s = t.container, u = t.os, l = t.unionId;
                l = o.config.unionId || l, e = Object.assign({
                    network: i,
                    container: s,
                    os: u,
                    unionId: l
                }, e), errorCache.push(e), r && n.report();
            });
        }
    }, {
        key: "_handleError",
        value: function(e) {
            try {
                var r = this.cfgManager.get("onErrorPush");
                if (r instanceof Function && (e = r(e)), e instanceof EM || void 0 === e) return e;
                console.log("onErrorPush方法返回结果有误");
            } catch (r) {
                return e;
            }
        }
    }, {
        key: "addError",
        value: function(e, r, n) {
            e || (e = "default"), r || (r = "error");
            try {
                r instanceof EM || (r instanceof Error ? r = r.stack || r.message : "object" === (void 0 === r ? "undefined" : _typeof(r)) && (r = {
                    sec_category: r.name,
                    content: r.msg
                })), this.pushError({
                    sec_category: e,
                    content: r,
                    category: "jsError",
                    level: "error"
                }, n);
            } catch (e) {
                this.reportSystemError(e), console.log("owl-inside-error", e);
            }
        }
    }, {
        key: "reportSystemError",
        value: function(e) {
            var r = this;
            e && e.stack && (0, _env.getEnv)().then(function(n) {
                errorCache.push(new EM({
                    project: "owl",
                    pageUrl: r.cfgManager.config.project + (0, _env.getPageUrl)(),
                    sec_category: e.msg || e.name || "parseError",
                    content: JSON.stringify(e.stack)
                })), r.report();
            }).catch(function(e) {
                console.log("owl-error", e);
            });
        }
    }, {
        key: "onError",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "jsError", n = e.replace("thirdScriptError", "").split(";");
            n = n.length ? n[0] : "", n = n.replace(/\t|\n/g, ""), this.pushError(new EM({
                content: e,
                category: r,
                sec_category: n,
                level: "error"
            }), !0);
        }
    }, {
        key: "report",
        value: function(e, r) {
            var n = this.cfgManager;
            if (errorCache.length) {
                var o = n.getApiPath(NAME), t = (0, _util.stringify)(o);
                t = t + "&" + (0, _util.getReportVersions)(n.config), (0, _util.requestQueue)({
                    url: t,
                    data: "c=" + encodeURIComponent(JSON.stringify(errorCache)),
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded;"
                    },
                    success: function(r) {
                        errorCache = [], e && e instanceof Function && e(r);
                    },
                    fail: function(e) {
                        r && r instanceof Function && r(e);
                    }
                });
            }
        }
    } ]), e;
}();

exports.default = ErrorManager;