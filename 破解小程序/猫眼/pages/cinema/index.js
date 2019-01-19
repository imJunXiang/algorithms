var _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
    }
    return e;
}, app = getApp(), _require = require("./_cinema-item"), formatCinemas = _require.formatCinemas, searchBar = require("../search/_search-bar"), AdBanner = require("../../tpl/ad-banner"), selectBar = require("./_select-bar"), LocateBanner = require("../../tpl/locate-banner"), AccessLimit = require("../../tpl/access-limit");

app.MoviePage(_extends({}, searchBar, selectBar, {
    needCity: !0,
    data: _extends({}, searchBar.data, selectBar.data, {
        selectBarFixed: !1,
        searchBarFixed: !1,
        cinemas: {},
        paging: {
            hasMore: !0,
            limit: 12,
            offset: 0
        }
    }),
    getCinemas: function() {
        var e = this, t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        t || (this.data.paging.offset = 0);
        var a = app.$location, n = app.$user, i = _extends({
            cityId: a.city ? a.city.id : 1,
            limit: this.data.paging.limit,
            offset: this.data.paging.offset,
            channelId: app.channelId,
            userid: n.userId
        }, this.data.selectedItems);
        return a && a.longitude && (i.lng = a.longitude, i.lat = a.latitude), app.request().get("/hostproxy/mmcs/cinema/v1/select/cinemas.json").config("key", "cinemaslist").query(i).header({
            token: n.token,
            "x-host": "http://maoyanapi.vip.sankuai.com"
        }).end().then(function(e) {
            return e.body.data;
        }).then(function(a) {
            if (wx.stopPullDownRefresh(), a && a.cinemas) {
                var n = formatCinemas(a.cinemas);
                e.setData({
                    cinemas: t ? e.data.cinemas.concat(n) : n,
                    paging: a.paging
                }), e.data.paging.offset += e.data.paging.limit;
            } else e.setData({
                cinemas: [],
                paging: {
                    hasMore: !0,
                    limit: 12,
                    offset: 0
                }
            });
        }).catch(function(a) {
            var n = AccessLimit.getAttachFromError(a);
            if (n) return e.accessLimit.render(n), void e.accessLimit.show();
            e.handleError(a, t ? "" : "page");
        });
    },
    onReachBottom: function() {
        this.data.cinemas.length && this.getCinemas(!0), this.getSelectItems();
    },
    indexRedirect: function(e) {
        this.stats("b_j9ygxrr8");
        var t = this.options, a = t.redirect, n = t.widgetData, i = t.wxParamData, s = decodeURIComponent(a);
        if (n && i) {
            var r = "widgetData=" + n + "&wxParamData=" + i, o = /\S\?\S*=/, c = /\?/;
            s = a + (o.test(s) ? "&" : c.test(s) ? "" : "?") + r;
        }
        return wx.navigateTo({
            url: s
        });
    },
    onLoad: function(e) {
        var t = this;
        if (this.isLogin = !(!app.$user || !app.$user.token), wx.hideShareMenu && wx.hideShareMenu(), 
        this.initCity(e), this.adBanner = new AdBanner({
            page: this,
            positionIds: "1035"
        }), this.on("refreshCinemas", function() {
            t.getCinemas();
        }), this.locateBanner = new LocateBanner({
            page: this
        }), this.locateBanner.render(), this.accessLimit = new AccessLimit({
            page: this
        }), this.accessLimit.onConfirm = this.onPullDownRefresh.bind(this), this.accessLimit.hideOnBack = !0, 
        this.options.redirect) return this.indexRedirect(e);
    },
    bindEvent: function() {
        this.bindCityEvent(), app.models.location.on("locationChange", this.onPullDownRefresh);
    },
    offEvent: function() {
        this.offCityEvent(), app.models.location.off("locationChange", this.onPullDownRefresh);
    },
    onHide: function() {
        this.closeModal(), this.offEvent();
    },
    onShow: function() {
        var e = this.data.city || {}, t = app.$location.city;
        t ? wx.showShareMenu && wx.showShareMenu() : wx.hideShareMenu && wx.hideShareMenu(), 
        (!this.data.cinemas.length || e.id !== t.id || !this.isLogin && app.$user && app.$user.token) && (this.isLogin = !(!app.$user || !app.$user.token), 
        this.data.cinemas.length || this.loading(!0), this.onPullDownRefresh()), e.id !== t.id && this.resetSelectedItems();
        var a = {
            cityId: app.getPropSafely("$location.city.id", app, 1),
            userId: (app.getUser() || {}).userId || ""
        };
        this.adBanner.render(a), this.setCity(t), this.offEvent(), this.bindEvent();
    },
    onTapAdBanner: function(e) {
        this.adBanner.onTapAdBanner(e);
    },
    onBannerChagne: function(e) {
        this.adBanner.onBannerChagne(e.detail.current);
    },
    onPageScroll: function(e) {
        var t = e.scrollTop, a = this.data, n = a.searchBarFixed, i = a.selectBarFixed, s = a.AdBanner, r = s && s.banner && s.banner.length ? app.rpx2px(175) : 0;
        this.adBanner.onPageScroll(t), t > 0 ? !n && this.setData({
            searchBarFixed: !0
        }) : n && this.setData({
            searchBarFixed: !1
        }), t > r ? !i && this.setData({
            selectBarFixed: !0
        }) : i && this.setData({
            selectBarFixed: !1
        });
    },
    onPullDownRefresh: function(e) {
        var t = this;
        this.data.paging = {
            hasMore: !0,
            limit: 12,
            offset: 0
        }, app.checkLocationAuth({
            silence: !0
        }).then(function() {
            return !t.data.cinemas.length && app.models.location.fetch();
        }).catch(function() {
            wx.stopPullDownRefresh();
        }).then(function(e) {
            return app.$location.city && Promise.all([ t.getCinemas(), t.getSelectItems().catch(function() {}), t.adBanner.refresh() ]);
        }).catch(function(a) {
            if (!e && "networkError" === a.errType) return t.handleError(a, "page");
            t.data.cinemas && 0 !== t.data.cinemas.length ? t.handleError(a) : t.handleError(a, "page");
        }).then(function() {
            t.loading(!1);
        });
    },
    onShareAppMessage: function() {
        var e = app.$location.city, t = {
            cityId: e.id,
            cityName: e.nm
        };
        return {
            title: "快来看看附近的电影院",
            path: "pages/cinema/index?" + app.shareParams(_extends({}, this.options, t))
        };
    }
}));