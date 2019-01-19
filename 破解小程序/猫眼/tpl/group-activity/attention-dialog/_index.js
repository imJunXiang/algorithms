function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var i = e[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, a, i) {
        return a && t(e.prototype, a), i && t(e, i), e;
    };
}(), AttentionDialog = function() {
    function t(e, a, i) {
        _classCallCheck(this, t), this.app = e, this.domain = i, this.page = a, this.initHideFunction();
    }
    return _createClass(t, [ {
        key: "initData",
        value: function() {
            return this.app.request().get(this.domain + "/user/subscribe").header({
                "x-host": this.domain,
                token: this.app.$user.token
            }).end().then(function(t) {
                return t.body;
            });
        }
    }, {
        key: "initHideFunction",
        value: function() {
            var t = this, e = function(e) {
                var a = !1;
                e && e.currentTarget && e.currentTarget.dataset && (a = e.currentTarget.dataset.to_attention), 
                a && t.page.stats("b_y6s08zyd");
            };
            if (this.page.hideAttentionDialog && "function" == typeof this.page.hideAttentionDialog) {
                var a = this.page.hideAttentionDialog, i = this;
                this.page.hideAttentionDialog = function() {
                    for (var t = arguments.length, n = Array(t), o = 0; o < t; o++) n[o] = arguments[o];
                    return i.page.setData({
                        showAttentionModal: !1
                    }, function() {
                        e(n[0]), i.callback && i.callback.apply(i.page, i.args);
                    }), a.apply(this, n);
                };
            }
            this.page.hideAttentionDialog = function(a) {
                t.page.setData({
                    showAttentionModal: !1
                }, function() {
                    e(a), t.callback && t.callback.apply(t.page, t.args);
                });
            };
        }
    }, {
        key: "showAttentionDialog",
        value: function(t) {
            this.page.setData({
                showAttentionModal: !0,
                attentionMessage: t || ""
            });
            this.page.stats("b_4bwe2wa5"), this.app.set("showGroupAttentionDialogToday", !0, {
                expires: function() {
                    var t = new Date(), e = t.getTime();
                    return t.setHours(0, 0, 0), (t.getTime() + 864e5 - e) / 1e3;
                }()
            });
        }
    }, {
        key: "checkAttentionDialog",
        value: function(t, e) {
            for (var a = arguments.length, i = Array(a > 2 ? a - 2 : 0), n = 2; n < a; n++) i[n - 2] = arguments[n];
            var o = this;
            if (this.callback = t, this.args = i, this.app.get("showGroupAttentionDialogToday") || this.userSubscribe || !this.app.$user.token) return void t.apply(this.page, i);
            void 0 === this.userSubscribe ? this.initData().then(function(a) {
                o.userSubscribe = 0 === a.ret, o.userSubscribe ? t.apply(o.page, i) : o.showAttentionDialog(e);
            }).catch(function(e) {
                t.apply(o.page, i);
            }) : this.showAttentionDialog(e);
        }
    } ]), t;
}();

exports.default = AttentionDialog;