function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), _env = require("../env"), _util = require("../util/util"), _index = require("../constant/index"), _model = require("./model"), _model2 = _interopRequireDefault(_model), NAME = "resource", apiCache = [], Resource = function() {
    function e(t, r) {
        _classCallCheck(this, e), this.cfgManager = t, this.errManager = r, this.CACHE_SEND_TRIGGER = 10;
    }
    return _createClass(e, [ {
        key: "_parse",
        value: function(e) {
            return e.pageUrl || (e.pageUrl = this.cfgManager.get("pageUrl") || (0, _env.getPageUrl)()), 
            e.project || (e.project = this.cfgManager.get("project")), e;
        }
    }, {
        key: "_stringify",
        value: function(e) {
            var t = [];
            t = e ? apiCache.splice(0, this.CACHE_SEND_TRIGGER) : apiCache.splice(0, apiCache.length);
            var r = t;
            if (r && r.length) {
                var n = [], a = this.cfgManager.getExtension(), o = [], i = {
                    region: 0,
                    operator: 1,
                    network: 2,
                    container: 3,
                    os: 4,
                    unionId: 5
                };
                for (var s in a) a.hasOwnProperty(s) && (o[i[s]] = a[s]);
                a = "S\t" + o.join("\t"), n.push(a);
                for (var u = 0; u < r.length; u++) {
                    var c = r[u];
                    n.push(c.stringify());
                }
                return apiCache = [], n = n.join("\n");
            }
        }
    }, {
        key: "pushApi",
        value: function(e, t) {
            var r = this._parse(e), n = new _model2.default(r);
            apiCache.push(n), apiCache.length && (apiCache.length >= this.CACHE_SEND_TRIGGER && this.report(!0), 
            t && this.report());
        }
    }, {
        key: "addApi",
        value: function(e, t) {
            if (e) {
                if (void 0 !== e.networkCode && "number" != typeof e.networkCode) return void console.log("网络状态码必须为Number类型", JSON.stringify(e));
                if (void 0 !== e.statusCode && "number" != typeof e.statusCode) return void console.log("业务状态码必须为Number类型", JSON.stringify(e));
                var r = {
                    type: "api",
                    resourceUrl: e.name,
                    statusCode: (e.networkCode || "") + "|" + (e.statusCode || ""),
                    responsetime: e.responseTime
                };
                e.content && (r.firstCategory = _index.CATEGORY.AJAX, r.secondCategory = e.secondCategory || e.name, 
                r.logContent = e.content), this.pushApi(r, t);
            }
        }
    }, {
        key: "addApiError",
        value: function(e, t, r) {
            Math.random() > .2 || this.errManager.pushError({
                sec_category: e,
                content: t,
                category: "ajaxError",
                level: "warn"
            }, r);
        }
    }, {
        key: "report",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t = this.cfgManager, r = this._stringify(e);
            if (!(Math.random() > t.get(NAME).sample) && r) {
                var n = t.getApiPath(NAME), a = (0, _util.stringify)(n);
                a = a + "&" + (0, _util.getReportVersions)(t.config), (0, _util.requestQueue)({
                    url: a,
                    data: "c=" + encodeURIComponent(r),
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    method: "POST",
                    success: function() {}
                });
            }
        }
    } ]), e;
}();

exports.default = Resource;