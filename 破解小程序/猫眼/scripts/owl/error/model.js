function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var a = t[r];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, r, a) {
        return r && e(t.prototype, r), a && e(t, a), t;
    };
}(), _util = require("../util/util"), Level = {
    ERROR: "error"
}, Category = {
    SCRIPT: "jsError",
    AJAX: "ajaxError"
}, errKeys = [ "project", "pageUrl", "resourceUrl", "category", "sec_category", "level", "timestamp", "content" ], VALID_ATTR = [ "rowNum", "colNum" ].concat(errKeys), OwlError = function() {
    function e(t) {
        if (_classCallCheck(this, e), t) {
            var r = void 0;
            for (r in t) t.hasOwnProperty(r) && (this[r] = t[r]);
            this.parse(t);
        }
    }
    return _createClass(e, [ {
        key: "parse",
        value: function() {
            this.category || (this.category = Category.SCRIPT), this.level || (this.level = Level.ERROR), 
            this.timestamp || (this.timestamp = Date.now()), this.sec_category || (this.sec_category = "default");
        }
    }, {
        key: "isEqual",
        value: function(e) {
            return this.sec_category === e.sec_category && this.resourceUrl === e.resourceUrl && this.content === e.content;
        }
    }, {
        key: "update",
        value: function(e) {
            for (var t in e) void 0 !== e[t] && -1 !== VALID_ATTR.indexOf(t) && (this[t] = e[t]);
            return this;
        }
    }, {
        key: "updateTags",
        value: function(e) {
            var t = (0, _util.extend)(this.tags || {}, e);
            return this.tags = t, this;
        }
    }, {
        key: "toJson",
        value: function() {
            var e = this, t = this.rowNum, r = this.colNum, a = {};
            return errKeys.map(function(t) {
                void 0 !== e[t] && (a[t] = e[t]);
            }), a.category === Category.SCRIPT && t && r && (a.dynamicMetric = {
                rowNum: t,
                colNum: r
            }), this.tags && (a.dynamicMetric = (0, _util.extend)(a.dynamicMetric || {}, this.tags)), 
            a;
        }
    } ]), e;
}();

OwlError.LEVEL = Level, OwlError.CATEGORY = Category, exports.default = OwlError;