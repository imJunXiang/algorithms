var app = getApp(), _require = require("../../scripts/shows"), formatShows = _require.formatShows;

app.MoviePage({
    data: {
        shows: [],
        offset: 0,
        hasMore: !0
    },
    onLoad: function(t) {
        this.setData(t), this.onReachBottom();
    },
    onReachBottom: function() {
        var t = this;
        if (this.data.hasMore) {
            var a = this.data, e = a.query, o = a.offset, s = a.searchId;
            this.search(e, o).then(function(a) {
                var r = a.list;
                t.stats("b_de5dm2q1", {
                    keyword: e,
                    stype: [ 5 ],
                    return_list: r.map(function(t) {
                        return t.id;
                    }),
                    page_no: Math.floor(o / 20),
                    search_id: s
                }), r = formatShows(r, e, "wxwallet_search"), r = t.data.shows.concat(r);
                var n = a.total > r.length;
                t.setData({
                    shows: r,
                    offset: r.length,
                    hasMore: n
                });
            }).catch(this.handleError.bind(this));
        }
    },
    tapItem: function(t) {
        this.stats("b_90bp6wbt", {
            keyword: this.data.query,
            search_id: this.data.searchId,
            stype: 5,
            item_id: t.currentTarget.dataset.id,
            position: t.currentTarget.dataset.index
        });
    },
    search: function(t, a) {
        return app.request().get("https://api.maoyan.com/mmdb/search/integrated/keyword/v1/list.json").config("key", "search").query({
            token: app.$user.token,
            keyword: t,
            offset: a,
            stype: [ {
                type: 6
            } ],
            iscorrected: !0,
            ci: app.$location.city ? app.$location.city.id : 1,
            lng: app.$location.longitude,
            lat: app.$location.latitude,
            channelId: app.channelId
        }).end().then(function(t) {
            return t.body;
        }).then(function(t) {
            return t.data[0] || {};
        });
    }
});