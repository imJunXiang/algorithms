function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var _aes = require("./aes"), _aes2 = _interopRequireDefault(_aes), AesUtil = function(e, t) {
    this.keySize = e / 32, this.iterationCount = t;
};

AesUtil.prototype.generateKey = function(e, t) {
    return _aes2.default.PBKDF2(t, _aes2.default.enc.Hex.parse(e), {
        keySize: this.keySize,
        iterations: this.iterationCount
    });
}, AesUtil.prototype.encrypt = function(e, t, a, r) {
    var i = this.generateKey(e, a);
    return _aes2.default.AES.encrypt(r, i, {
        iv: _aes2.default.enc.Hex.parse(t)
    }).ciphertext.toString(_aes2.default.enc.Base64);
}, AesUtil.prototype.decrypt = function(e, t, a, r) {
    var i = this.generateKey(e, a), s = _aes2.default.lib.CipherParams.create({
        ciphertext: _aes2.default.enc.Base64.parse(r)
    });
    return _aes2.default.AES.decrypt(s, i, {
        iv: _aes2.default.enc.Hex.parse(t)
    }).toString(_aes2.default.enc.Utf8);
}, module.exports = AesUtil;