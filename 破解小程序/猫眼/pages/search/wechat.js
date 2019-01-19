var app = getApp();

app.MoviePage({
    onLoad: function(e) {
        var a = this;
        console.log(e);
        var i = e.widgetData ? this.getWidgetParam("widgetData", e) : null, t = this.getWidgetParam("wxParamData", e), o = i ? i.data_type : "";
        if (i) {
            var r = i[o + "_data"];
            return this.jump(o, r);
        }
        var n = "北京", c = "", d = "";
        t.slot_list.forEach(function(e) {
            var a = e.key, i = e.value;
            "city" === a && (n = i), "movie_name" === a && (c = i), "cinema_name" === a && (d = i);
        }), this.loading(), app.request().get("/wxapp/search").query({
            city: n,
            movie_name: c,
            cinema_name: d
        }).end().then(function(e) {
            var i = e.body.data_type, t = e.body[i + "_data"];
            a.jump(i, t);
        });
    },
    isEncodeJson: function(e) {
        return "string" == typeof e && "%" === e.trim()[0];
    },
    getWidgetParam: function(e, a) {
        if ("query" === e) return "wxSearchQuery" in a ? decodeURIComponent(a.wxSearchQuery) : a.query;
        if (a[e]) return "widgetData" === e || "wxParamData" === e || "data" === e ? this.isEncodeJson(a[e]) ? JSON.parse(decodeURIComponent(a[e])) : JSON.parse(a[e]) : void 0;
    },
    jump: function(e, a) {
        var i = a.movie_id, t = void 0 === i ? "" : i, o = a.cinema_id, r = void 0 === o ? "" : o, n = a.movie_city, c = void 0 === n ? "" : n, d = a.movie_city_id, m = void 0 === d ? "" : d;
        "movie" === e && t ? wx.redirectTo({
            url: "/pages/movie/movie?movieId=" + t + "&cityId=" + m + "&cityName=" + c + "&utm_source=wechat_search"
        }) : "cinema" === e && r && wx.redirectTo({
            url: "/pages/cinema/cinema?cinemaId=" + r + "&movieId=" + t + "&utm_source=wechat_search"
        });
    }
});