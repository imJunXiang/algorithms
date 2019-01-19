var num2letter = function(n) {
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n);
}, char2num = function(n, t) {
    return "string" == typeof n ? n.charCodeAt(t) : n instanceof Uint8Array ? n[t] : 0;
}, genUuid = function(n) {
    for (var t = [], r = 0, e = n.length, u = 0, c = 0; c < e; ++c) 3 === (r += 1) && (r = 0), 
    u = char2num(n, c), 0 === r ? t.push(num2letter(63 & (char2num(n, c - 1) << 2 | u >> 6)), num2letter(63 & u)) : 1 === r ? t.push(num2letter(u >> 2 & 63)) : t.push(num2letter(63 & (char2num(n, c - 1) << 4 | u >> 4))), 
    c === e - 1 && r > 0 && t.push(num2letter(u << (3 - r << 1) & 63));
    return t.join("");
};

module.exports = {
    genUuid: genUuid
};