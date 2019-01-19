function AdBanner(t) {
    var e = t.page, a = t.positionIds, n = t.params;
    this.key = "AdBanner", this.page = e, this.positionId = a, this.params = n || {}, 
    this.isDisplayDots = !0, this.setData(this.data);
}

var _slicedToArray = function() {
    function t(t, e) {
        var a = [], n = !0, i = !1, r = void 0;
        try {
            for (var s, o = t[Symbol.iterator](); !(n = (s = o.next()).done) && (a.push(s.value), 
            !e || a.length !== e); n = !0) ;
        } catch (t) {
            i = !0, r = t;
        } finally {
            try {
                !n && o.return && o.return();
            } finally {
                if (i) throw r;
            }
        }
        return a;
    }
    return function(e, a) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, a);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
    }
    return t;
}, _require = require("../scripts/banner"), maoyanBanner = _require.maoyanBanner, stats = require("../scripts/stats"), EMPTY = function() {}, app = getApp(), statsChannel = "rediantong", mge_bid = "b_xmm5sgjk", mpt_bid = "b_cy70t5em";

AdBanner.prototype = {
    _hidden: !1,
    get hidden() {
        return this._hidden;
    },
    set hidden(t) {
        this._hidden = t;
    },
    props: {
        val_cid: "c_hw1gt8n5"
    },
    hasReportedAds: [],
    data: {
        banner: null,
        current: 0
    },
    refresh: function() {
        var t = app.getPropSafely("$location.city.id", app, 1), e = {
            cityId: t,
            userId: (app.getUser() || {}).userId || "",
            params: this.params
        };
        this.fetch(e), this.render(e);
    },
    fetch: function(t) {
        var e = this, a = t.cityId, n = t.userId, i = t.params;
        return this.dataPromise = maoyanBanner(a, this.positionId, n, i).then(function(t) {
            return delete e.dataPromise, e.list = t, t;
        }).catch(function(t) {
            delete e.dataPromise;
        }), this.dataPromise;
    },
    render: function() {
        var t = this, e = void 0;
        this.initStats(), e = this.dataPromise ? this.dataPromise : this.list ? Promise.resolve(this.list) : this.fetch.apply(this, arguments), 
        e.then(function(e) {
            !wx.canIUse("web-view") && e && (e = e.filter(function(t) {
                return !/pages\/webview\/webview/.test(t.link);
            })), t.statsData = e.map(function(e) {
                return _extends({
                    positionId: t.positionId,
                    ad_id: e.adId,
                    materialId: e.materialId
                }, t.params);
            }), t.setData({
                banner: e,
                isDisplayDots: e.length > 1
            }, function() {
                t.firstShow = !0, t.onPageScroll();
            });
        });
    },
    initStats: function() {
        this.hasReportedAds = [], stats({
            channel: statsChannel,
            appnm: app.lxAppname || app.appName,
            noPending: !0,
            uid: function() {
                return app.$user.userId;
            }
        })(this.props);
    },
    onTapAdBanner: function(t) {
        var e = t.currentTarget.dataset, a = e.url, n = e.idx;
        if (a) {
            var i = a.match(/\/(wx\w{16})\/([\w\W]*$)/);
            i && i.length >= 3 ? wx.navigateToMiniProgram({
                appId: i[1],
                path: i[2],
                envVersion: "trail"
            }) : app.goto(a), this.statsData[n] && this.props.stats(mge_bid, this.statsData[n]);
        }
    },
    onBannerChagne: function(t) {
        this.hidden || this.hasReportedAds.indexOf(t) >= 0 || this.statsData[t] && (this.props.stats(mpt_bid, this.statsData[t]), 
        this.hasReportedAds.push(t));
    },
    onPageScroll: function() {
        var t = this, e = wx.createSelectorQuery();
        e.select(".ad-banner").boundingClientRect(), e.exec(function(e) {
            if (e && e[0]) {
                var a = wx.getSystemInfoSync().windowHeight, n = _slicedToArray(e, 1), i = n[0], r = i.bottom < 0, s = i.top > a;
                t.hidden = !(!r && !s), (t.firstShow || t.statsData && 1 === t.statsData.length) && (t.firstShow = !1, 
                t.onBannerChagne(0));
            }
        });
    },
    setData: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : EMPTY;
        this.data = _extends({}, this.data, t);
        var a = {};
        a[this.key] = this.data, this.page.setData(a, e);
    }
}, AdBanner.prototype.constructor = AdBanner, module.exports = AdBanner;