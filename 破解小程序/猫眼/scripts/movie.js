function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function format(e) {
    return e.stars = app.star(e.sc / 2), e.img = app.img(e.img, 128, 180), e.buy = ~[ 3, 4 ].indexOf(e.showst), 
    e.score = parseFloat(e.sc).toFixed(1), e.proScoreText = parseFloat(e.proScore).toFixed(1), 
    e.version = version(e.ver), e.photos && (e.photos = e.photos.map(function(e) {
        return app.img(e, 220, 190);
    })), e;
}

function version(e) {
    var t = [ "3D", "IMAX 2D", "IMAX 3D" ];
    return (e || "").split("/").filter(function(e) {
        return !!~t.indexOf(e);
    }).sort(function(e, n) {
        return t.indexOf(n) - t.indexOf(e);
    }).map(function(e) {
        return e.replace(/IMAX (\d)D/, function(e, t) {
            return t + "D IMAX";
        }).replace(/(\d)D/, function(e, t) {
            return "v" + t + "d";
        }).toLowerCase();
    })[0] || "";
}

function hotV3(e) {
    return app.request().get(api + "/mmdb/movie/v3/list/hot.json").query({
        channelId: app.channelId,
        ci: e
    }).header({
        token: (app.$user || {}).token
    }).end().then(function(e) {
        var t = e.body.data;
        return t.hot = t.hot.map(format), t;
    });
}

function hotV4(e) {
    return app.request().get("https://api.maoyan.com/mmdb/movie/v4/list/hot.json").query({
        channelId: app.channelId,
        ci: e
    }).header({
        token: (app.$user || {}).token
    }).end().then(function(e) {
        var t = e.body.data;
        return t.hot = t.hot.map(format), t;
    });
}

function moreHotList(e, t) {
    return app.request().get(api + "/mmdb/movie/list/info.json").query({
        channelId: app.channelId,
        movieIds: e,
        ci: t
    }).header({
        token: (app.$user || {}).token
    }).end().then(function(e) {
        var t = e.body.data;
        return t.movies = t.movies.map(format), t;
    });
}

function movie(e) {
    return app.request().get("/hostproxy/mmdb/movie/v5/" + e + ".json").header({
        token: app.$user.token,
        "x-host": "http://maoyanapi.vip.sankuai.com",
        channelId: app.channelId
    }).query({
        ci: app.$location.city ? app.$location.city.id : 1,
        channelId: app.channelId
    }).end().then(function(e) {
        return e.body.data.movie;
    }).then(format);
}

function celebrity(e) {
    return app.request().get(api + "/mmdb/v7/movie/" + e + "/celebrities.json").end().then(function(e) {
        return e.body.data;
    });
}

function egg(e) {
    return app.request().get(api + "/mmdb/movie/egg/" + e + ".json").end().then(function(e) {
        return e.body.data.endEgg;
    });
}

function tips(e) {
    return app.request().get(api + "/mmdb/movie/tips/" + e + "/list.json").query({
        channelId: app.channelId
    }).end().then(function(e) {
        return e.body.data.tips;
    });
}

function search(e, t) {
    return t = t || 0, app.request().get(api + "/mmdb/search/movie/keyword/list.json").query({
        keyword: e,
        offset: t
    }).end().then(function(e) {
        return e.body.list;
    }).then(function(e) {
        return e.map(function(e) {
            return format(e);
        });
    });
}

function comment(e, t, n) {
    return app.request().post(api + "/mmdb/comments/movie/" + e + ".json").query({
        clientType: "wechat_small_program",
        channelId: app.channelId
    }).send({
        nick: app.$user.nickName,
        userId: app.$user.userId,
        token: app.$user.token,
        uuid: app.$uuid,
        ci: _utils2.default.getCityAlter().id,
        score: t,
        content: n
    }).end().then(function(e) {
        return e.body.data;
    });
}

function commentv2(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 3, o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
    return app.request().get(api + "/mmdb/comments/movie/v2/" + e + ".json").query({
        limit: n,
        offset: t,
        tag: o,
        uuid: app.$uuid,
        token: app.$user.token,
        userid: app.$user.userId,
        ci: app.$location.city ? app.$location.city.id : void 0,
        clientType: "wechat_small_program",
        channelId: app.channelId
    }).end().then(function(e) {
        return e.body;
    });
}

function commentv2_layered(e) {
    return app.request().get(api + "/review/v2/comments.json").query(_extends({}, e)).header({
        token: app.$user.token || "",
        uuid: app.$uuid || ""
    }).end().then(function(e) {
        return e.body;
    });
}

function movieComment(e) {
    return app.request().get(api + "/mmdb/comment/movie/" + e + ".json").query({
        uuid: app.$uuid,
        token: app.$user.token,
        userId: app.$user.userId,
        ci: app.$location.city ? app.$location.city.id : void 0,
        clientType: "wechat_small_program",
        channelId: app.channelId
    }).end().then(function(e) {
        return e.body;
    });
}

function userMarkedCnt(e, t) {
    return app.request().get(api + "/review/" + (t ? "" : "v1/") + "user/" + (t ? t + "/" : "") + "marked/movie/count.json").query({
        uuid: app.$uuid,
        token: app.$user.token,
        userId: app.$user.userId,
        ci: app.$location.city ? app.$location.city.id : void 0,
        clientType: "wechat_small_program",
        channelId: app.channelId
    }).end().then(function(e) {
        return e.body;
    });
}

function delComment(e) {
    return app.request().delete(api + "/mmdb/comment/" + e + ".json").query({
        token: app.$user.token,
        userId: app.$user.userId,
        clientType: "wechat_small_program",
        channelId: app.channelId
    }).end().then(function(e) {
        return e.body.data;
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
    }
    return e;
};

exports.format = format, exports.version = version, exports.hotV3 = hotV3, exports.hotV4 = hotV4, 
exports.moreHotList = moreHotList, exports.movie = movie, exports.celebrity = celebrity, 
exports.egg = egg, exports.tips = tips, exports.search = search, exports.comment = comment, 
exports.commentv2 = commentv2, exports.commentv2_layered = commentv2_layered, exports.movieComment = movieComment, 
exports.userMarkedCnt = userMarkedCnt, exports.delComment = delComment;

var _utils = require("./utils"), _utils2 = _interopRequireDefault(_utils), apiConfig = require("./api-config"), api = apiConfig.getApiUrl(), app = getApp();