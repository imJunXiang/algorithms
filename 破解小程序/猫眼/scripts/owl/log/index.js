function _classCallCheck(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function e(e, n) {
        for (var a = 0; a < n.length; a++) {
            var r = n[a];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(n, a, r) {
        return a && e(n.prototype, a), r && e(n, r), n;
    };
}(), Logan = require("../util/logan"), LogManager = function() {
    function e(n) {
        _classCallCheck(this, e), this.cfgManager = n;
    }
    return _createClass(e, [ {
        key: "addLog",
        value: function(e) {
            if ("string" != typeof e) return void console.log("addLog只接受string类型的日志");
            Logan.log("[Log]: " + e);
        }
    } ]), e;
}();

exports.default = LogManager;