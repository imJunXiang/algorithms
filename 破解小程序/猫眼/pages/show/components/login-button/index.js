Component({
    options: {
        multipleSlots: !0
    },
    externalClasses: [ "login-button-class" ],
    properties: {
        isLogin: Boolean
    },
    methods: {
        noop: function() {},
        onGetUserInfo: function(o) {
            this.triggerEvent("userinfo", o.detail);
        }
    }
});