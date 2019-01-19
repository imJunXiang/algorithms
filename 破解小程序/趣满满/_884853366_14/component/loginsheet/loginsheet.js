var n = require("../../utils/tools.js");

Component({
    properties: {},
    data: {},
    methods: {
        handleHidden: function() {
            this.triggerEvent("hideSheet", {});
        },
        preventD: function() {},
        getUserInfoFun: function() {
            var e = this;
            wx.login({
                success: function(t) {
                    wx.getUserInfo({
                        success: function(i) {
                            var o = {
                                userinfo: i,
                                wxlogin: t
                            };
                            (0, n.loginFn)("wechat", o).then(function() {
                                e.triggerEvent("loginend", {});
                            });
                        }
                    });
                }
            });
        },
        setStorage: function(n, e) {
            return new Promise(function(t, i) {
                wx.setStorage({
                    key: n,
                    data: e,
                    success: function() {
                        t();
                    }
                });
            });
        }
    }
});