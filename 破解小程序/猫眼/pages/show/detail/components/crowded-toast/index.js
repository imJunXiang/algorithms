Component({
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        count: {
            type: Number,
            value: 5
        }
    },
    data: {
        number: 5
    },
    ready: function() {
        this.runInterval();
    },
    detached: function() {
        this.interval && clearInterval(this.interval);
    },
    methods: {
        noop: function() {},
        minus: function(t) {
            var e = t - 1;
            this.setData({
                number: e
            });
        },
        runInterval: function() {
            var t = this, e = setInterval(function() {
                var n = t.data.number;
                n > 0 ? t.minus(n) : (clearInterval(e), t.triggerEvent("close"));
            }, 1e3);
            this.interval = e;
        }
    }
});