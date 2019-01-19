var MAX = 2147483647;

Component({
    behaviors: [ "wx://form-field" ],
    externalClasses: [ "container-class", "label-class", "stepper-class", "plus-class", "minus-class", "value-class" ],
    properties: {
        disabled: Boolean,
        label: String,
        min: {
            type: null,
            value: 1
        },
        max: {
            type: null,
            value: MAX
        },
        step: {
            type: null,
            value: 1
        }
    },
    created: function() {
        this.setData({
            value: this.limitRange(this.data.value || this.data.min)
        });
    },
    methods: {
        limitRange: function(t) {
            var a = this.data, e = a.min, s = a.max;
            return Math.max(Math.min(s, t), e);
        },
        onChange: function(t) {
            if (this.data[t + "Disabled"]) return void this.triggerEvent("overlimit", t);
            var a = "minus" === t ? -this.data.step : +this.data.step, e = this.limitRange(Math.round(100 * (this.data.value + a)) / 100);
            this.data.value !== e && (this.setData({
                value: e
            }), this.triggerEvent("change", {
                type: t,
                value: e
            }), this.triggerEvent(t, e));
        },
        onMinus: function() {
            this.onChange("minus");
        },
        onPlus: function() {
            this.onChange("plus");
        }
    }
});