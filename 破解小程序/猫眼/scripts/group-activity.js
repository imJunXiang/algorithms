function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e];
        for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (t[a] = i[a]);
    }
    return t;
}, _slicedToArray = function() {
    function t(t, e) {
        var i = [], a = !0, n = !1, u = void 0;
        try {
            for (var r, o = t[Symbol.iterator](); !(a = (r = o.next()).done) && (i.push(r.value), 
            !e || i.length !== e); a = !0) ;
        } catch (t) {
            n = !0, u = t;
        } finally {
            try {
                !a && o.return && o.return();
            } finally {
                if (n) throw u;
            }
        }
        return i;
    }
    return function(e, i) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), _countdown = require("./countdown"), _countdown2 = _interopRequireDefault(_countdown), _utils = require("./utils"), _utils2 = _interopRequireDefault(_utils), _groupActivity = require("../constant/group-activity"), _groupActivity2 = _interopRequireDefault(_groupActivity), _cookie = require("./cookie"), _cookie2 = _interopRequireDefault(_cookie), app = getApp(), domain = _groupActivity2.default.DOMAIN, u = function(t) {
    return domain + t;
}, gaHelper = {
    rSuccess: function(t) {
        return t && t.body && "successfully" === t.body.msg;
    },
    fetchActivity: function(t) {
        var e = this;
        return app.request().config("loading", !1).get(u("/activity/info")).header({
            TOKEN: app.$user ? app.$user.token : "",
            uuid: app.$uuid
        }).query({
            activity_id: t
        }).end().then(function(t) {
            return _cookie2.default.setParam(_groupActivity2.default.COOKIE.RISK, t.header["Set-Cookie"]), 
            e.rSuccess(t) ? t.body.data : {};
        }).catch(function(t) {
            return null;
        });
    },
    pay: function(t, e, i, a, n) {
        var u = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "0.01", r = t.notAutoCloseLoading || t.loading;
        r(!0), app.riskWrapper(function(t) {
            var o = _slicedToArray(t, 3), c = o[0], s = o[1], p = o[2];
            s.wechatFingerprint = p, s.uuid = app.$uuid;
            var d = {
                dealList: [ {
                    dealId: e || 100116061,
                    quantity: 1,
                    promotionId: 0
                } ],
                payMoney: u || "0.01",
                openid: app.$user.openId,
                channelId: app.channelId,
                clientType: app.clientType,
                uuid: app.$uuid,
                payChannel: 3,
                version_name: app.config.version,
                ci: app.$location.city ? app.$location.city.id : void 0,
                wxAppId: app.appId,
                bizInfo: JSON.stringify(i),
                deviceInfoByQQ: s
            };
            app.$user.mobile && (d.userPhone = app.$user.mobile), app.request().post("/hostproxy/trade/submitSellOrder.json").header("content-type", "application/x-www-form-urlencoded").header("x-host", "http://maoyanapi.vip.sankuai.com").header({
                token: app.$user.token,
                openId: app.$user.openId,
                CODE: c.code,
                uuid: app.$uuid,
                cookie: _cookie2.default.getParam(_groupActivity2.default.COOKIE.RISK)
            }).query({
                userid: app.$user.userId,
                client: "iphone"
            }).send(d).end().then(function(t) {
                r(!1);
                var e = {};
                t && t.body && t.body.success ? (e = _extends({}, JSON.parse(t.body.data.url), {
                    success: function(e) {
                        console.log("success payment:", e), a && a(t.body.data.disOrderId, e, JSON.parse(_utils2.default.safeGet(t, "body.data.bizData", {})));
                    }
                }), wx.requestPayment(e)) : n(t);
            }).catch(function(t) {
                r(!1), console.log(t);
            });
        }).catch(function(t) {
            r(!1), console.log(t);
        });
    },
    fetchActivityList: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 10;
        return app.request().get(u("/activity/list")).header({
            uuid: app.$uuid
        }).query({
            page: e,
            pagesize: i,
            city_id: app.$location.city ? app.$location.city.id : void 0
        }).end().then(function(e) {
            return t.rSuccess(e) ? e.body.data : null;
        }).catch(function(t) {
            throw t;
        });
    },
    fetchPrizeList: function(t) {
        var e = this;
        return app.request().get(u("/activity/activityprizelist")).header({
            uuid: app.$uuid
        }).query({
            activity_id: t
        }).end().then(function(t) {
            return e.rSuccess(t) ? t.body.data : null;
        }).catch(function(t) {
            throw t;
        });
    },
    checkDealStatus: function(t, e) {
        return function t(i) {
            app.request().get(u("/order/payResult")).header({
                uuid: app.$uuid,
                channelId: app.channelId
            }).query({
                order_id: i,
                channelId: app.channelId
            }).end().then(function(a) {
                if (console.log(a.body), a && a.body && a.body.data && 5 != a.body.data.pay_status) {
                    if (e) {
                        var n = _utils2.default.safeGet(a, "body.data.pay_status", 5);
                        e(n, _groupActivity2.default.GA_PAY_RESULTS[n]);
                    }
                    return !0;
                }
                a && a.body && a.body.data && 5 == a.body.data.pay_status && setTimeout(t.bind(null, i), 500);
            }).catch(function(t) {
                return !1;
            });
        }(t);
    },
    fetchBanner: function() {
        var t = this;
        return app.request().get(u("/advert/banner")).header({
            uuid: app.$uuid
        }).end().then(function(e) {
            return t.rSuccess(e) ? e.body.data : [];
        }).catch(function(t) {
            throw t;
        });
    },
    fetchBroadcast: function() {
        var t = this;
        return app.request().get(u("/activity/broadcast")).header({
            uuid: app.$uuid
        }).end().then(function(e) {
            return t.rSuccess(e) ? e.body.data : [];
        }).catch(function(t) {
            throw t;
        });
    },
    fetchMyCounter: function() {
        var t = this;
        return app.request().config("loading", !1).get(u("/group/counter")).header({
            TOKEN: app.$user ? app.$user.token : "",
            uuid: app.$uuid
        }).end().then(function(e) {
            return t.rSuccess(e) ? e.body.data : [];
        }).catch(function(t) {
            throw t;
        });
    },
    fetchMyList: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        return app.request().get(u("/group/list")).header({
            TOKEN: app.$user ? app.$user.token : "",
            uuid: app.$uuid
        }).query({
            page: e,
            status: i
        }).end().then(function(e) {
            return t.rSuccess(e) ? e.body.data : [];
        }).catch(function(t) {
            throw t;
        });
    },
    shapeActivity: function(t) {
        switch (t.countDownTip = "后开奖", t.status) {
          case _groupActivity2.default.GA_STATUS.PRE:
            t.buyBtnClass = "buy-pre", t.buyBtnText = "即将开团", t.countDownTip = "后开抢";
            break;

          case _groupActivity2.default.GA_STATUS.ON_GOING:
            t.buyBtnClass = "", t.buyBtnText = t.price || "0.01元抢";
            break;

          case _groupActivity2.default.GA_STATUS.END:
            t.buyBtnClass = "buy-end", t.buyBtnText = "已抢光";
            break;

          case _groupActivity2.default.GA_STATUS.DEPRECATED:
        }
        if (t.status == _groupActivity2.default.GA_STATUS.PRE ? t.countdownTime = 1e3 * t.start_time - new Date().getTime() : t.countdownTime = 1e3 * t.next_open_prize_time - new Date().getTime(), 
        t.user_num > _groupActivity2.default.GA_TIP_USER_NUM ? t.descTip = "HOT" : t.first_prize_stock <= _groupActivity2.default.GA_TIP_PRIZE_STOCK && 0 != t.first_prize_stock ? t.descTip = "限量" : new Date().getTime() - Number(1e3 * t.start_time) < _groupActivity2.default.GA_TIP_NEW_DATE && new Date().getTime() - Number(1e3 * t.start_time) > 0 ? t.descTip = "NEW" : new Date().getTime() - 1e3 * t.start_time < 0 ? t.descTip = "预热" : t.descTip = "抢", 
        t.user_num_tip = t.user_num, t.user_num >= _groupActivity2.default.GA_STD_USER_NUM) {
            var e = function(t, e) {
                return Math.floor(t / e);
            };
            t.user_num_tip = "" + e(t.user_num, 1e4), 0 != Math.round(e(t.user_num % 1e4, 1e3)) ? t.user_num_tip = t.user_num_tip + "." + Math.round(e(t.user_num % 1e4, 1e3)) + "万" : t.user_num_tip = t.user_num_tip + "万";
        }
        return t.prize_price_tip = this.getPrice(t.prize_price), t;
    },
    shapeActivityList: function(t) {
        var e = this;
        return console.log(t), t.map(function(t) {
            return e.shapeActivity(t);
        });
    },
    toast: function(t) {
        t.hide ? wx.hideToast() : wx.showToast(_extends({
            mask: !0,
            duration: 2e3,
            icon: "loading",
            title: "数据加载中..."
        }, t));
    },
    getAwardText: function(t) {
        var e = _utils2.default.safeGet(t, "code_status", 1), i = "立即使用";
        switch (e) {
          case 2:
            break;

          case 1:
            t.itemBtnClass = "grey", i = "待发送";
            break;

          case 3:
            t.itemBtnClass = "grey", i = "已使用";
        }
        return i;
    },
    GAPstatus: function(t, e, i, a) {
        return a.itemTip = "", 2 == t && 1 == e ? (a.itemTip = "未成团", a.itemBtn = "邀请好友", 
        a.itemStauts = "差" + (a.group_user_num - a.current_user_num) + "人成团") : 2 != t || 2 != e && 3 != e ? 4 == t && 1 == e && 1 == i ? (a.itemTip = "待开奖", 
        a.itemTipClass = "yellow", a.itemStauts = "共" + a.open_prize_num + "次开奖机会", a.itemBtnClass = "hide") : 4 == t && 1 == e && 2 == i ? (a.itemTip = "已中奖", 
        a.itemStauts = "", 3 != a.prize_type && (a.itemBtn = this.getAwardText(a))) : 4 == t && 1 == e && 4 == i ? (a.itemTip = "待开奖", 
        a.itemTipClass = "yellow", a.itemStauts = "已开奖" + (a.open_prize_num - a.remain_prize_num) + "次，还可开奖" + a.remain_prize_num + "次", 
        a.itemBtnClass = "hide") : 4 != t || 2 != e && 3 != e || 2 != i ? 4 != t || 2 != e && 3 != e || 3 != i ? 5 == t && 1 == e ? (a.itemTip = "拼团失败", 
        a.itemTipClass = "grey", a.itemStauts = "拼团超时", a.itemBtn = "再拼一次", a.itemBtnClass = "again", 
        a.countDownClass = "hide") : 5 != t || 2 != e && 3 != e ? (a.itemBtnClass = "hide", 
        a.countDownClass = "hide") : (a.itemTip = "拼团失败", a.itemTipClass = "grey", a.itemStauts = "活动结束", 
        a.itemBtnClass = "hide", a.countDownClass = "hide") : (a.itemTip = "未中奖", a.itemTipClass = "grey", 
        a.itemStauts = "", a.itemBtn = this.getAwardText(a)) : (a.itemTip = "已中奖", a.itemStauts = "", 
        3 != a.prize_type && (a.itemBtn = this.getAwardText(a))) : (a.itemTip = "未成团", a.itemStauts = "拼团超时", 
        a.itemBtnClass = "hide", a.countDownClass = "hide"), a;
    },
    getPrice: function(t) {
        var e = "", i = Math.floor(t / 100), a = t % 100;
        if (i >= 1e4) {
            var n = function(t, e) {
                return Math.floor(t / e);
            };
            return e = "" + n(i, 1e4), 0 == Math.round(n(i % 1e4, 1e3)) ? e += "万" : e += "." + Math.round(n(i % 1e4, 1e3)) + "万", 
            e;
        }
        return a ? i + "." + a : "" + i;
    },
    _mockActivityList: function() {
        return [ {
            name: "0元抽奖0元抽奖0元抽奖0元抽奖0元抽奖0元抽奖",
            activity_pic: "http://p1.meituan.net/movie/2d8ca537a7a4370007caf7fa0f43c76f470225.png@750w_1l",
            activity_id: 123,
            user_num: 434,
            status: 0,
            open_prize_time: 1e3
        }, {
            name: "0元抽奖0元抽奖0元抽奖",
            activity_pic: "http://p1.meituan.net/movie/2d8ca537a7a4370007caf7fa0f43c76f470225.png@750w_1l",
            activity_id: 123,
            user_num: 434,
            status: 1,
            open_prize_time: 1e3
        }, {
            name: "0元抽奖0元抽奖0元抽奖",
            activity_pic: "http://p1.meituan.net/movie/2d8ca537a7a4370007caf7fa0f43c76f470225.png@750w_1l",
            activity_id: 123,
            user_num: 434,
            status: 2,
            open_prize_time: 1e3
        }, {
            name: "0元抽奖0元抽奖0元抽奖",
            activity_pic: "http://p1.meituan.net/movie/2d8ca537a7a4370007caf7fa0f43c76f470225.png@750w_1l",
            activity_id: 123,
            user_num: 434,
            status: 3,
            open_prize_time: 1e3
        } ];
    },
    _mockActivity: function() {
        return {
            name: "0元抽奖0元抽奖0元抽奖0元抽奖0元抽奖0元抽奖",
            activity_pic: "http://p1.meituan.net/movie/2d8ca537a7a4370007caf7fa0f43c76f470225.png@750w_1l",
            activity_id: 123,
            user_num: 434,
            status: 1,
            open_prize_time: 1e3,
            pay_price: 687,
            group_user_num: 5,
            open_prize_type: GA_AWARD_TYPE.CAPTAIN,
            prize_user_count: 99,
            prize_user_list: [ {
                user_pic: "https://img.meituan.net/avatar/afe973abd636be0526ac6b7b7adc25b656340.jpg",
                username: "用户昵称用户昵称用户昵称用户昵1称"
            }, {
                user_pic: "https://img.meituan.net/avatar/afe973abd636be0526ac6b7b7adc25b656340.jpg",
                username: "用户昵称2"
            }, {
                user_pic: "https://img.meituan.net/avatar/afe973abd636be0526ac6b7b7adc25b656340.jpg",
                username: "用户昵称3"
            }, {
                user_pic: "https://img.meituan.net/avatar/afe973abd636be0526ac6b7b7adc25b656340.jpg",
                username: "用户昵称4"
            } ]
        };
    }
};

module.exports = gaHelper;