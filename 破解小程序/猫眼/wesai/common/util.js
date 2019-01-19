function calcIDCardCode(e, t) {
    if (17 != t.length) return "";
    for (var n = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ], r = e ? [ "1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2" ] : [ "1", "0", "5", "9", "8", "7", "6", "5", "4", "3", "2" ], o = 0, i = 0; i < t.length; i++) o += t.substr(i, 1) * n[i];
    return r[o % 11];
}

function check18IDCard(e, t) {
    if (e && 18 != t.length) return !1;
    if (!e && 14 != t.length) return !1;
    var n = t.substr(0, 17), r = t.substr(17, 1).toUpperCase();
    return calcIDCardCode(e, n) == r;
}

function find(e, t) {
    return e.filter(t)[0];
}

function deepCopy(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
    if (null === e || "object" !== (void 0 === e ? "undefined" : _typeof(e))) return e;
    var n = find(t, function(t) {
        return t.original === e;
    });
    if (n) return n.copy;
    var r = Array.isArray(e) ? [] : {};
    return t.push({
        original: e,
        copy: r
    }), Object.keys(e).forEach(function(n) {
        r[n] = deepCopy(e[n], t);
    }), r;
}

function isObject(e) {
    return null !== e && "object" === (void 0 === e ? "undefined" : _typeof(e));
}

function merge() {
    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    return Object.assign.apply(Object, [ {} ].concat(t));
}

function isPromise(e) {
    return e && "function" == typeof e.then;
}

function assert(e, t) {
    if (!e) throw new Error("[vuex] " + t);
}

function isEmptyObject(e) {
    var t = void 0;
    for (t in e) return !1;
    return !0;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

exports.calcIDCardCode = calcIDCardCode, exports.check18IDCard = check18IDCard, 
exports.deepCopy = deepCopy, exports.isObject = isObject, exports.merge = merge, 
exports.isPromise = isPromise, exports.assert = assert, exports.isEmptyObject = isEmptyObject;

var fixedEncodeURIComponent = function(e) {
    return encodeURIComponent(e).replace(/[!'()*]/g, function(e) {
        return "%" + e.charCodeAt(0).toString(16);
    });
};

!function() {
    "function" != typeof Array.prototype.find && (Array.prototype.find = function(e) {
        for (var t = 0; t < this.length; t++) {
            var n = this[t];
            if (e.call(this, n)) return n;
        }
    }), "function" != typeof Array.prototype.findIndex && (Array.prototype.findIndex = function(e) {
        for (var t = 0; t < this.length; t++) {
            var n = this[t];
            if (e.call(this, n)) return t;
        }
        return -1;
    });
}();

var getTimeStamp = exports.getTimeStamp = function(e) {
    return (new Date().getTime() + "").substring(0, e - 1 || 10);
}, sortByKey = exports.sortByKey = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n = [];
    for (var r in e) n.push(r);
    n.sort();
    var o = [];
    return n.length > 0 ? (n.forEach(function(n) {
        o.push([ t ? fixedEncodeURIComponent(n) : n, t ? fixedEncodeURIComponent(e[n]) : e[n] ].join("="));
    }), o.join("")) : "";
}, json2search = exports.json2search = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    return arguments.length > 1 && void 0 !== arguments[1] && arguments[1] ? Object.keys(e).map(function(t) {
        return encodeURIComponent(t) + "=" + encodeURIComponent(e[t]);
    }).join("&") : Object.keys(e).map(function(t) {
        return t + "=" + e[t];
    }).join("&");
}, search2json = exports.search2json = function(e) {
    return ("?" === e.slice(0, 1) ? e.substring(1) : e).split("&").reduce(function(e, t) {
        var n = t.split("=");
        return n[0] && (e[decodeURIComponent(n[0])] = decodeURIComponent(n[1])), e;
    }, {});
}, once = exports.once = function(e, t) {
    var n = void 0;
    return function() {
        return e && (n = e.apply(t || this, arguments), e = null), n;
    };
}, isString = exports.isString = function(e) {
    return "[object String]" === Object.prototype.toString.call(e);
}, extendQuery = exports.extendQuery = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], r = e.split("?")[1] && e.split("?")[1].split("#")[0] || "", o = e.split("#")[1] || "", i = search2json(r);
    return Object.assign(i, t), e.split("?")[0] + "?" + json2search(i, n) + (o ? "#" + o : "");
}, ObjectValues = exports.ObjectValues = function(e) {
    return Object.keys(e).map(function(t) {
        return e[t];
    });
};