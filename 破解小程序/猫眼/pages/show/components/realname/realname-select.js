function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var _user = require("../../../../scripts/show/user"), _user2 = _interopRequireDefault(_user), app = getApp();

Component({
    properties: {
        count: {
            type: Number,
            value: 1
        },
        list: {
            type: Array,
            value: []
        },
        selected: {
            type: Array,
            value: [],
            observer: function(e) {
                this.setData({
                    selectedIDList: this.data.list.map(function(t) {
                        return e.some(function(e) {
                            return e.id === t.id;
                        }) ? t.isSelected = !0 : t.isSelected && delete t.isSelected, t;
                    })
                });
            }
        }
    },
    data: {
        max: 10,
        selectedIDList: []
    },
    methods: {
        onSubmit: function(e) {
            var t = this.data, a = t.selected, n = t.list;
            if (a.length < this.data.count) return wx.showToast({
                title: "请提交 " + this.data.count + " 位购票人",
                icon: "none"
            });
            this.triggerEvent("submit", {
                selectedRealnameList: a,
                realnameList: n
            });
        },
        onAddTap: function(e) {
            this.data.selectedIDList.length >= this.data.max ? wx.showToast({
                title: "最多添加 10 个购票人，若需新增，请删除或修改",
                icon: "none"
            }) : this.triggerEvent("realnameAdd");
        },
        onEditTap: function(e) {
            var t = e.currentTarget.dataset.index;
            this.triggerEvent("realnameEdit", this.data.list[t]);
        },
        onDelTap: function(e) {
            var t = this, a = e.currentTarget.dataset.index;
            return app.wx2promiseify(wx.showModal, {
                title: "提示",
                content: "确定删除此用户？",
                cancelText: "取消",
                confirmText: "确定"
            }).then(function(e) {
                e.confirm && app.request().config("loading", 1).post("https://wx.maoyan.com/maoyansh/myshow/ajax/realName/deleteRealNameUser").query({
                    sellChannel: 7,
                    token: app.$user.token
                }).send({
                    id: t.data.list[a].id
                }).end().then(function(e) {
                    return e.body;
                }).then(function(e) {
                    var n = e.code, i = e.msg;
                    wx.hideToast(), 200 !== n ? wx.showToast({
                        icon: "loading",
                        title: i
                    }) : t.triggerEvent("realnameDel", a);
                });
            });
        },
        isSelected: function(e) {
            return this.data.selectedIDList.some(function(t) {
                return t.id === e && t.isSelected;
            });
        },
        onRealnameSelect: function(e) {
            var t = e.currentTarget.dataset.index, a = this.data.list[t];
            this.isSelected(a.id) ? this.setData({
                selected: this.data.selected.filter(function(e) {
                    return e.id !== a.id;
                })
            }) : this.data.selected.length >= this.data.count ? wx.showToast({
                title: "购票人已经选满了~",
                icon: "none"
            }) : this.setData({
                selected: this.data.selected.concat(a)
            });
        }
    }
});