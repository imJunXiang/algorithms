var Tpl = require("../scripts/tpl"), app = getApp(), prefix = "https://api.maoyan.com", cardTimeInterval = null, getMS = function(e) {
    return {
        minutes: Math.floor(e / 60 % 60),
        second: Math.floor(e % 60)
    };
};

module.exports = Tpl.extends({
    key: "MovieRemindCard",
    hasPlay: !1,
    data: {
        isShow: !1,
        time: {
            minutes: "--",
            second: "--"
        }
    },
    bindEvent: function() {
        this.page.hideCardModal = this.hideCardModal.bind(this), this.page.gotoDealCenter = this.gotoDealCenter.bind(this), 
        this.page.goMovieRemindModal = this.goMovieRemindModal.bind(this);
    },
    init: function() {
        var e = this;
        this.setData({
            time: {
                minutes: "--",
                second: "--"
            }
        });
        var t = app.models.location.get();
        t && t.longitude && t.latitude ? this.fetchData(t) : app.models.location.on("geo-location", function(t) {
            e.fetchData(t);
        });
    },
    fetchData: function(e) {
        var t = this, a = e.longitude, i = e.latitude;
        app.request().get("/intelligent/getticket.json").query({
            latitude: i,
            longitude: a,
            version: "1.0"
        }).host("api").header({
            token: app.$user.token,
            uuid: app.$uuid,
            "content-type": "application/json"
        }).end().then(function(e) {
            return e.body.data;
        }).then(function(e) {
            if (!e || e.showTime <= -18e5) return t.hideCardModal();
            t.setData({
                movieName: e.movieName,
                screenName: e.screenName,
                cinemaName: e.cinemaName,
                cinemaId: e.cinemaId,
                seats: e.seats.join(" | "),
                hasSale: e.hasSale,
                minSalePrice: e.minSalePrice,
                picUrl: app.img(e.picUrl, 104, 147)
            }), t.startCountDown(e.showTime), t.show(), !e.hasPoppedUp && t.page.movieRemindModal && t.page.movieRemindModal.init && t.page.movieRemindModal.init(), 
            t.page.stats("b_jty5ihq6", {
                cinemaId: e.cinemaId
            }), t.page.stats("b_ptr626ah", {
                cinemaId: e.cinemaId
            }), 0 === e.hasSale && t.page.stats("b_96pz3wmt", {
                cinemaId: e.cinemaId
            });
        }).catch(function(e) {});
    },
    startCountDown: function(e) {
        var t = this;
        cardTimeInterval && this.clearAllInterval();
        var a = Math.floor((e + 18e5) / 1e3), i = !1;
        cardTimeInterval = setInterval(function() {
            0 === a && t.hideCardModal();
            var e = getMS(a), n = {
                minutes: e.minutes,
                second: e.second
            };
            n.minutes -= 30, n.minutes < 0 && (i = !0, n.minutes = Math.abs(0 === n.second ? n.minutes : n.minutes + 1), 
            n.second = 0 === n.second ? 0 : 60 - n.second), t.setData({
                hasPlay: i,
                time: {
                    minutes: n.minutes < 10 ? "0" + n.minutes : n.minutes,
                    second: n.second < 10 ? "0" + n.second : n.second
                }
            }), a -= 1;
        }, 1e3);
    },
    clearAllInterval: function() {
        null !== cardTimeInterval && (clearInterval(cardTimeInterval), cardTimeInterval = null);
    },
    show: function() {
        this.setData({
            isShow: !0
        });
    },
    hideCardModal: function() {
        this.clearAllInterval(), this.setData({
            isShow: !1
        });
    },
    goMovieRemindModal: function(e) {
        var t = e.currentTarget.dataset, a = t.valLab, i = t.valBid;
        this.page.stats(i, a), this.page.movieRemindModal && this.page.movieRemindModal.init && this.page.movieRemindModal.init();
    },
    gotoDealCenter: function(e) {
        var t = e.currentTarget.dataset, a = t.valLab, i = t.valBid;
        this.page.stats(i, a), app.goto("/pages/dealsub/deal-center?cinemaId=" + this.data.cinemaId);
    }
});