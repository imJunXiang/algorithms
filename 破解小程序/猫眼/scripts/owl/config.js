function _classCallCheck(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _createClass = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var i = n[t];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(n, t, i) {
        return t && e(n.prototype, t), i && e(n, i), n;
    };
}(), _index = require("./constant/index"), _util = require("./util/util"), urlProduct = "https://catfront.dianping.com", urlBeta = "https://catfront.51ping.com", EXT = [ "region", "operator", "network", "container", "os", "unionId" ], CfgManager = function() {
    function e(n) {
        if (_classCallCheck(this, e), this._config = {
            devMode: !1,
            project: "",
            pageUrl: "",
            resource: {
                sample: .1
            },
            page: {
                sample: .5
            },
            error: {
                sample: 1
            },
            version: {},
            logan: {
                enable: !1,
                config: {
                    enableShake: !1,
                    appSource: "dianping"
                }
            }
        }, this.config = {}, this.userConfig = {}, this.url = urlProduct, n ? this.set(n) : this.config = this._config, 
        this.baseQuery = {
            v: 1,
            sdk: _index.VERSION
        }, this.apiPaths = {
            log: "/api/log",
            error: "/api/log",
            page: "/api/speed",
            resource: "/api/batch",
            metric: "/api/metric"
        }, this.extensions = {}, !n.unionId) {
            var t = wx.getStorageSync(_index.STOREKEY + "-unionId");
            t ? this.config.unionId = t : (this.config.unionId = (0, _util.MSID)(), this.cacheUnionId(this.config.unionId));
        }
    }
    return _createClass(e, [ {
        key: "_update",
        value: function() {
            this.config = this._config;
            for (var e in this.userConfig) {
                var n = this.userConfig[e];
                "object" !== (void 0 === n ? "undefined" : _typeof(n)) || n instanceof RegExp || n instanceof Array ? this.config[e] = n : this.config[e] = (0, 
                _util.extend)(this.config[e], this.userConfig[e]);
            }
        }
    }, {
        key: "update",
        value: function(e, n) {
            this[e] = n, "unionId" === e && this.cacheUnionId(n);
        }
    }, {
        key: "get",
        value: function(e) {
            return e ? this.config[e] : this.config;
        }
    }, {
        key: "set",
        value: function(e) {
            for (var n in e) e.hasOwnProperty(n) && ("devMode" === n && this.setApiDomain(e[n]), 
            "object" !== _typeof(e[n]) || e[n] instanceof RegExp || e[n] instanceof Array ? this.userConfig[n] = e[n] : this.userConfig[n] = (0, 
            _util.extend)(this.userConfig[n], e[n]));
            this._update();
        }
    }, {
        key: "getApiPath",
        value: function(e) {
            var n = this.apiPaths[e];
            return (0, _util.stringify)(this.url + n, this.baseQuery);
        }
    }, {
        key: "setApiDomain",
        value: function(e) {
            this.url = e ? urlBeta : urlProduct;
        }
    }, {
        key: "getExtension",
        value: function(e) {
            return e ? this.extensions[e] : this.extensions;
        }
    }, {
        key: "setExtension",
        value: function(e) {
            for (var n in e) if (e.hasOwnProperty(n)) {
                var t = e[n];
                -1 !== EXT.indexOf(n) ? this.extensions[n] = "unionId" === n ? this.config.unionId : t : this.config.version[n] = t;
            }
        }
    }, {
        key: "cacheUnionId",
        value: function(e) {
            wx.setStorage({
                key: _index.STOREKEY + "-unionId",
                data: e
            });
        }
    } ]), e;
}();

exports.default = CfgManager;