function request(e, t) {
    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : wx.request, o = e.url, s = e.reportError, u = e.isRequest, a = Date.now(), i = e.complete;
    return e.complete = function(r) {
        try {
            var u = r.statusCode, n = void 0 === u ? "500|" : u, l = r.errMsg, d = void 0 === l ? "request:ok" : l, p = Date.now() - a, c = {};
            if (s && "request:fail " !== d) {
                var v = s(r, request) || {}, f = v.log, q = void 0 === f ? "" : f, y = v.code, g = void 0 === y ? 200 : y, m = v.name, C = void 0 === m ? "" : m, b = "";
                (q || C) && (b = "ajaxError"), c = {
                    statusCode: n + "|" + g,
                    logContent: q,
                    firstCategory: b,
                    secondCategory: C || e.url
                };
            }
            t.resource.pushApi(Object.assign({
                timestamp: a,
                requestbyte: 0,
                responsebyte: 0,
                statusCode: n,
                resourceUrl: o,
                responsetime: p
            }, c));
        } finally {
            i && i.apply(this, arguments);
        }
    }, u && r(e), e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = request;