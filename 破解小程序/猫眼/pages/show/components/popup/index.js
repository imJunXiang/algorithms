function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var _user = require("../../../../scripts/show/user"), _user2 = _interopRequireDefault(_user), store = require("../../../../scripts/store"), app = getApp();

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        info: {
            type: Object,
            value: null,
            observer: function(t) {
                var e = this.data.history, s = e[e.length - 1];
                (s && s.type) !== t.type && (e.push(t), this.setData({
                    history: e
                }));
            }
        }
    },
    data: {
        hasMask: !0,
        history: []
    },
    methods: {
        onBackTap: function() {
            var t = this.data.history;
            t.pop(), this.setData({
                history: t
            }), this.triggerEvent("flip", this._getTopOfHistory());
        },
        onCloseTap: function() {
            this.triggerEvent("tapclose"), this._clearHistory();
        },
        _clearHistory: function() {
            this.setData({
                history: []
            });
        },
        _getTopOfHistory: function() {
            return this.data.history[this.data.history.length - 1];
        }
    }
});