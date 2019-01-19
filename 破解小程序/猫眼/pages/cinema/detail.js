var app = getApp();

app.MoviePage({
    data: {
        cinema: {}
    },
    onLoad: function(a) {
        this.getCinema(a.cinemaId);
    },
    getCinema: function(a) {
        var e = this, t = app.$user;
        this.loading(!0), app.request().get("/hostproxy/mmcs/cinema/v0/cinema.json").query({
            cinemaId: a,
            channelId: app.channelId
        }).header({
            token: t.token,
            "x-host": "http://maoyanapi.vip.sankuai.com"
        }).end().then(function(a) {
            if (e.loading(!1), 200 === a.statusCode && a.body.success) {
                var t = a.body.data;
                t.sc = t.s.toFixed(1), t.tel && (t.tel = t.tel.split(" ")[0]), t.notice && (t.notice = t.notice.split("<br/>")), 
                e.setData({
                    cinema: t
                });
            }
        }).catch(function(a) {
            e.loading(!1), e.data.movies && 0 !== e.data.movies.length ? e.handleError(a) : e.handleError(a, "page");
        });
    },
    onTabFeature: function(a) {
        var e = a.currentTarget.dataset.url;
        e && (e += "&wxEnv=wxapp", e = encodeURIComponent(e.replace("http:", "https:")), 
        app.goto("/pages/webview/webview?url=" + e));
    },
    showMap: function() {
        wx.openLocation({
            latitude: this.data.cinema.lat,
            longitude: this.data.cinema.lng,
            name: this.data.cinema.nm,
            address: this.data.cinema.addr
        });
    },
    onTapPhone: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.cinema.tel
        });
    }
});