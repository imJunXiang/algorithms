var app = getApp(), PROD = !0, user = require("../../scripts/user"), _app$require = app.require("scripts/movie"), hotV3 = _app$require.hotV3, MobileInput = require("../../tpl/mobile-input"), stats = require("../../scripts/stats"), share = require("../../scripts/share");

app.MoviePage({
    data: {
        bonusId: void 0,
        bonusCode: void 0,
        resultDetail: void 0,
        showDraw: void 0,
        hotMovielist: void 0,
        cityName: null,
        title: "",
        backgroundStyle: 'background-image:url("http://p1.meituan.net/mmdb/4a4b16db66367cae1f57c316f6034499104948.png");background-color:#FACA7D;color:#9F7C42;',
        titleStyle: "color:#F93E39;",
        leftIcon: 'background-image:url("http://p0.meituan.net/mmdb/a0f5af97b9631aaf16fb28483d4a81941232.png")',
        rightIcon: 'background-image:url("http://p0.meituan.net/mmdb/3cfbacfb7995a49585a1683210c3ace71231.png")',
        deviderColor: "border-clor:rgba(159,124,66, 0.29);"
    },
    val_cid: "c_wsr0i2qz",
    onLoad: function(t) {
        var e = this;
        this.mobileInput = new MobileInput({
            page: this
        });
        var o = t.bonusId, a = t.bonusCode, n = t.title;
        this.setData({
            bonusId: o,
            bonusCode: a,
            title: n
        }), app.updateCode(), app.$user.token ? this.loginAfter() : (this.setData({
            showDraw: !app.$user.mobile
        }), app.checkLogin({
            success: function() {
                e.loginAfter();
            }
        }));
    },
    onShareAppMessage: function() {
        this.stats("b_uwo0h0um");
        var t = this.data, e = t.bonusId, o = t.bonusCode, a = t.title, n = app.getPropSafely("data.resultDetail.themeInfo.shareImg", this, "");
        return share.call(this, {
            bonusId: e,
            bonusCode: o,
            title: a,
            totalStats: "b_n558kle1",
            groupStats: "b_t55yumak",
            PROD: PROD,
            imageUrl: n
        });
    },
    loginAfter: function() {
        this.setData({
            showDraw: !app.$user.mobile
        }), app.$user.mobile && this.drawBonusRequestWithLocation();
    },
    drawBonus: function(t) {
        var e = this;
        if (!app.$user.mobile) {
            var o = function(t) {
                t ? (app.setMobile(t), app.request().post("/user/mobile").header({
                    token: app.$user && app.$user.token
                }).send({
                    mobile: t,
                    type: 1
                }).end().then(function(t) {
                    e.drawBonusRequestWithLocation();
                }).catch(function(t) {
                    e.drawBonusRequestWithLocation();
                })) : e.drawBonusRequestWithLocation();
            };
            user.getPhoneNumber(t, o.bind(this));
        }
    },
    drawBonusRequestWithLocation: function() {
        var t = this;
        app.$location.locationCity ? this.drawBonusRequest(app.$location) : app.checkLocationAuth().then(function() {
            app.models.location.fetch(!0).then(function(e) {
                app.getPropSafely("$location.city", app, null) || app.models.location.changeCity(e.locationCity), 
                t.drawBonusRequest(app.models.location._data);
            }).catch(function(e) {
                console.log(e), t.drawBonusRequest();
            });
        }).catch(function(e) {
            console.log(e), t.drawBonusRequest();
        });
    },
    drawBonusRequest: function(t) {
        var e = this;
        wx.setNavigationBarTitle({
            title: "猫眼电影分享红包"
        }), this.setData({
            showDraw: !1
        });
        var o = app.$user, a = o.token, n = o.wxUserInfo, i = o.userName, r = n && n.userInfo, s = {
            bonusId: this.data.bonusId,
            bonusCode: this.data.bonusCode,
            nickName: r && r.nickName ? r.nickName : i,
            avatarUrl: r && r.avatarUrl,
            channel: app.channelId
        }, u = app.getPropSafely("locationCity.id", t, null), p = app.getPropSafely("locationCity.nm", t, null);
        u && (s.ci = u), app.request().post("/proxy/market/share/bonus/draw.json").header({
            token: a,
            "x-host": "http://maoyanapi.vip.sankuai.com"
        }).send(s).end().then(function(t) {
            if (t && t.body) if (t.body.success) {
                var o = t.body.data;
                if (o && 2 == o.drawStatus && hotV3(1).then(function(t) {
                    var o = t.hot;
                    o && o.length > 3 && (o = o.slice(0, 3)), e.setData({
                        hotMovielist: o
                    });
                }), o && o.couponCellList.length) {
                    var a = [], n = [];
                    o.couponCellList.forEach(function(t, e) {
                        t.couponList && t.couponList.length && t.couponList.forEach(function(t) {
                            switch (t.value /= 100, e) {
                              case 0:
                                a.push(t);
                                break;

                              case 1:
                                n.push(t);
                            }
                        });
                    }), o.bonusCouponList = a, o.cityCouponList = n;
                }
                o && o.bonusDrawList && (o.bonusDrawList = o.bonusDrawList.map(function(t) {
                    return 1 === t.valueType && t.value && (t.value % 100 == 0 ? t.value = t.value / 100 : t.value % 10 == 0 ? t.value = (t.value / 100).toFixed(1) : t.value = (t.value / 100).toFixed(2)), 
                    t;
                })), o && 1 == o.drawStatus && e.stats("b_7enb41uq"), o && 1 == o.drawStatus && o.notice && e.toast(o.notice);
                var i = "background-image:url(" + app.getPropSafely("themeInfo.resultImg", o, '"http://p1.meituan.net/mmdb/4a4b16db66367cae1f57c316f6034499104948.png"') + ");background-color:" + app.getPropSafely("themeInfo.resultBackground", o, "#FACA7D") + ";color:" + app.getPropSafely("themeInfo.resultFontColor", o, "#9F7C42") + ";", r = "color:" + app.getPropSafely("themeInfo.resultTitleColor", o, "#F93E39;"), s = "background-image:url(" + app.getPropSafely("themeInfo.leftIcon", o, '"http://p0.meituan.net/mmdb/a0f5af97b9631aaf16fb28483d4a81941232.png"'), u = "background-image:url(" + app.getPropSafely("themeInfo.rightIcon", o, '"http://p0.meituan.net/mmdb/3cfbacfb7995a49585a1683210c3ace71231.png"'), l = "border-bottom-color:" + app.getPropSafely("themeInfo.deviderColor", o, "rgba(159,124,66, 0.29)");
                e.setData({
                    resultDetail: o,
                    backgroundStyle: i,
                    titleStyle: r,
                    leftIcon: s,
                    rightIcon: u,
                    deviderColor: l,
                    cityName: p
                }), wx.showShareMenu({
                    withShareTicket: !0
                }), e.stats("b_pgrd8c4k");
            } else e.handleError(t.body.errMsg);
        }).catch(function(t) {
            e.data.resultDetail ? e.handleError(t) : e.handleError(t, "page");
        });
    },
    moreMovie: function() {
        wx.switchTab({
            url: "/pages/movie/index"
        });
    },
    gotoUse: function() {
        wx.switchTab({
            url: "/pages/movie/index"
        });
    },
    goMovieDetail: function(t) {
        app.goto("/pages/movie/movie?movieId=" + t.currentTarget.dataset.movieid);
    },
    collectFormId: function(t) {
        app.collectFormId(t.detail.formId);
    }
});