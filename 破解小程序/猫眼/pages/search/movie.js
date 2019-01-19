var app = getApp(), _app$require = app.require("scripts/movie"), search = _app$require.search, _require = require("../../scripts/shows"), formatKey = _require.formatKey;

app.MoviePage({
    data: {
        movies: [],
        offset: 0,
        hasMore: !0
    },
    onLoad: function(t) {
        this.setData(t), this.onReachBottom();
    },
    onReachBottom: function() {
        var t = this;
        this.data.hasMore && search(this.data.query, this.data.offset).then(function(e) {
            var a = e.length;
            t.stats("b_de5dm2q1", {
                keyword: t.data.query,
                stype: [ 1 ],
                return_list: e.map(function(t) {
                    return t.id;
                }),
                page_no: Math.floor(t.data.offset / 20),
                search_id: t.data.searchId
            }), e = e.map(function(e) {
                return e.nm = formatKey(e.nm, t.data.query), e.enm = formatKey(e.enm, t.data.query), 
                e.movieShowDesc = e.pubDesc || e.showInfo || e.showTimeInfo, e.movieShowDesc = formatKey(e.movieShowDesc, t.data.query), 
                e;
            }), e = t.data.movies.concat(e), t.setData({
                movies: e,
                offset: e.length,
                hasMore: a
            });
        }).catch(this.handleError.bind(this));
    },
    tapItem: function(t) {
        this.stats("b_90bp6wbt", {
            keyword: this.data.query,
            search_id: this.data.searchId,
            stype: 1,
            item_id: t.currentTarget.dataset.id,
            position: t.currentTarget.dataset.index
        });
    },
    toggleWishFromComing: function(t) {
        var e = this, a = t.currentTarget.dataset, s = a.wishst, o = a.movieid, i = a.index, r = this.data.movies;
        app.checkLogin({
            warn: "添加想看前请先登录",
            success: function() {
                var t = {
                    userId: app.$user.id,
                    token: app.$user.token,
                    type: 1 ^ s,
                    business: 2,
                    clientType: "touch"
                }, a = t.type ? "post" : "delete", n = t.type ? "已标记想看" : "已取消想看";
                app.request(a, "/hostproxy/mmdb/user/movie/" + o + "/wish.json").send("post" === a ? t : {}).header({
                    token: app.$user.token,
                    "x-host": "http://maoyanapi.vip.sankuai.com"
                }).query({
                    channelId: app.channelId,
                    uuid: app.$uuid,
                    ci: app.$location.city ? app.$location.city.id : 0
                }).end().then(function(t) {
                    return t.body.data.id;
                }).then(function(a) {
                    if (a === o) {
                        var s = r[i];
                        s.wishst = t.type, t.type ? s.wish++ : s.wish--, e.setData({
                            movies: e.data.movies
                        }), wx.hideToast(), wx.showToast({
                            title: n,
                            icon: "success",
                            duration: 1e3
                        });
                    }
                }).catch(function(t) {
                    e.handleError(t);
                });
            }
        });
    }
});