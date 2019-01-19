var e = getApp();

Component({
    externalClasses: [ "iconfont", "icon-tuijianjiaobiao", "icon-shoucangjiaobiao" ],
    properties: {
        cinamer: {
            type: Object,
            observer: function(e, a, i) {
                null != e && (e.forEach(function(e) {
                    e.group_lable && e.group_lable.length > 0 && e.labels.push(e.group_lable), void 0 == e.cinemaid && (e.cinemaid = e.id);
                }), this.setData({
                    cinamer: e
                }));
            }
        }
    },
    data: {},
    attached: function() {
        e.setPageColor(this);
    },
    methods: {}
});