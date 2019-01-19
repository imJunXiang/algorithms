var Tpl = require("../../../scripts/tpl"), app = getApp();

module.exports = Tpl.extends({
    key: "sudoku",
    data: {
        sudokuItems: [],
        showActivity: !1,
        sudokuItem: []
    },
    bindEvent: function() {
        this.page.getOperationPositions = this.getOperationPositions.bind(this);
    },
    getOperationPositions: function(t) {
        var i = this, e = app.getPropSafely("$location.city.id", app, 0), n = app.getPropSafely("$user.token", app, null), s = {
            userIdentity: app.$openId,
            positionId: 5,
            channelId: app.channelId,
            scene: app.scene,
            cityId: e
        };
        n && (s.token = n), s.pageUrl = "/" + this.page.route, app.request().get("https://api.maoyan.com/operation/exhibitions.json").header({
            "content-type": "application/json"
        }).query(s).end().then(function(t) {
            return t.body;
        }).then(function(e) {
            var n = [], s = [], o = !1;
            if (e.success) {
                var a = e.data, p = a.exhibit, c = a.contentList;
                if (p) {
                    c = c.map(function(t, e) {
                        return t.val_bid = "b_9668ozpw", t.val_lab = JSON.stringify({
                            activity_id: t.activityId.toString(),
                            custom: {
                                index: e + 1
                            }
                        }), i.page.stats("b_1bp1dyjc", {
                            activity_id: t.activityId.toString(),
                            custom: {
                                index: e + 1
                            }
                        }), t;
                    }), o = !0;
                    for (var u = c.length % 4 ? 4 - c.length % 4 : 0, d = 0; d < u; d++) c.push({
                        activityId: "a" + d
                    });
                    n = c, t || (s = c.slice(0, 1), c.push({}), n = c.slice(1));
                }
            }
            i.setData({
                sudokuItems: n,
                showActivity: o,
                sudokuItem: s
            });
        }).catch(function() {
            i.setData({
                showActivity: !1,
                sudokuItems: [],
                sudokuItem: []
            });
        });
    }
});