function _asyncToGenerator(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, i) {
            function n(r, o) {
                try {
                    var a = e[r](o), c = a.value;
                } catch (t) {
                    return void i(t);
                }
                if (!a.done) return Promise.resolve(c).then(function(t) {
                    n("next", t);
                }, function(t) {
                    n("throw", t);
                });
                t(c);
            }
            return n("next");
        });
    };
}

var apiConfig = require("../api-config"), apiUrl = apiConfig.getApiUrl(), PRIVILEGEID = 3, app = getApp(), getToken = function() {
    var t = app.$user.token;
    return void 0 === t ? "" : t;
}, getCI = function() {
    return app.$location && app.$location.city && app.$location.city.id ? app.$location.city.id : 0;
}, activityApi = {
    getMyActivityList: function() {
        return app.request().get(apiUrl + "/sns/activity/all.json").header({
            token: getToken()
        }).query({
            ci: getCI()
        }).end().then(function(t) {
            return t.body;
        });
    },
    hasActivities: function() {
        var t = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function e() {
            var i;
            return regeneratorRuntime.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, t.getMyActivityList().then(function(t) {
                        var e = t.data;
                        return e && e.length > 0;
                    });

                  case 2:
                    return i = e.sent, e.abrupt("return", i);

                  case 4:
                  case "end":
                    return e.stop();
                }
            }, e, t);
        }))();
    },
    getPrivilege: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : PRIVILEGEID;
        return app.request().get(apiUrl + "/sns/member/new/" + t + "/privilege.json").header({
            token: getToken()
        }).end().then(function(t) {
            return t.body;
        });
    },
    getUserActivity: function() {
        return app.request().get(apiUrl + "/sns/activity/user/activitys.json").end().then(function(t) {
            return t.body;
        });
    },
    getMovieActivity: function(t) {
        return app.request().get(apiUrl + "/sns/activity/movie/activitys.json").query({
            movieId: t
        }).end().then(function(t) {
            return t.body;
        });
    },
    getActivityInfo: function(t) {
        return app.request().get(apiUrl + "/sns/activity/detail/" + t + ".json").header({
            token: getToken()
        }).end().then(function(t) {
            return t.body;
        });
    }
}, activityGoto = {
    gotoActivityList: function(t) {
        var e = "/pages/memberActivity/list";
        t ? wx.redirectTo({
            url: e
        }) : app.goto(e);
    },
    gotoActivity: function(t) {
        var e = (t.status, t.activityUrl, t.id), i = void 0 === e ? 0 : e, n = t.from, r = void 0 === n ? "" : n;
        app.goto("/pages/memberActivity/detail?activityId=" + i + "&from=" + r);
    },
    gotoActivityUrl: function(t) {
        var e = t.activityUrl, i = void 0 === e ? "" : e, n = t.id, r = void 0 === n ? 0 : n, o = t.activityName, a = void 0 === o ? "" : o, c = t.shareImageUrl, u = void 0 === c ? "" : c, v = i && !i.startsWith("http"), s = "";
        if (v) s = i; else {
            var p = encodeURIComponent(i), y = "pages/memberActivity/detail?activityId=" + r;
            s = "/pages/webview/webview?url=" + p + "&shareUrl=" + encodeURIComponent(y) + "&imgUrl=" + u + "&title=" + a;
        }
        wx.redirectTo({
            url: s
        });
    }
};

module.exports = {
    activityApi: activityApi,
    activityGoto: activityGoto,
    PRIVILEGEID: PRIVILEGEID
};