function _defineProperty(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

var _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
}, store = require("../../../../scripts/store"), app = getApp(), formValidate = {
    userName: {
        reg: /^.{2,50}$/,
        required: !0,
        tips: "亲~姓名长度需在2至50个字之间~"
    },
    idNumber: {
        reg: /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,
        required: !0,
        tips: "亲~ 请输入正确的身份证号哦~"
    }
};

Component({
    properties: {},
    data: {
        PREFIX: "https://wx.maoyan.com/maoyansh/myshow/ajax",
        token: "c5XjtNrzEWlch8g_2W610k2O9FsMAAAA1gMAAPRyYhsMVmEh2GIyBwe_bTQ2ElBv511DpsfMevTW7itUDYoAt118fPGfiVB29VCo3g",
        userName: "",
        idNumber: "",
        disabled: !0,
        switched: !1
    },
    created: function() {},
    ready: function() {
        this.initEditInfo();
    },
    methods: {
        initEditInfo: function() {
            var e = store.get("_realname_edit_info");
            e && this.setData(_extends({}, e, {
                disabled: !1,
                switched: e.default
            }));
        },
        formSubmit: function(e) {
            var t = e.detail.value;
            try {
                Object.keys(t).forEach(function(e) {
                    var r = formValidate[e], a = t[e].trim(), i = r.reg;
                    if ((r.required || !r.required && "" !== a) && !i.test(a)) throw new Error(r.tips);
                });
            } catch (e) {
                return this.triggerEvent("submitError", e.message), !1;
            }
            this.saveRealNameUser(t);
        },
        saveRealNameUser: function(e) {
            var t = this, r = this.data.PREFIX, a = {
                id: this.data.id ? this.data.id : 0,
                idType: 1,
                userName: e.userName,
                idNumber: e.idNumber,
                default: this.data.switched,
                idNumberDisplay: e.idNumber,
                userNameDisplay: e.userName
            };
            app.request().post(r + "/realName/saveRealNameUser").query({
                token: app.$user.token,
                sellChannel: 7
            }).send(_extends({}, a)).end().then(function(e) {
                return e.body;
            }).then(function(e) {
                var r = e.code, i = e.data, s = e.msg;
                200 !== r ? t.triggerEvent("submitError", s) : (a.id = i, t.triggerEvent("submitSuccess", a));
            });
        },
        handleChange: function(e) {
            var t = e.currentTarget.id, r = e.detail.value;
            this.setData(_defineProperty({}, t, r));
            var a = !this.inputValidate(t, r);
            this.setData({
                disabled: a
            });
        },
        inputValidate: function(e, t) {
            var r = this.data, a = r.userName, i = r.idNumber, s = void 0;
            switch (e) {
              case "userName":
                t ? i && i.length > 0 && (s = !0) : s = !1;
                break;

              case "idNumber":
                if (!t) {
                    s = !1;
                    break;
                }
                a && (s = !0);
            }
            return s;
        },
        handleSwitch: function(e) {
            this.setData({
                switched: !this.data.switched
            });
        }
    }
});