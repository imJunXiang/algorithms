function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _defineProperty(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

var _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
}, _slicedToArray = function() {
    function e(e, t) {
        var n = [], r = !0, i = !1, a = void 0;
        try {
            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), 
            !t || n.length !== t); r = !0) ;
        } catch (e) {
            i = !0, a = e;
        } finally {
            try {
                !r && s.return && s.return();
            } finally {
                if (i) throw a;
            }
        }
        return n;
    }
    return function(t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), _linaConfig = require("../../../../scripts/show/linaConfig"), _linaConfig2 = _interopRequireDefault(_linaConfig), ShowAnnouncement = function(e) {
    var t = e.page, n = e.projectId;
    this.insertKey = "ShowAnnouncement", this.page = t, this.projectId = n, this.setData(this.data), 
    this.init();
};

ShowAnnouncement.prototype = {
    data: {
        isValid: !1
    },
    init: function() {
        var e = this;
        (0, _linaConfig2.default)().then(function(t) {
            var n = t.systemNotice, r = n.timeInterval, i = n.isValid, a = n.projectIds, o = void 0 === a ? [] : a, s = _slicedToArray(r, 2), u = s[0], l = s[1], c = +new Date(), f = c <= +new Date(l) && c >= +new Date(u), d = !1;
            Array.isArray(o) && o.length > 0 && (d = o.includes(e.projectId)), e.setData(_extends({}, n, {
                isValid: i && f && d || !1
            }));
        });
    },
    setData: function(e) {
        this.page.setData(_defineProperty({}, this.insertKey, _extends({}, this.data, e)));
    }
}, module.exports = ShowAnnouncement;