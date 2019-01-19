function encryptRealname(e) {
    var r = e;
    return [ 2, 3 ].includes(e.length) ? r = "*" + e.substring(1) : e.length > 3 && (r = "*" + e.slice(-2)), 
    r;
}

function encryptIDNumber(e) {
    if (e.length > 8) {
        return e.slice(0, 3) + "**********" + e.slice(-4);
    }
    return e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.encryptRealname = encryptRealname, exports.encryptIDNumber = encryptIDNumber;