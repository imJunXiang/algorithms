var t = getApp();

Component({
    externalClasses: [ "iconfont", "icon-dianyingquan", "icon-dizhixuanzhong" ],
    properties: {
        data: {
            type: Object
        }
    },
    data: {},
    methods: {
        showdesc: function() {
            var t = this.data.data.desc.replace(/\\n/g, "\r\n");
            wx.showModal({
                title: "提示",
                content: t,
                showCancel: !1,
                confirmText: "知道了"
            });
        },
        check: function(t) {
            var e = t.currentTarget.dataset;
            this.triggerEvent("radioChange", {
                id: e.id,
                channel: e.channel,
                type: e.type
            });
        }
    },
    attached: function() {
        t.setPageColor(this);
    }
});