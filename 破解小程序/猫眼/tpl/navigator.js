var _slicedToArray = function() {
    function t(t, r) {
        var i = [], a = !0, e = !1, n = void 0;
        try {
            for (var s, o = t[Symbol.iterator](); !(a = (s = o.next()).done) && (i.push(s.value), 
            !r || i.length !== r); a = !0) ;
        } catch (t) {
            e = !0, n = t;
        } finally {
            try {
                !a && o.return && o.return();
            } finally {
                if (e) throw n;
            }
        }
        return i;
    }
    return function(r, i) {
        if (Array.isArray(r)) return r;
        if (Symbol.iterator in Object(r)) return t(r, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), app = getApp(), util = require("../scripts/utils");

Component({
    properties: {
        val_bid: String,
        val_lab: String,
        url: String,
        version: String,
        externalStyle: String,
        pageUrl: String,
        needLogin: Boolean,
        isLogin: Boolean
    },
    data: {
        navToMiniProgramByAPI: util.compareVersion(app.system().SDKVersion || "2.0.7", "2.0.6") < 1,
        appId: "",
        path: ""
    },
    attached: function() {
        if (this.properties.url) {
            var t = {
                val_cid: this.properties.pageUrl
            };
            app.stats(t), this.stats = t.stats;
            var r = this._isNavToMiniProgram(), i = _slicedToArray(r, 2), a = i[0], e = i[1];
            a && this.setData({
                appId: a,
                path: e
            });
        }
    },
    methods: {
        navToMiniProgram: function(t) {
            var r = this, i = this.properties, a = i.val_bid, e = i.val_lab, n = i.version, s = this.data, o = s.appId, p = s.path;
            wx.navigateToMiniProgram({
                appId: o,
                path: p,
                envVersion: n,
                success: function(t) {
                    a && e && r.stats(a, e);
                }
            });
        },
        onTapNavigator: function() {
            var t = this.properties, r = t.val_bid, i = t.val_lab;
            r && i && this.stats(r, i);
        },
        normalNav: function() {
            var t = this.properties, r = t.val_bid, i = t.val_lab, a = t.url;
            r && app.stats && this.stats(r, i), app.goto(a);
        },
        getuserinfo: function(t) {
            this.triggerEvent("getuserinfo", t);
        },
        _isNavToMiniProgram: function(t) {
            var r = [], i = /\/(wx\w{16})(\/[\w\W]*$)/, a = this.properties.url.match(i);
            return a && a.length >= 3 && (r = a.slice(1, 3)), r;
        }
    }
});