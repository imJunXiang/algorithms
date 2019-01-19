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
            value: null,
            observer: function() {}
        }
    },
    attached: function() {
        this.getAddresses();
    },
    data: {
        maxAddrCount: 5
    },
    methods: {
        onAddTap: function(e) {
            var t = this.data, s = t.addressList, r = t.maxAddrCount;
            s && s.length >= r ? this.triggerEvent("submitError", "最多添加5个地址，若需新增，请删除或修改") : this.triggerEvent("addressAdd", e);
        },
        onEditTap: function(e) {
            var t = e.currentTarget.dataset.index;
            this.triggerEvent("addressEdit", this.data.addressList[t]);
        },
        onDelTap: function(e) {
            var t = this, s = e.currentTarget.dataset.index;
            return app.wx2promiseify(wx.showModal, {
                title: "提示",
                content: "确定删除此用户？",
                cancelText: "取消",
                confirmText: "确定"
            }).then(function(e) {
                e.confirm && app.request().config("loading", 1).post("https://wx.maoyan.com/maoyansh/myshow/ajax/address/deleteAddress").query({
                    recipientAddressId: t.data.addressList[s].recipientAddressId,
                    token: app.$user.token,
                    sellChannel: 7
                }).end().then(function(e) {
                    return e.body;
                }).then(function(e) {
                    var r = (e.data, e.code), a = e.msg;
                    200 !== r ? (t.setData({
                        errorTips: a
                    }), setTimeout(function() {
                        return t.setData({
                            errorTips: !1
                        });
                    }, 3e3)) : (t.data.addressList.splice(s, 1), t.setData({
                        addressList: t.data.addressList
                    }));
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
                t = t.map(function(e) {
                    return e.recipientNameDisplay = e.recipientName.length > 10 ? e.recipientName.slice(0, 10) + "..." : e.recipientName, 
                    e;
                }), e.setData({
                    addressList: t.slice(0, e.data.maxAddrCount)
                });
            });
        }
    }
});