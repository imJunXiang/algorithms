function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.sign = void 0;

var _md = require("../../scripts/md5"), _md2 = _interopRequireDefault(_md);

exports.default = null;

var sign = exports.sign = function(e) {
    var t = "", r = Object.assign({
        key: "xuanwu"
    }, e);
    return Object.keys(r).sort().forEach(function(e) {
        t += r[e];
    }), (0, _md2.default)(t);
};