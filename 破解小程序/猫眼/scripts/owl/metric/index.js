function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function t(t, e) {
        for (var s = 0; s < e.length; s++) {
            var a = e[s];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(t, a.key, a);
        }
    }
    return function(e, s, a) {
        return s && t(e.prototype, s), a && t(e, a), e;
    };
}(), _util = require("../util/util"), NAME = "metric", MetricManager = function() {
    function t(e) {
        _classCallCheck(this, t), this.cfgManager = e, this.tags = {}, this.kvs = {};
    }
    return _createClass(t, [ {
        key: "setTags",
        value: function(t) {
            this.tags = Object.assign(this.tags, t);
        }
    }, {
        key: "getTags",
        value: function(t) {
            return t ? this.tags[t] : this.tags;
        }
    }, {
        key: "setMetric",
        value: function(t, e) {
            return "string" != typeof t ? console.log("metric名称必须是string类型") : "number" != typeof e ? console.log("metric值必须是number类型,当前为" + t + "-" + e) : (this.kvs[t] || (this.kvs[t] = []), 
            void this.kvs[t].push(e));
        }
    }, {
        key: "getMetric",
        value: function(t) {
            return t ? this.kvs[t] : this.kvs;
        }
    }, {
        key: "clearMetric",
        value: function() {
            this.kvs = {};
        }
    }, {
        key: "clearTags",
        value: function() {
            this.tags = {};
        }
    }, {
        key: "_rollbackMetric",
        value: function(t) {
            for (var e in t) t.hasOwnProperty(e) && (this.kvs[e] = t[e].concat(this.kvs[e] || []));
        }
    }, {
        key: "_rollbackTags",
        value: function(t) {
            this.tags = t || {};
        }
    }, {
        key: "report",
        value: function() {
            var t = this, e = this.cfgManager;
            if (this.kvs && 0 !== Object.keys(this.kvs).length) {
                var s = {
                    kvs: this.kvs,
                    tags: this.tags,
                    ts: parseInt(+new Date() / 1e3)
                }, a = this.tags;
                this.clearTags();
                var i = e.getApiPath(NAME);
                (0, _util.requestQueue)({
                    url: i + "&p=" + e.config.project,
                    method: "POST",
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: "data=" + encodeURIComponent(JSON.stringify(s)),
                    fail: function() {
                        t._rollbackTags(a);
                    }
                });
            }
        }
    } ]), t;
}();

exports.default = MetricManager;