Component({
    properties: {
        ticketNotes: {
            type: String
        }
    },
    data: {
        richText: wx.canIUse("rich-text")
    },
    methods: {
        noop: function() {}
    }
});