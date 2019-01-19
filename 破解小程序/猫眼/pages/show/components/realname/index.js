var store = require("../../../../scripts/store"), app = getApp();

Component({
    properties: {
        selected: {
            type: Boolean,
            value: !1
        },
        pid: {
            type: String,
            value: "0"
        }
    },
    data: {
        realNameList: [],
        selectedNameList: [],
        PREFIX: "https://wx.maoyan.com/maoyansh/myshow/ajax",
        realNameListLoading: !0
    },
    ready: function() {
        this.getUserRealNameList(), this.initStore();
    },
    methods: {
        initStore: function() {
            store.get("_realname_edit_info") && store.set("_realname_edit_info", null);
        },
        getUserRealNameList: function() {
            var e = this, t = this.data.PREFIX;
            wx.showToast({
                icon: "loading",
                title: "加载中..."
            }), app.request().get(t + "/realName/allRealNameUserList").query({
                token: app.$user.token,
                sellChannel: 7
            }).end().then(function(e) {
                return e.body;
            }).then(function(t) {
                var a = t.data, i = t.code, r = t.msg;
                if (200 === i && a) {
                    var s = e.formatRealName(a);
                    e.setData({
                        realNameList: s,
                        realNameListLoading: !1
                    }), e.triggerEvent("getRealNameList", s);
                } else e.triggerEvent("submitError", r);
                e.setData({
                    realNameListLoading: !1
                }), wx.hideToast();
            });
        },
        formatRealName: function(e) {
            if (!!e) return e.map(function(e) {
                var t = e.idNumber, a = e.userName;
                return e.id, e.idNumberDisplay = t, e.userNameDisplay = a, e;
            });
        },
        selectRealName: function(e) {
            if (this.data.selected) {
                var t = e.currentTarget.dataset.index, a = this.data.realNameList[t].isSelected;
                this.data.realNameList[t].isSelected = !a, this.setData({
                    realNameList: this.data.realNameList
                }), this.triggerEvent("selectEvent", this.data.realNameList[t]);
            }
        },
        handelRemove: function(e) {
            var t = this;
            return app.wx2promiseify(wx.showModal, {
                title: "提示",
                content: "确定删除此用户？",
                cancelText: "取消",
                confirmText: "确定"
            }).then(function(a) {
                a.confirm && t.deleteRealnameItem(e);
            });
        },
        deleteRealnameItem: function(e) {
            var t = this, a = e.currentTarget.dataset.index, i = this.data.PREFIX;
            wx.showToast({
                icon: "loading",
                title: "删除中..."
            }), app.request().post(i + "/realName/deleteRealNameUser").query({
                sellChannel: 7,
                token: app.$user.token
            }).send({
                id: this.data.realNameList[a].id
            }).end().then(function(e) {
                return e.body;
            }).then(function(e) {
                var i = e.code, r = e.msg;
                wx.hideToast(), 200 !== i ? t.triggerEvent("submitError", r) : (t.data.realNameList.splice(a, 1), 
                t.setData({
                    realNameId: 0,
                    realNameList: t.data.realNameList
                }), t.triggerEvent("getRealNameList", t.data.realNameList));
            });
        },
        editRealName: function(e) {
            var t = this, a = e.currentTarget.dataset.index;
            store.set("_realname_edit_info", {
                id: this.data.realNameList[a].id,
                userName: this.data.realNameList[a].userName,
                idNumber: this.data.realNameList[a].idNumber,
                default: this.data.realNameList[a].default
            }), this.triggerEvent("editRealName", e), setTimeout(function() {
                wx.navigateTo({
                    url: "/pages/showsubs/general-info/realname?id=" + t.data.pid + "&activeTab=1"
                });
            }, 100);
        }
    }
});