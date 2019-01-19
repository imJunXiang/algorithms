Component({
    properties: {
        flag: {
            type: Boolean,
            value: !1
        },
        pid: {
            type: Number,
            value: 0
        }
    },
    ready: function() {},
    methods: {
        openFillInfo: function() {
            wx.navigateTo({
                url: "/pages/showsubs/general-info/index?id=" + this.data.pid
            });
        }
    },
    attached: function() {
        this.triggerEvent("statsView");
    }
});