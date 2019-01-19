function update() {
    updateManager && ready && exe && count && (count--, wx.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
        success: function(e) {
            e.confirm && updateManager.applyUpdate();
        }
    }));
}

function lessThan(e, t) {
    try {
        return /(\d+)\.(\d+)\.(\d+)$/.exec(e).slice(1, 4).map(function(e, t) {
            return +e * Math.pow(10, 5 * (2 - t));
        }).reduce(function(e, t) {
            return e + t;
        }) < /(\d+)\.(\d+)\.(\d+)$/.exec(t).slice(1, 4).map(function(e, t) {
            return +e * Math.pow(10, 5 * (2 - t));
        }).reduce(function(e, t) {
            return e + t;
        });
    } catch (e) {
        return !1;
    }
}

function check() {
    var e = getApp();
    e.request().get("/updateInfo").host().end().then(function(t) {
        var n = t.body;
        n.open && lessThan(e.version, n.version) && (exe = !0, update());
    });
}

var count = 1, ready = !1, exe = !1, updateManager = void 0;

wx.getUpdateManager && (updateManager = wx.getUpdateManager(), updateManager.onUpdateReady(function() {
    ready = !0, update();
})), module.exports = check;