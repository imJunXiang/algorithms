Component({
    properties: {
        projectVideoInfo: {
            type: Object,
            value: {}
        }
    },
    methods: {
        noop: function() {},
        goToVideo: function() {
            this.triggerEvent("openVideo");
        }
    },
    attached: function() {
        this.triggerEvent("statsView");
    }
});