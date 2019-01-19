Component({
    properties: {
        active: {
            type: Number,
            value: 0
        },
        isIphoneX: {
            type: Boolean,
            value: !1
        }
    },
    methods: {
        onTap: function(e) {
            var t = e.currentTarget.dataset, o = (t.index, t.url), r = getCurrentPages();
            o !== "/" + r[r.length - 1].route && getApp().goto(o, !0);
        }
    }
});