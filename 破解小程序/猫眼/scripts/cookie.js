function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function getParam(e, t) {
    var r = _store2.default.get(e);
    if (r && t) {
        return (parse(r) || {})[t];
    }
    if (r) return r;
}

function setParam(e, t) {
    _store2.default.set(e, t);
}

function parse(e, t) {
    if ("string" != typeof e) throw new TypeError("argument str must be a string");
    for (var r = {}, i = t || {}, o = e.split(pairSplitRegExp), a = i.decode || decode, n = 0; n < o.length; n++) {
        var s = o[n], p = s.indexOf("=");
        if (!(p < 0)) {
            var u = s.substr(0, p).trim(), f = s.substr(++p, s.length).trim();
            '"' == f[0] && (f = f.slice(1, -1)), void 0 == r[u] && (r[u] = tryDecode(f, a));
        }
    }
    return r;
}

function serialize(e, t, r) {
    var i = r || {}, o = i.encode || encode;
    if ("function" != typeof o) throw new TypeError("option encode is invalid");
    if (!fieldContentRegExp.test(e)) throw new TypeError("argument name is invalid");
    var a = o(t);
    if (a && !fieldContentRegExp.test(a)) throw new TypeError("argument val is invalid");
    var n = e + "=" + a;
    if (null != i.maxAge) {
        var s = i.maxAge - 0;
        if (isNaN(s)) throw new Error("maxAge should be a Number");
        n += "; Max-Age=" + Math.floor(s);
    }
    if (i.domain) {
        if (!fieldContentRegExp.test(i.domain)) throw new TypeError("option domain is invalid");
        n += "; Domain=" + i.domain;
    }
    if (i.path) {
        if (!fieldContentRegExp.test(i.path)) throw new TypeError("option path is invalid");
        n += "; Path=" + i.path;
    }
    if (i.expires) {
        if ("function" != typeof i.expires.toUTCString) throw new TypeError("option expires is invalid");
        n += "; Expires=" + i.expires.toUTCString();
    }
    if (i.httpOnly && (n += "; HttpOnly"), i.secure && (n += "; Secure"), i.sameSite) {
        switch ("string" == typeof i.sameSite ? i.sameSite.toLowerCase() : i.sameSite) {
          case !0:
            n += "; SameSite=Strict";
            break;

          case "lax":
            n += "; SameSite=Lax";
            break;

          case "strict":
            n += "; SameSite=Strict";
            break;

          default:
            throw new TypeError("option sameSite is invalid");
        }
    }
    return n;
}

function tryDecode(e, t) {
    try {
        return t(e);
    } catch (t) {
        return e;
    }
}

var _store = require("../scripts/store"), _store2 = _interopRequireDefault(_store), app = getApp(), decode = decodeURIComponent, encode = encodeURIComponent, pairSplitRegExp = /; */, fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

module.exports.setParam = setParam, module.exports.getParam = getParam, module.exports.parse = parse, 
module.exports.serialize = serialize;