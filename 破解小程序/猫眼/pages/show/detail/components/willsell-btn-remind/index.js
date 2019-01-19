Component({
    properties: {
        priorBuyStatus: {
            type: Number
        },
        btnText: {
            type: String
        }
    },
    methods: {
        normalTap: function() {
            this.triggerEvent("normalTap");
        },
        priorTap: function() {
            this.triggerEvent("priorTap");
        }
    }
});