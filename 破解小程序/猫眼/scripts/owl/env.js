function getPageUrl() {
    var e = getCurrentPages() || [];
    return e.length ? e[e.length - 1].__route__ : "app";
}

function getNetWorkType() {
    return wx.onNetworkStatusChange && wx.onNetworkStatusChange(function(e) {
        e && (env.network = e.networkType);
    }), new Promise(function(e, n) {
        wx.getNetworkType({
            success: function(n) {
                e(n.networkType);
            },
            fail: function() {
                e("unknown network");
            }
        }), setTimeout(function() {
            e("unknown network");
        }, 2e3);
    });
}

function getSystemInfo() {
    return new Promise(function(e, n) {
        wx.getSystemInfo({
            success: function(n) {
                var t = n.system, r = void 0 === t ? "" : t, o = n.version, i = void 0 === o ? "Unknown" : o, s = n.SDKVersion, u = void 0 === s ? "Unknown" : s, a = r.toLowerCase().match(/ios/) ? "iOS" : "Android";
                e({
                    os: a,
                    wxVersion: i,
                    wxLibVersion: u
                });
            },
            fail: function() {
                e("unknown system");
            }
        });
    });
}

function getEnv() {
    var e = getPageUrl();
    return new Promise(function(n, t) {
        Object.keys(env).length ? n(Object.assign({
            pageUrl: e
        }, env)) : Promise.all([ getNetWorkType(), getSystemInfo() ]).then(function(t) {
            var r = _slicedToArray(t, 2), o = r[0], i = r[1];
            env = Object.assign({}, i, {
                container: "MicroMessenger"
            }, {
                network: o
            }, {
                unionId: ""
            }), n(Object.assign({}, env, {
                pageUrl: e
            }));
        }).catch(function() {
            n({});
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _slicedToArray = function() {
    function e(e, n) {
        var t = [], r = !0, o = !1, i = void 0;
        try {
            for (var s, u = e[Symbol.iterator](); !(r = (s = u.next()).done) && (t.push(s.value), 
            !n || t.length !== n); r = !0) ;
        } catch (e) {
            o = !0, i = e;
        } finally {
            try {
                !r && u.return && u.return();
            } finally {
                if (o) throw i;
            }
        }
        return t;
    }
    return function(n, t) {
        if (Array.isArray(n)) return n;
        if (Symbol.iterator in Object(n)) return e(n, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}();

exports.getPageUrl = getPageUrl, exports.getEnv = getEnv;

var env = {};