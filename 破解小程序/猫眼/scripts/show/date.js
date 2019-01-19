function formatDate(e, t) {
    var r = new Date(e);
    return r.getFullYear() + "年" + (r.getMonth() + 1) + "月" + r.getDate() + "日";
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = formatDate;