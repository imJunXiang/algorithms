var e = getApp();

Component({
    externalClasses: [ "iconfont", "icon-dizhixuanzhong" ],
    properties: {
        card: {
            type: Object
        }
    },
    data: {},
    attached: function() {
        e.setPageColor(this);
    },
    methods: {
        cardview: function(e) {
            var t = e.currentTarget.dataset.index;
            this.triggerEvent("cardview", {
                index: t
            });
        },
        usecard: function(e) {
            var t = e.currentTarget.dataset.index;
            this.triggerEvent("usecard", {
                index: t
            });
        }
    }
});