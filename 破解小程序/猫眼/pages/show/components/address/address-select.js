function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var _user = require("../../../../scripts/show/user"), _user2 = _interopRequireDefault(_user), store = require("../../../../scripts/store"), app = getApp();

Component({
    properties: {
        selected: {
            type: Object,
            value: {}
        }
    },
    attached: function() {
        this.getAddresses();
    },
    data: {
        maxAddrCount: 5,
        addressList: [],
        selectedAddr: null
    },
    methods: {
        onSubmit: function(e) {
            var t = this.data.addressList.find(function(e) {
                return e.isChecked;
            });
            this.triggerEvent("submit", t);
        },
        onAddTap: function(e) {
            if (this.data.addressList.length >= this.data.maxAddrCount) wx.showToast({
                title: "最多添加 5 个地址，若需新增，请删除或修改",
                icon: "none"
            }); else {
                e.currentTarget.dataset.index;
                this.triggerEvent("addressAdd");
            }
        },
        onEditTap: function(e) {
            var t = e.currentTarget.dataset.index;
            this.triggerEvent("addressEdit", this.data.addressList[t]);
        },
        onDelTap: function(e) {
            var t = this, s = e.currentTarget.dataset.index, d = this.data.addressList[s];
            return app.wx2promiseify(wx.showModal, {
                title: "提示",
                content: "确定删除此用户？",
                cancelText: "取消",
                confirmText: "确定"
            }).then(function(e) {
                e.confirm && app.request().config("loading", 1).post("https://wx.maoyan.com/maoyansh/myshow/ajax/address/deleteAddress").query({
                    recipientAddressId: d.recipientAddressId,
                    token: app.$user.token,
                    sellChannel: 7
                }).end().then(function(e) {
                    return e.body;
                }).then(function(e) {
                    var a = (e.data, e.code), r = e.msg;
                    200 !== a ? (t.setData({
                        errorTips: r
                    }), setTimeout(function() {
                        return t.setData({
                            errorTips: !1
                        });
                    }, 3e3)) : (t.data.addressList.splice(s, 1), t.data.selectedAddr && d.recipientAddressId === t.data.selectedAddr.recipientAddressId && t.setData({
                        selectedAddr: null
                    }), t.setData({
                        addressList: t.data.addressList
                    }), t.triggerEvent("addressDel", d));
                });
            });
        },
        getAddresses: function() {
            var e = this;
            app.request().config("loading", 1).get("https://wx.maoyan.com/maoyansh/myshow/ajax/address/allAddressList").query({
                token: app.$user.token,
                userId: app.$user.id,
                userType: app.$user.type,
                sellChannel: 7
            }).end().then(function(e) {
                return e.body.data;
            }).then(function(t) {
                var s = void 0, d = void 0;
                t = t.map(function(t) {
                    return t.recipientNameDisplay = t.recipientName.length > 10 ? t.recipientName.slice(0, 10) + "..." : t.recipientName, 
                    e.data.selected && e.data.selected.recipientAddressId === t.recipientAddressId ? s = t : t.isDefault && (d = t), 
                    t;
                }), s ? s.isChecked = !0 : d ? d.isChecked = !0 : t && t[0] && (t[0].isChecked = !0);
                var a = e.data.selected || app.get("address") || t.find(function(e) {
                    return e.isDefault;
                }) || t[0];
                e.setData({
                    addressList: t.slice(0, e.data.maxAddrCount),
                    defaultAddress: a,
                    selectedAddr: a
                });
            });
        },
        onAddrTap: function(e) {
            var t = this.data.addressList[e.target.dataset.index];
            if (t.isChecked) t.isChecked = !1, this.setData({
                addressList: this.data.addressList,
                selectedAddr: null
            }); else {
                this.data.addressList.some(function(e) {
                    return e.isChecked;
                }) && (this.data.addressList = this.data.addressList.map(function(e) {
                    return e.isChecked = !1, e;
                })), t.isChecked = !0, this.setData({
                    addressList: this.data.addressList,
                    selectedAddr: t
                });
            }
        }
    }
});