Component({
    properties: {
        selected: Number,
        stockout: Boolean,
        sessions: {
            type: Array,
            value: []
        },
        isIphone: Boolean
    },
    methods: {
        onSessionItemClick: function(e) {
            var s = e.currentTarget.dataset.index;
            this.triggerEvent("tapsession", this.data.sessions[s]);
        },
        noop: function() {},
        onSessionCloseClick: function(e) {
            this.triggerEvent("close");
        }
    }
});