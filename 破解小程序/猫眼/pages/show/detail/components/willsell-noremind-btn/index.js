Component({
    properties: {
        btnText: {
            type: String,
            value: ""
        }
    },
    methods: {
        ontap: function() {
            this.triggerEvent("tap");
        }
    }
});