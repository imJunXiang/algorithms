var _extends = Object.assign || function(e) {
    for (var a = 1; a < arguments.length; a++) {
        var t = arguments[a];
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
};

Component({
    behaviors: [ "wx://form-field" ],
    externalClasses: [ "container-class", "group-class", "node-class" ],
    properties: {
        source: Array,
        sLabel: {
            type: String,
            value: "label"
        },
        sValue: {
            type: String,
            value: "value"
        },
        label: String
    },
    methods: {
        emitChange: function(e) {
            this.triggerEvent("change", e);
        },
        onChange: function(e) {
            this.setData({
                value: e.value
            }), this.emitChange(e);
        },
        onClick: function(e) {
            var a = e.currentTarget.dataset;
            this.data.value !== a.value && this.onChange(_extends({}, a, {
                name: this.data.name
            }));
        }
    }
});