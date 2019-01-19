function getAward() {
    return app.request().post("https://api.maoyan.com/sns/user/favorites.json").header({
        token: app.$user.token
    }).send({
        token: app.$user.token,
        channelId: app.channelId
    }).end().then(function(e) {
        var t = e.body.data, r = "";
        if (t && t.result && (r = t.result), "success" !== r) throw new Error("请求获取成长值失败");
    });
}

function queryAwardResult() {
    return app.request().get("https://api.maoyan.com/sns/growth/task.json").header({
        token: app.$user.token
    }).query({
        token: app.$user.token,
        channelId: app.channelId
    }).end().then(function(e) {
        var t = e.body, r = t.success, n = t.data;
        if (!r) throw new Error("请求成长值结果失败");
        var a = n.taskList, s = !1;
        if (a.forEach(function(e) {
            "添加小程序" === e.taskName && 1 === e.done && (s = !0);
        }), !s) throw new Error("没有获得成长值");
    });
}

var app = getApp();

exports = module.exports = {
    getAward: getAward,
    queryAwardResult: queryAwardResult
};