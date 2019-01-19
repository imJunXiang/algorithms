function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var _user = require("../../../scripts/show/user"), _user2 = _interopRequireDefault(_user), app = getApp(), SEARCH_MAX_NUM = 6;

app.MoviePage({
    data: {
        key: "",
        result: [],
        resultOtherCity: [],
        page: 1,
        padding: !1,
        hasMore: !0,
        hasRequested: !1,
        size: 20,
        histories: "",
        focus: !1
    },
    onLoad: function(t) {
        var a = t.key;
        a && (a = decodeURIComponent(a));
        var s = app.get("search_his_keys") || [];
        this.setData({
            key: a || "",
            histories: s,
            focus: !a
        }), a && this.onLoadListWrap();
    },
    onTapCancel: function(t) {
        getApp().goto(-1);
    },
    onInputFocus: function(t) {
        this.setData({
            showHistory: !0
        });
    },
    onInput: function(t) {
        var a = t.detail.value;
        a = a.trim(), (a.length >= 1 && "" === this.data.key || "" === a) && this.setData({
            key: a
        });
    },
    onTapOther: function(t) {
        this.setData({
            showHistory: !1
        });
    },
    onInputConfirm: function(t) {
        var a = t.detail.value;
        a = a.trim();
        var s = this.data.histories;
        if ("" !== a) {
            this.data.key = a, this.data.page = 1;
            var e = s.indexOf(a);
            -1 !== e && s.splice(e, 1), s.unshift(a), s = s.splice(0, 6), this.setData({
                histories: s
            }), app.set("search_his_keys", s), this.onLoadListWrap();
        } else this.onTapOther();
    },
    onHisItemDel: function(t) {
        var a = t.currentTarget.dataset.key, s = this.data.histories, e = s.indexOf(a);
        -1 !== e && (this.data.histories.splice(e, 1), this.setData({
            histories: this.data.histories
        }), app.set("search_his_keys", this.data.histories));
    },
    onClearInput: function(t) {
        this.setData({
            key: ""
        });
    },
    onTapHisItem: function(t) {
        var a = t.currentTarget.dataset.key;
        this.data.key = a, this.data.page = 1, this.onLoadListWrap();
    },
    onLoadListWrap: function(t) {
        var a = this;
        if (this.data.city && this.data.long && this.data.lat) this.onLoadList(); else {
            var s = app.models.location.get() || {};
            s.city || s.locationCity ? (this.setData({
                city: s.city || s.locationCity,
                lat: s.latitude,
                long: s.longitude
            }), this.onLoadList()) : app.models.location.fetch().then(function(t) {
                a.setData({
                    city: t.locationCity || 0,
                    lat: t.latitude || 0,
                    long: t.longitude || 0
                }), a.onLoadList();
            }, function() {
                a.setData({
                    city: 0,
                    lat: 0,
                    long: 0
                }), a.onLoadList();
            });
        }
    },
    onLoadList: function(t) {
        var a = this;
        this.setData({
            padding: !0,
            showHistory: !1,
            key: this.data.key
        });
        var s = this.data, e = s.page, i = s.size, o = this.data.key;
        1 == e && (this.data.hasMore = !0), this.data.hasMore && app.request().config("loading", 1 === e).get("https://wx.maoyan.com/maoyansh/myshow/ajax/performances/0;st=0;p=" + e + ";s=" + i + ";k=" + o).query({
            sellChannel: 7,
            cityId: this.data.city ? this.data.city.id : 0,
            lat: this.data.lat ? this.data.lat : 0,
            lng: this.data.long ? this.data.long : 0
        }).end().then(function(t) {
            return a.setData({
                padding: !1,
                focus: !1
            }), t.body;
        }).then(function(t) {
            var s = t.code, i = t.data, o = t.paging;
            if (200 !== s && 1 === e) return void a.setData({
                result: [],
                hasRequested: !0
            });
            var n = 1 === e ? [] : a.data.result;
            n = n.concat(i), a.data.hasMore = o && o.hasMore, ++a.data.page, a.setData({
                result: n,
                hasRequested: !0,
                hasMore: a.data.hasMore
            });
        }).catch(function(t) {
            a.setData({
                result: [],
                hasRequested: !0
            });
        });
    }
});