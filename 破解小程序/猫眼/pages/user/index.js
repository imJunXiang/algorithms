var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (t[i] = a[i]);
    }
    return t;
}, _api = require("../../scripts/activity/api"), Sudoku = require("../../tpl/operation/embedded-component/sudoku"), app = getApp(), store = require("../../scripts/store"), apiConfig = require("../../scripts/api-config"), advertHandler = require("../../scripts/advert"), _require = require("../../scripts/papay"), _queryPapay = _require.queryPapay, util = require("../../scripts/utils"), loginScript = require("../../scripts/login"), favouriteAPI = require("../../scripts/favourite"), MYT = require("../../constant/myt"), mge_bid = MYT.mge_bid, mpt_bid = MYT.mpt_bid;

app.MoviePage({
    data: {
        isSupervip: !0,
        haveAppliedPapay: !1,
        toEmanWithAPI: !1,
        emanAppId: "wx28d3fabd22c59503",
        enVersion: "release",
        emanInfo: "",
        isPrivilegeView: 1,
        nickWidth: 374,
        showGuid: !1,
        isfirstLogin: !1,
        animationClass: "",
        actClass: "",
        hasMore: !1
    },
    onLoad: function() {
        this.setData({
            toEmanWithAPI: this.canUseNavAPI()
        }), this.sudoku = new Sudoku({
            page: this
        });
    },
    gotoActivityList: function() {
        _api.activityGoto.gotoActivityList();
    },
    activityItemTap: function(t) {
        var e = t.currentTarget.dataset.position, a = this.data.activity, i = a[e];
        i && _api.activityGoto.gotoActivity(i);
    },
    onShow: function() {
        var t = this;
        _api.activityApi.getUserActivity().then(function(e) {
            var a = e.data, i = a.activitys, s = a.hasMore;
            if (i) {
                var n = i.length;
                return t.setData({
                    activity: i,
                    actClass: s ? "act6" : "act" + n,
                    hasMore: s
                }), e;
            }
        }), this.nickWidth = 374, this.isWidthend = !1, new Date(2018, 7, 1, 0, 0, 0).getTime() - new Date().getTime() <= 0 && new Date(2018, 8, 1, 0, 0, 0).getTime() - new Date().getTime() > 0 ? this.emanInfo = "8.18元限量包邮" : new Date(2018, 8, 1, 0, 0, 0).getTime() - new Date().getTime() <= 0 && new Date(2018, 9, 1, 0, 0, 0).getTime() - new Date().getTime() > 0 ? this.emanInfo = "超值秒杀，1折起" : this.emanInfo = "", 
        this.setData({
            debug: app.$debug,
            emanInfo: this.emanInfo,
            isPrivilegeView: store.get("isPrivilegeView")
        }), MYT.initStats(app), advertHandler.fetch({
            positionIds: 1078
        }, function(e) {
            e.length && (MYT.props.stats(mpt_bid, {
                positionId: 1078,
                ad_id: e[0].adId,
                materialId: e[0].materialId
            }), t.setData({
                adsHeaderBg: e
            }));
        }), advertHandler.fetch({
            positionIds: 1057
        }, function(e) {
            e.length && (MYT.props.stats(mpt_bid, {
                positionId: 1057,
                ad_id: e[0].adId,
                materialId: e[0].materialId
            }), t.setData({
                advert: e
            }));
        }), app.$user.token ? this.loginAfter() : app.checkLogin({
            success: function() {
                t.loginAfter(), store.set("firstLoginDate", new Date().toLocaleDateString()), t.setData({
                    isfirstLogin: !0
                }), setTimeout(function() {
                    t.setData({
                        isfirstLogin: !1
                    });
                }, 2e3);
            }
        });
    },
    onHide: function() {
        app.papayStatusChange = !1, clearTimeout(this.timeout);
    },
    onUnload: function() {
        app.papayStatusChange = !1, clearTimeout(this.timeout);
    },
    onTapAd: function(t) {
        MYT.props.stats(mge_bid, {
            positionId: 1057,
            ad_id: this.data.advert[0].adId,
            materialId: this.data.advert[0].materialId
        }), this.onTapNavi(t);
    },
    loginAfter: function() {
        var t = this, e = app.getUser().wxUserInfo.userInfo;
        this.setData({
            userInfo: e
        }), loginScript.getUserExp(function(e) {
            var a = _extends({}, e);
            0 == a.userLevel && (t.nickWidth += 67, 0 == t.isWidthend ? t.isWidthend = !0 : a.nickWidth = t.nickWidth), 
            a.isSysshow = !0, t.setData(a);
        }), this.queryPapay(), this.getUserCardStatus();
        var a = app.$location.city ? app.$location.city.id : 1;
        app.request().get("/hostproxy/emember/v2/profile.json").query({
            cityId: a
        }).header({
            token: app.$user.token,
            "x-host": "http://maoyanapi.vip.sankuai.com"
        }).end().then(function(e) {
            t.setData({
                display: e.body.data.display,
                cityId: a
            }), loginScript.openId().then(function() {
                t.getOperationPositions(e.body.data.display);
            });
        }), this.favourite();
    },
    getUserCardStatus: function() {
        var t = this, e = app.$location.city ? app.$location.city.id : 1;
        app.request().get("/proxy/citycard/client/usercenter/usercardstatus.json").query({
            cityId: e,
            channelId: app.channelId
        }).header({
            "x-host": "http://maoyanapi.vip.sankuai.com",
            "content-type": "application/x-www-form-urlencoded",
            token: app.$user.token,
            "x-ba": 1
        }).end().then(function(e) {
            if (200 === e.statusCode && e.body.success) {
                var a = e.body.data, i = a.listCardShow ? "/pages/supervip/list" : "/pages/supervip/detail?cityCardId=" + a.cityCardId;
                t.setData({
                    userCardStatus: a,
                    cityCardUrl: i
                });
            }
        });
    },
    queryPapay: function() {
        var t = this, e = 3;
        !function a() {
            _queryPapay().then(function(i) {
                var s = i.data, n = i.errMsg;
                if (clearTimeout(t.timeout), n) return t.toast(n);
                app.papayStatusChange && e-- > 0 && (t.timeout = setTimeout(a, 2e3)), t.setData({
                    haveAppliedPapay: "SUCCESS" === s.result
                });
            }).catch(function(e) {
                return t.handlerError(e);
            });
        }();
    },
    navToEman: function(t) {
        var e = this, a = app.getPropSafely("currentTarget.dataset.url", t, "/pages/home/home"), i = app.getPropSafely("currentTarget.dataset.nav", t, null);
        wx.navigateToMiniProgram({
            appId: this.data.emanAppId,
            path: a,
            envVersion: this.data.enVersion,
            success: function(t) {
                i && e.stats(i);
            }
        });
    },
    canUseNavAPI: function() {
        var t = app.system().SDKVersion || "2.0.7";
        return util.compareVersion(t, "2.0.6") < 1;
    },
    onPrivilegeTap: function(t) {
        store.set("isPrivilegeView", "1"), this.onTapNavi(t);
    },
    favourite: function() {
        var t = app.get("favourite") || 0;
        [ "1103", "1104" ].indexOf(app.scene) > -1 || 0 !== t ? this.setData({
            showGuid: !1
        }) : (app.set("favourite", 1), this.setData({
            showGuid: !0
        }), this.stats("b_577obuxu"));
    }
});