Component({
    options: {
        multipleSlots: !0
    },
    properites: {
        isLogin: {
            type: Boolean,
            value: !1
        },
        isGetPhoneButton: {
            type: Boolean,
            value: !1
        }
    },
    methods: {
        onGetUserInfo: function(t) {
            this.triggerEvent("getUserInfo", t.detail);
        },
        onGetPhoneNumber: function(t) {
            this.triggerEvent("getPhoneNumber", t.detail);
        },
        onNormalButtonTap: function(t) {
            this.triggerEvent("normalButtonTap", t);
        }
    }
});