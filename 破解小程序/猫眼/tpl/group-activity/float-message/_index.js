function _classCallCheck(t, a) {
    if (!(t instanceof a)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function t(t, a) {
        for (var e = 0; e < a.length; e++) {
            var n = a[e];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(a, e, n) {
        return e && t(a.prototype, e), n && t(a, n), a;
    };
}(), MIN_DELAY = 400, FloatMessage = function() {
    function t(a, e, n, i) {
        _classCallCheck(this, t), this.app = a, this.domain = n, this.activity_id = i, this.page = e, 
        this.initData();
    }
    return _createClass(t, [ {
        key: "initData",
        value: function() {
            var t = this;
            this.app.request().get(this.domain + "/activity/activitybroadcast").query({
                activity_id: this.activity_id,
                channelId: this.app.channelId
            }).end().then(function(t) {
                return t.body;
            }).then(function(a) {
                0 === a.ret && (t.msgDatas = a.data || [], t.msgDatas.length > 0 && t.startRandomMsg());
            }).catch(function(t) {
                console.log(t);
            });
        }
    }, {
        key: "startRandomMsg",
        value: function() {
            var t = this, a = this.msgDatas;
            if (!a || 0 === a.length) return void this.initData();
            var e = Math.floor(Math.random() * a.length), n = a.splice(e, 1), i = +new Date();
            n[0].endTime = i + 2400, n[0].key = n[0].text + "_" + Math.random();
            var s = (this.page.data.floatMsgArr || []).filter(function(t) {
                return t.endTime >= i;
            });
            s.push(n[0]), this.page.setData({
                floatMsgArr: s
            }, function() {
                t.msgDatas = a, setTimeout(function() {
                    t.startRandomMsg();
                }, MIN_DELAY + 1800 * Math.random());
            });
        }
    } ]), t;
}();

exports.default = FloatMessage;