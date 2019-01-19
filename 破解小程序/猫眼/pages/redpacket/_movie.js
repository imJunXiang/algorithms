function formatMovie(e) {
    return e.img = app.img(e.img, 220, 300), e.score = e.sc && parseFloat(e.sc).toFixed(1), 
    e;
}

function getMovie(e) {
    return app.request().get("/hostproxy/mmdb/movie/v5/" + e + ".json").header({
        "x-host": "http://maoyanapi.vip.sankuai.com"
    }).end().then(function(e) {
        return e.body.data.movie;
    }).then(function(e) {
        return formatMovie(e);
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.formatMovie = formatMovie, exports.getMovie = getMovie;

var app = getApp();