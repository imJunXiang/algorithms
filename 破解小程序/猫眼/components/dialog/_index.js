var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
    }
    return t;
};

Component({
    externalClasses: [ "custom-class", "custom-btn-group", "custom-btn-main", "custom-btn-secondary" ],
    options: {
        multipleSlots: !0
    },
    properties: {
        isShow: {
            type: Boolean,
            value: !1
        },
        isShowCloseBtn: {
            type: Boolean,
            value: !0
        },
        titleText: {
            type: String,
            value: ""
        },
        buttons: {
            type: Array,
            value: []
        },
        hideCallback: {
            type: null,
            value: null
        }
    },
    methods: {
        _buttonClicked: function(t) {
            var e = t.currentTarget.dataset.index;
            if (e || 0 === e) {
                var n = this.data.buttons[e], o = n.clickFunc;
                n.bid;
                o && "function" == typeof o && o();
            }
        },
        _handleClose: function() {
            this.hide({
                fromClick: !0
            });
        },
        hide: function(t) {
            var e = this.data.hideCallback;
            this.setData({
                isShow: !1
            }, function() {
                e && "function" == typeof e && e(t);
            });
        },
        show: function(t) {
            this.setData(_extends({
                isShow: !0
            }, t));
        }
    }
});