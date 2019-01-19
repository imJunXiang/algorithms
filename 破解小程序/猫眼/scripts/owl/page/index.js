function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, i, n) {
        return i && e(t.prototype, i), n && e(t, n), t;
    };
}(), _env = require("../env"), _util = require("../util/util"), NAME = "page", PageSpeed = function() {
    function e(t) {
        _classCallCheck(this, e), this.cfgManager = t, this.speed = {}, this.firstContentfullPaint = {}, 
        this.moduleFirstRenderTime = {}, this.pageSource = {};
    }
    return _createClass(e, [ {
        key: "pushSpeed",
        value: function(e, t, i) {
            var n = this, r = this.speed, a = this.pageSource;
            r[e] || (r[e] = {}, r[e].customspeed = []), (0, _env.getEnv)().then(function(s) {
                var o = s;
                o.pageurl = e || o.pageUrl, delete o.pageUrl;
                var u = n.cfgManager.config, l = u.project, f = u.unionId, d = u.wxAppVersion, h = "default";
                a[e] && (h = a[e].source), o.operator = h, Object.assign(r[e], o, {
                    project: l,
                    timestamp: Date.now(),
                    unionId: f,
                    speed: "0|0|0",
                    wxAppVersion: d
                }), r[e].customspeed[t] = i;
            });
        }
    }, {
        key: "start",
        value: function(e, t) {
            this["start-" + e + "-" + t] = Date.now();
        }
    }, {
        key: "end",
        value: function(e, t) {
            var i = this["start-" + e + "-" + t], n = this["start-app-0"];
            n && (delete this["start-app-0"], this.pushSpeed("app", 0, Date.now() - n)), i ? this.pushSpeed(e, t, Date.now() - i) : console.log("请先埋点 start");
        }
    }, {
        key: "addSource",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "default";
            try {
                if (this._refresh) return;
                var t = (0, _env.getPageUrl)();
                this.pageSource[t] || (this.pageSource[t] = {}), this.pageSource[t].source = e;
            } catch (e) {
                console.log("addSource error", JSON.stringify(e));
            }
        }
    }, {
        key: "addPoint",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
            if (!this._refresh) if (t || (t = (0, _env.getPageUrl)() || ""), "app" === t) this.pushSpeed("app", e.position, Date.now() - this._appStart); else {
                var i = this._start || Date.now(), n = void 0;
                if (void 0 === e.position) return void console.log("请先埋点position");
                if (void 0 !== e.duration) n = e; else if (void 0 !== i) {
                    var r = e.timeStamp || +Date.now();
                    n = {
                        position: e.position,
                        duration: r - i
                    };
                }
                n && this.pushSpeed(t, n.position, n.duration);
            }
        }
    }, {
        key: "createFirstContentfulPaint",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [ "default" ], t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
            try {
                if (this._refresh) return;
                var i = (0, _env.getPageUrl)();
                this.firstContentfullPaint[i] || (this.firstContentfullPaint[i] = {}), this.firstContentfullPaint[i][t] = e;
            } catch (e) {
                console.log("create first error", JSON.stringify(e));
            }
        }
    }, {
        key: "addFirstContentfulPaint",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "default", t = arguments[1];
            if (!this._refresh) {
                var i = (0, _env.getPageUrl)(), n = void 0;
                try {
                    this.firstContentfullPaint[i] || (this.firstContentfullPaint[i] = {}), n = t || +new Date() - this._start, 
                    this.moduleFirstRenderTime[i] || (this.moduleFirstRenderTime[i] = {}), this.moduleFirstRenderTime[i][e] || (this.moduleFirstRenderTime[i][e] = n);
                } catch (e) {
                    console.log("add first error", JSON.stringify(e));
                }
            }
        }
    }, {
        key: "_getPageFirstPaint",
        value: function(e, t) {
            var i = this, n = void 0;
            this.firstContentfullPaint[e] && (n = this.firstContentfullPaint[e][t]);
            var r = 0;
            return n.forEach(function(t) {
                r = Math.max(i.moduleFirstRenderTime[e][t], r);
            }), r;
        }
    }, {
        key: "appLaunch",
        value: function(e) {
            this._appStart = e, this.addPoint({
                position: 0
            }, "app");
        }
    }, {
        key: "pageLoad",
        value: function() {
            this._start = Date.now(), this._refresh = !1;
        }
    }, {
        key: "pageReady",
        value: function() {
            this.addPoint({
                position: 0
            }, (0, _env.getPageUrl)());
        }
    }, {
        key: "pullRefresh",
        value: function() {
            this._refresh = !0;
        }
    }, {
        key: "report",
        value: function() {
            var e = this, t = this.cfgManager;
            if (!(t.get("devMode") || Math.random() > t.get(NAME).sample)) {
                var i = this.speed, n = this.firstContentfullPaint, r = this.moduleFirstRenderTime, a = t.getApiPath(NAME);
                Object.keys(i).forEach(function(t) {
                    var s = Object.assign({}, i[t]);
                    if (n[t]) {
                        var o = e.firstContentfullPaint[t];
                        for (var u in o) s.customspeed[u] = e._getPageFirstPaint(t, u);
                    }
                    s.customspeed = s.customspeed.join("|");
                    var l = (0, _util.stringify)(a);
                    l = (0, _util.stringify)(l, s), i[t] && delete i[t], r[t] && delete r[t], n[t] && delete n[t], 
                    (0, _util.requestQueue)({
                        url: l,
                        header: {
                            "content-type": "application/x-www-form-urlencoded;"
                        },
                        method: "GET",
                        success: function() {}
                    });
                });
            }
        }
    } ]), e;
}();

exports.default = PageSpeed;