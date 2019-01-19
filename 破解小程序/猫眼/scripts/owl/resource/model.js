function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var s = t[r];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(t, r, s) {
        return r && e(t.prototype, r), s && e(t, s), t;
    };
}(), keys = [ "resourceUrl", "timestamp", "requestbyte", "responsebyte", "responsetime", "project", "pageUrl", "statusCode", "firstCategory", "secondCategory", "logContent" ], uploadKeys = [ "resourceUrl", "timestamp", "requestbyte", "responsebyte", "responsetime", "project", "pageUrl", "statusCode", "firstCategory", "secondCategory", "logContent" ], ResourceModel = function() {
    function e(t) {
        var r = this;
        _classCallCheck(this, e), keys.forEach(function(e) {
            void 0 !== t[e] ? r[e] = t[e] : r[e] = "";
        }), this.parse();
    }
    return _createClass(e, [ {
        key: "update",
        value: function(e) {
            for (var t in e) e.hasOwnProperty(t) && -1 !== keys.indexOf(t) && (this[t] = e[t]);
        }
    }, {
        key: "parse",
        value: function() {
            this.timestamp || (this.timestamp = Date.now()), this.requestbyte || (this.requestbyte = 0), 
            this.responsebyte || (this.responsebyte = 0);
        }
    }, {
        key: "stringify",
        value: function() {
            var e = this;
            return uploadKeys.map(function(t) {
                return e[t];
            }).join("\t");
        }
    } ]), e;
}();

exports.default = ResourceModel;