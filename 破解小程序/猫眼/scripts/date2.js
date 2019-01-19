function Date2(t) {
    if (!(this instanceof Date2)) return new Date2(t);
    switch (t instanceof Date && (this.date = t), void 0 === t ? "undefined" : _typeof(t)) {
      case "string":
        this.date = this.parse(t);
        break;

      case "object":
        this.date = this.create(t);
        break;

      default:
        this.date = new Date(t || null), this.bjDate = new Date(t + 60 * (new Date().getTimezoneOffset() + 480) * 1e3);
    }
    this.bjDate || (this.bjDate = this.date);
}

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

Date2.prototype.parse = function(t, e) {
    var a = {}, r = {
        fullYear: 1,
        year: 2,
        month: 3,
        date: 4,
        time: 5,
        hour: 6,
        minute: 7,
        second: 8
    }, o = /((\d{4})-(\d{2})-(\d{2}))?\s?((\d{2}):(\d{2}):(\d{2}))?/.exec(t);
    for (var n in r) o[r[n]] && (a[n] = o[r[n]]);
    return this.create(a);
}, Date2.prototype.create = function(t) {
    var e = +t.year, a = +t.month - 1, r = +t.date, o = +t.hour, n = +t.minute, s = +t.second, i = new Date(0);
    return e && i.setYear(e), a && i.setMonth(a), r && i.setDate(r), o && i.setHours(o), 
    n && i.setMinutes(n), s && i.setSeconds(s), i;
}, Date2.prototype.bjNow = function() {
    return new Date(Date.now() + 60 * (new Date().getTimezoneOffset() + 480) * 1e3);
}, Date2.prototype.toString = function(t) {
    var e = this;
    if (void 0 === t) return this.bjDate.toString();
    var a = this, r = {
        "M+": this.bjDate.getMonth() + 1,
        "d+": this.bjDate.getDate(),
        "h+": this.bjDate.getHours() % 12 == 0 ? 12 : this.bjDate.getHours() % 12,
        "H+": this.bjDate.getHours(),
        "m+": this.bjDate.getMinutes(),
        "s+": this.bjDate.getSeconds(),
        "q+": Math.floor((this.bjDate.getMonth() + 3) / 3),
        S: this.bjDate.getMilliseconds(),
        E: function() {
            var t = a.bjNow(), e = a.bjDate.getDay(), r = Math.floor((new Date(+a.bjDate).setHours(0, 0, 0, 0) - t.setHours(0, 0, 0, 0)) / 864e5), o = [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ];
            return [ "今天" ][r] || (0 === e || 6 === e) && r < 7 && o[e] || [ "", "明天", "后天" ][r] || t.getDay() <= e && r < 7 && o[e] || "";
        }(),
        T: function() {
            var t = a.bjNow(), r = t - a.bjDate.getTime();
            if (r < 6e4) return "刚刚";
            if (r < 36e5) return Math.floor(r / 6e4) + "分钟前";
            if (r < 864e5) return Math.floor(r / 36e5) + "小时前";
            if (r < 6048e5) return Math.floor(r / 864e5) + "天前";
            var o = e.bjDate.getMonth() + 1, n = e.bjDate.getDate(), s = (o < 10 ? "0" + o : o) + "-" + (n < 10 ? "0" + n : n);
            return e.bjDate.getFullYear() === t.getFullYear() ? s : e.bjDate.getFullYear() + "-" + s;
        }()
    };
    /(y+)/.test(t) && (t = t.replace(RegExp.$1, (this.bjDate.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var o in r) new RegExp("(" + o + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? r[o] : ("00" + r[o]).substr(("" + r[o]).length)));
    return t;
}, module.exports = Date2;