function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var _user = require("../../../../scripts/show/user"), _user2 = _interopRequireDefault(_user), app = getApp();

Component({
    properties: {
        list: {
            type: Array,
            value: [],
            observer: function(e) {
                var t = this;
                this.setData({
                    selectedIDList: e.map(function(e) {
                        return t.data.selected.some(function(t) {
                            return t.id === e.id;
                        }) && (e.isSelected = !0), e;
                    })
                });
            }
        },
        selected: {
            type: Array,
            value: [],
            observer: function(e) {
                this.setData({
                    selected: e,
                    selectedIDList: this.data.list.map(function(t) {
                        return e.some(function(e) {
                            return e.id === t.id;
                        }) && (t.isSelected = !0), t;
                    })
                });
            }
        },
        count: {
            type: Number,
            value: 1
        }
    },
    data: {
        selectedIDList: []
    },
    methods: {
        onModifyClick: function(e) {
            this.triggerEvent("modify");
        },
        onRealnameSelect: function(e) {
            var t = e.currentTarget.dataset.index, i = this.data.list[t].id;
            this.data.selected.find(function(e) {
                return e.id === i;
            }) ? this.triggerEvent("unselectRealname", t) : this.data.selected.length >= this.data.count ? wx.showToast({
                title: "购票人已经选满了~",
                icon: "none"
            }) : this.triggerEvent("selectRealname", t);
        }
    }
});