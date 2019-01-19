Component({
    behaviors: [ "wx://form-field" ],
    externalClasses: [ "clear-class", "container-class", "input-class", "label-class", "surface-class", "tip-class" ],
    options: {
        multipleSlots: !0
    },
    properties: {
        adjustPosition: {
            type: Boolean,
            value: !0
        },
        clearable: {
            type: Boolean,
            value: !1
        },
        confirmHold: {
            type: Boolean,
            value: !1
        },
        confirmType: {
            type: String,
            value: "done"
        },
        cursor: {
            type: Number
        },
        cursorSpacing: null,
        disabled: {
            type: Boolean,
            value: !1
        },
        focus: {
            type: Boolean,
            value: !1
        },
        label: {
            type: String,
            value: ""
        },
        maxlength: {
            type: Number,
            value: 140
        },
        password: {
            type: Boolean,
            value: !1
        },
        placeholder: {
            type: String,
            value: ""
        },
        placeholderStyle: {
            type: String,
            value: ""
        },
        radius: {
            type: String,
            value: "0"
        },
        required: {
            type: Boolean,
            value: !1
        },
        selectionStart: {
            type: Number,
            value: -1
        },
        selectionEnd: {
            type: Number,
            value: -1
        },
        tip: {
            type: String,
            value: ""
        },
        type: {
            type: String,
            value: "text"
        }
    },
    data: {
        showClear: !1
    },
    created: function() {
        this.focused = !1;
    },
    methods: {
        onInput: function(e) {
            var t = e.detail || {}, a = t.value, l = void 0 === a ? "" : a;
            this.triggerEvent("input", l), this.setData({
                value: l,
                showClear: this.getShowClear(l)
            });
        },
        onFocus: function() {
            this.triggerEvent("focus"), this.focused = !0, this.setData({
                showClear: this.getShowClear()
            });
        },
        onBlur: function() {
            this.focused = !1, this.triggerEvent("blur"), this.setData({
                showClear: this.getShowClear()
            });
        },
        getShowClear: function(e) {
            return e = void 0 === e ? this.data.value : e, this.data.clearable && this.focused && e;
        },
        onClear: function() {
            this.setData({
                value: "",
                showClear: this.getShowClear("")
            }), this.triggerEvent("input", "");
        },
        onConfirm: function() {
            this.triggerEvent("confirm", this.data.value);
        }
    }
});