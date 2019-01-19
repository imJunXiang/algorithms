var isNetWork = /Network/, isExpired = /expired/, isUnknown = /unknown/, isServer = /Server/, errorDefaultMap = {
    noError: "",
    network: "小喵提醒您，请切换网络重试",
    expired: "小喵提醒您，网络超时",
    unknown: "小喵提醒您，请稍后再试"
};

Component({
    properties: {
        errorInfo: {
            type: Object,
            observer: function(r) {
                var e = r.err, o = void 0 === e ? "noError" : e, t = r.type, n = r.msg, i = void 0 === n ? "" : n;
                r && o && (isNetWork.test(o) ? o = "network" : isExpired.test(o) ? (o = "expired", 
                this.errorModal(i)) : (o = "unknown", this.errorModal(i || "系统君刚刚走神了～稍后再试试")), this.setData({
                    pageError: o,
                    pageErrorMSG: i,
                    hintType: t || "page"
                }, function() {
                    "toast" === t && wx.showToast({
                        title: i || errorDefaultMap[o],
                        icon: "none"
                    });
                }));
            }
        }
    },
    data: {},
    methods: {
        reload: function() {
            this.triggerEvent("reload"), this.setData({
                pageError: null,
                pageErrorMSG: null,
                hintType: null
            });
        },
        errorModal: function(r) {
            var e = getApp().pages();
            wx.showModal({
                content: r || "项目不存在或已下架",
                showCancel: !1,
                confirmText: e.length > 1 ? "返回" : "更多精彩",
                success: function(r) {
                    r.confirm && (1 === e.length ? wx.switchTab({
                        url: "/pages/show/index/index"
                    }) : wx.navigateBack());
                }
            });
        }
    }
});