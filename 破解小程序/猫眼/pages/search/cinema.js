var app = getApp(), _app$require = app.require("scripts/cinema"), search = _app$require.search, format = _app$require.format, _require = require("../../scripts/shows"), formatKey = _require.formatKey;

app.MoviePage({
    data: {
        cinemas: [],
        offset: 0,
        hasMore: !0
    },
    onLoad: function(t) {
        this.setData(t), this.onReachBottom();
    },
    onReachBottom: function() {
        var t = this;
        this.data.hasMore && search(this.data.query, this.data.offset).then(function(a) {
            var e = a.length;
            t.stats("b_de5dm2q1", {
                keyword: t.data.query,
                stype: [ 3 ],
                return_list: a.map(function(t) {
                    return t.id;
                }),
                page_no: Math.floor(t.data.offset / 20),
                search_id: t.data.searchId
            }), a = a.map(function(a) {
                return a.nm = formatKey(a.nm, t.data.query), a.addr = formatKey(a.addr, t.data.query), 
                a.resolvedDistance = formatKey(a.resolvedDistance, t.data.query), a;
            }), a = t.data.cinemas.concat(a), t.setData({
                cinemas: a,
                offset: a.length,
                hasMore: e
            });
        }).catch(this.handleError.bind(this));
    },
    tapItem: function(t) {
        this.stats("b_90bp6wbt", {
            keyword: this.data.query,
            search_id: this.data.searchId,
            stype: 3,
            item_id: t.currentTarget.dataset.id,
            position: t.currentTarget.dataset.index
        });
    }
});