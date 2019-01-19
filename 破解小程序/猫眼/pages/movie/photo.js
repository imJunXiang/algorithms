var apiConfig = require("../../scripts/api-config"), app = getApp(), api = apiConfig.getApiUrl();

app.MoviePage({
    val_cid: "c_yfd14z7p",
    data: {
        types: [],
        index: 0,
        type: 0,
        photosMap: {}
    },
    onLoad: function(t) {
        this.options = t, wx.setNavigationBarTitle({
            title: t.movieName
        }), this.setData({
            movieId: this.options.movieId
        }), this.loading(!0), this.getTypes(), this.getPhotos();
    },
    onPullDownRefresh: function() {
        this.getTypes(), this.getPhotos();
    },
    typeChangeHandler: function(t) {
        var e = t.currentTarget.dataset.index || t.detail.current;
        e = +e || 0, this.setData({
            index: e,
            type: this.data.types[e].type
        }), this.data.photosMap[this.data.type] || this.getPhotos();
    },
    getTypes: function() {
        var t = this;
        return app.request().get(api + "/mmdb/movie/photos/" + this.options.movieId + "/types.json").query({}).end().then(function(e) {
            t.setData({
                types: e.body.data.types
            });
        }).catch(this.handleError.bind(this, "page"));
    },
    getPhotos: function() {
        var t = this;
        return app.request().get(api + "/mmdb/movie/photos/" + this.options.movieId + "/list.json").query({
            type: this.data.type
        }).end().then(function(e) {
            t.loading(!1), wx.stopPullDownRefresh(), t.data.photosMap[t.data.type] = e.body.data.photos.map(function(t) {
                return t.tlink = app.img(t.tlink, 100, 100), t.olink = t.olink.replace(/\/w\.h/, ""), 
                t;
            }), t.setData({
                index: t.data.index,
                photosMap: t.data.photosMap
            });
        }).catch(this.handleError.bind(this));
    },
    imagePreview: function(t) {
        var e = t.currentTarget.dataset.url;
        wx.previewImage({
            current: e,
            urls: this.data.photosMap[this.data.type].map(function(t) {
                return t.olink;
            })
        });
    }
});