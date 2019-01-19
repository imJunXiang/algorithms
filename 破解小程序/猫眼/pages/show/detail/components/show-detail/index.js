Component({
    properties: {
        detail: {
            type: String,
            observer: function(t) {
                this.formatDetail(t);
            }
        },
        seatUrl: {
            type: String
        }
    },
    data: {
        showDetail: []
    },
    methods: {
        noop: function() {},
        formatDetail: function(t) {
            var e = [];
            try {
                e = JSON.parse(t) || [];
            } catch (t) {
                e = [];
            }
            e.forEach(function(t) {
                var e = t.content;
                2 == t.type && !/@/.test(e) && /\.meituan\.(com|net)/.test(e) && (t.content = e + "@720w");
            }), this.setData({
                showDetail: e
            });
        },
        bindImgLoaded: function(t) {
            var e = t.detail, a = e.width, i = e.height, n = t.target.dataset.index, o = this.data.showDetail;
            o[+n].w = a, o[+n].h = i, this.setData({
                showDetail: o
            });
        },
        onTapPhoto: function(t) {
            var e = this.properties.seatUrl;
            e && e.length > 0 && wx.previewImage({
                current: e,
                urls: [ e ]
            }), this.triggerEvent("statsView");
        }
    }
});