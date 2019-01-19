function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var _utils = require("../../../scripts/utils"), _utils2 = _interopRequireDefault(_utils), _sevenDay = require("../../../constant/seven-day"), _sevenDay2 = _interopRequireDefault(_sevenDay), _cookie = require("../../../scripts/cookie"), _cookie2 = _interopRequireDefault(_cookie), app = getApp(), domain = _sevenDay2.default.DOMAIN, u = function(e) {
    return domain + e;
}, sdHelper = {
    rSuccess: function(e) {
        return e && e.body && e.body.success;
    },
    shapeBoardList: function(e, t) {
        return e;
    },
    fetchBoardList: function(e) {
        var t = this, n = e.type, r = e[n].timestamp, a = e[n].page, o = _utils2.default.safeGet(app, "$user.token", ""), i = +!!o;
        return n == _sevenDay2.default.BOARD_TYPE.THUMBS_UP && (i = 0), app.request().config("loading", !1).get(u("/qixi/cardwall/board.json")).header({
            token: o,
            "content-type": "application/json"
        }).query({
            timestamp: r || new Date().getTime(),
            type: n,
            getMine: i,
            offset: (a - 1) * _sevenDay2.default.PAGE_SIZE,
            limit: _sevenDay2.default.PAGE_SIZE
        }).end().then(function(e) {
            return t.rSuccess(e) ? (e.body.data && e.body.data.rankList.map(function(e) {
                return t.filterSelfInfo(e);
            }), {
                paging: e.body.paging,
                data: e.body.data
            }) : {};
        }).catch(function(e) {
            return null;
        });
    },
    approve: function(e, t) {
        var n = this, r = _utils2.default.safeGet(app, "$user.token", "");
        return app.request().config("loading", !1).post(u("/qixi/card/" + e + "/approve.json")).header({
            token: r,
            "content-type": "application/json"
        }).query({
            type: +!t
        }).end().then(function(e) {
            return n.rSuccess(e);
        }).catch(function(e) {
            return null;
        });
    },
    fetchMyCards: function() {
        var e = this;
        return app.request().get(u("/qixi/card/mine.json")).header({
            Token: app.$user.token,
            "content-type": "application/json"
        }).end().then(function(t) {
            if (t.body && t.body.success) {
                var n = {}, r = t.body && t.body.data;
                return r && (n = JSON.parse(JSON.stringify(r)), n.myCards.map(function(t) {
                    return t = e.filterSelfInfo(t), t.approve = t.approve > 999 ? "999+" : t.approve, 
                    t.topRank = -1 == t.topRank ? "999+" : t.topRank, t;
                })), n;
            }
        }).catch(function(e) {
            console.error("网络错误", e);
        });
    },
    filterSelfInfo: function(e) {
        return e.userId == app.$user.userId && (e.userNickname = app.$user.wxUserInfo.userInfo.nickName, 
        e.userAvatarUrl = app.$user.wxUserInfo.userInfo.avatarUrl), e;
    }
};

module.exports = sdHelper;