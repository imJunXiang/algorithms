module.exports = function() {
    var e = App, t = wx.requestPayment, r = function() {}, a = 7776e3, n = function(e, t, r) {
        wx && wx.operateWXData && wx.operateWXData({
            apiName: "reportAdCps",
            reqData: {
                cps_package: e,
                prepay_id: t,
                status: r
            }
        });
    };
    return {
        App: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, a = t.onShow || r;
            return t.onShow = function(e) {
                var t = e.query.cps_package;
                if (void 0 !== t) {
                    var r = +new Date();
                    try {
                        wx.setStorageSync("__cps_package__", t), wx.setStorageSync("__cps_write_time__", r);
                    } catch (e) {
                        console.error("something is wrong!");
                    }
                }
                a.call(this, e);
            }, e(t);
        },
        setExpired: function(e) {
            e = +e, !isNaN(e) && isFinite(e) && 0 < e && (a = e);
        },
        requestPayment: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, c = +new Date();
            try {
                var s = wx.getStorageSync("__cps_package__"), o = +wx.getStorageSync("__cps_write_time__");
                if (s && o && c - o < 1e3 * a) {
                    var i = e.package || "";
                    n(s, i, 0);
                    var _ = e.success || r, p = e.fail || r, g = e.complete || r;
                    e.success = function(e) {
                        "requestPayment:ok" === e.errMsg && n(s, i, 1), _(e);
                    }, e.fail = function(e) {
                        "requestPayment:fail cancel" === e.errMsg ? n(s, i, 3) : "string" == typeof e.errMsg && 0 === e.errMsg.indexOf("requestPayment:fail") && n(s, i, 2), 
                        p(e);
                    }, e.complete = function(e) {
                        "requestPayment:cancel" === e.errMsg && n(s, i, 3), g(e);
                    };
                } else wx.setStorageSync("__cps_package__", ""), wx.setStorageSync("__cps_write_time__", "");
            } catch (e) {
                console.error("something is wrong!"), console.error(e);
            }
            t.call(wx, e);
        }
    };
}();