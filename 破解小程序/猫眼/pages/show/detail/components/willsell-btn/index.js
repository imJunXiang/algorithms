Component({
    properties: {
        saleStatus: {
            type: Number
        },
        beforeSaleStatus: {
            type: Object
        },
        priorBuyStatus: {
            type: Number
        }
    },
    methods: {
        noop: function() {}
    }
});