var app = getApp(), Date2 = app.require("scripts/date2"), newPointCardNo = "";

app.MoviePage({
    data: {
        cardNo: void 0,
        cards: void 0,
        activeTab: "point",
        bonuslist: void 0,
        getBonusList: !1,
        bnsId: 0,
        lastPage: !0
    },
    onLoad: function(t) {
        this.getMyCards();
    },
    onPullDownRefresh: function() {
        "point" === this.data.activeTab ? this.getMyCards(!0) : this.getBonus(!0);
    },
    bindInput: function(t) {
        this.setData({
            cardNo: t.detail.value
        });
    },
    addCard: function() {
        var t = this, a = app.$user;
        if (!this.data.cardNo) return void this.toast("请输入观影卡密码");
        app.request().get("/proxy/coupon/pointcard/queryAndBind.json").query({
            channelId: app.channelId,
            clientType: "touch",
            type: 1,
            pointCardCode: this.data.cardNo,
            uuid: app.$uuid || a.openId
        }).header({
            token: a.token,
            "x-ta": "true",
            "x-host": "http://maoyanapi.vip.sankuai.com"
        }).end().then(function(a) {
            if (200 === a.statusCode && a.body.success) {
                var n = a.body.data;
                n.pointDesc = n.pointDesc.split(/[\{\}]/gi), t.toast("绑卡成功！"), t.data.cards.unshift(n), 
                t.setData({
                    cards: t.data.cards
                });
            }
        }).catch(function(a) {
            t.data.cards ? t.handleError(a) : t.handleError(a, "page");
        });
    },
    getMyCards: function(t) {
        var a = this, n = app.$user;
        t || this.loading(!0), app.request().get("/proxy/coupon/pointcard/list.json").query({
            token: n.token,
            channelId: 70001
        }).header({
            token: n.token,
            "x-ta": "true",
            "x-host": "http://maoyanapi.vip.sankuai.com"
        }).end().then(function(t) {
            if (200 === t.statusCode && t.body.success) {
                var n = t.body.data.cardList;
                n = n.map(function(t) {
                    return t.pointDesc = t.pointDesc.split(/[\{\}]/gi), t;
                }), a.loading(!1), a.setData({
                    cards: n
                });
            }
        }).catch(function(t) {
            a.data.cards ? a.handleError(t) : a.handleError(t, "page");
        });
    },
    switchToPoint: function() {
        this.setData({
            activeTab: "point"
        });
    },
    switchToBonus: function() {
        this.data.getBonusList || (this.getBonus(), this.setData({
            getBonusList: !0
        })), this.setData({
            activeTab: "bonus"
        });
    },
    onReachBottom: function() {
        "bonus" !== this.data.activeTab || this.data.lastPage || this.getBonus();
    },
    getBonus: function(t) {
        var a = this;
        t && this.setData({
            bnsId: 0,
            bonuslist: [],
            lastPage: void 0
        }), app.request().get("/proxy/coupon/mybonus/list.json").query({
            clientType: app.clientType,
            channelId: app.channelId,
            bnsId: this.data.bnsId,
            pageSize: 50
        }).header({
            token: app.$user.token,
            "x-ta": !0,
            "x-host": "http://maoyanapi.vip.sankuai.com"
        }).end().then(function(t) {
            if (t && t.body && t.body.success) {
                var n = t.body.data.bonus;
                n = n.map(function(t) {
                    return t.nameNum = t.name.match(/(\d+)/g)[0], t.dueTm = new Date2(t.dueTm).toString("yyyy-MM-dd"), 
                    t.limit = t.limitMovies && t.limitMovies[0] ? "仅限购买" + t.limitMovies[0].movieName + "使用" : "全部影片通用", 
                    t;
                }), a.setData({
                    bonuslist: a.data.bonuslist ? a.data.bonuslist.concat(n) : n,
                    lastPage: t.body.data.lastPage,
                    bnsId: t.body.data.bnsId
                });
            }
        }).catch(function(t) {
            a.data.bonuslist ? a.handleError(t) : a.handleError(t, "page");
        });
    },
    gotoUse: function(t) {
        var a = t.currentTarget.dataset.movieid;
        a ? app.goto("/pages/cinema/movie?movieId=" + a) : wx.switchTab({
            url: "/pages/movie/index"
        });
    }
});