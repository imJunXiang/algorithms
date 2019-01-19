Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../lib/base64.min.js").Base64, n = function(e) {
    return "" + "https://webapi2.qingbh.com/manman/index.php/api/" + e + "?platform=h5&ver=4.0.0.0002&deviceid=xiaochengxu&channel=30006&product=1";
}, r = require("../lib/md5.js"), o = function(e, o) {
    var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "-", i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], a = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
    return new Promise(function(c, u) {
        i && wx.showLoading({
            title: "加载中..."
        }), e = n(e);
        var s = function(e) {
            var n = "", r = function(e) {
                var n = new Array(), r = 0;
                for (var o in e) void 0 !== e[o] && (n[r] = o, r++);
                var t = n.sort(), i = {};
                for (var a in t) i[t[a]] = e[t[a]];
                return i;
            }(e);
            for (var o in r) n += o + r[o];
            return n + "#^%$&^@&)_+&%<<>?<,.asdaaaAAbefwfnnkpp{poQBEaNw>,LIipo";
        }(o);
        s = r.hexMD5(function(e) {
            for (var n = "", r = 0; r < e.length; r++) {
                var o = e.charCodeAt(r);
                o < 128 ? n += String.fromCharCode(o) : o < 2048 ? (n += String.fromCharCode(o >> 6 | 192), 
                n += String.fromCharCode(63 & o | 128)) : o < 65536 ? (n += String.fromCharCode(o >> 12 | 224), 
                n += String.fromCharCode(o >> 6 & 63 | 128), n += String.fromCharCode(63 & o | 128)) : (n += String.fromCharCode(o >> 18 | 240), 
                n += String.fromCharCode(o >> 12 & 63 | 128), n += String.fromCharCode(o >> 6 & 63 | 128), 
                n += String.fromCharCode(63 & o | 128));
            }
            return n;
        }(s)), o.sign = s, console.log("请求地址: " + e + ", 传递参数: ", o, " :信息: " + t), wx.request({
            method: "POST",
            url: e,
            data: o,
            success: function(e) {
                i && wx.hideLoading(), console.log("信息: " + t + ", 返回数据: ", e.data), c(e.data);
            },
            fail: function(n) {
                console.log("请求出现错误, 请求地址: " + e, " --错误信息--", n), a ? u(n) : wx.showModal({
                    title: "加载超时",
                    content: n.errMsg,
                    showCancel: !1,
                    confirmText: "知道了"
                });
            }
        });
    });
};

exports._post = o, exports.formatTime = function(e) {
    var n = function(e) {
        return (e = e.toString())[1] ? e : "0" + e;
    }, r = e.getFullYear(), o = e.getMonth() + 1, t = e.getDate(), i = e.getHours(), a = e.getMinutes();
    e.getSeconds();
    return [ r, o, t ].map(n).join("-") + " " + [ i, a ].map(n).join(":");
}, exports.cleantime = function(e) {
    var n = Math.floor(e / 3600 / 24), r = n.toString();
    1 == r.length && (r = "0" + r);
    var o = Math.floor((e - 3600 * n * 24) / 3600), t = o.toString();
    1 == t.length && (t = "0" + t);
    var i = Math.floor((e - 3600 * n * 24 - 3600 * o) / 60), a = i.toString();
    1 == a.length && (a = "0" + a);
    var c = (e - 3600 * n * 24 - 3600 * o - 60 * i).toString();
    return 1 == c.length && (c = "0" + c), r + "天" + t + ":" + a + ":" + c;
}, exports.loginFn = function(n, r) {
    return new Promise(function(t, i) {
        var a = wx.getStorageSync("tempuid");
        new Promise(function(t, i) {
            if ("wechat" == n) {
                var c = r.userinfo, u = r.wxlogin;
                o("v1/user/wx_user_allow", {
                    appid: "wx6d524f663016a604",
                    encryptedData: c.encryptedData,
                    iv: c.iv,
                    code: u.code
                }, "发送后台解密").then(function(n) {
                    var r = n.unionId, c = n.openId, u = {
                        uid: a,
                        nickname: e.encode(n.nickName),
                        sex: n.sex ? n.sex : "",
                        city: n.city,
                        province: n.province,
                        country: n.country,
                        headimgurl: n.avatarUrl,
                        unionid: r,
                        wopenid: c
                    };
                    o("v1/user/user_tempweixin_login", u, "微信登录").then(function(e) {
                        0 != e.error ? i("01 " + e.errorMsg) : t(e);
                    });
                });
            } else o("v1/user/user_login_sms_verify", {
                phone: r.phone,
                uid: a,
                code: r.code
            }, "手机号登陆").then(function(e) {
                0 != e.error ? i("02 " + e.errorMsg) : t(e);
            });
        }).then(function(e) {
            var o = e.usermessage, i = "" == o.headurl ? "" == e.headimgurl ? "/images/" + r.iconsrc + "/logo.png" : e.headimgurl : o.headurl, a = "" == o.nickname ? "wechat" == n ? e.nickname : e.phone : o.nickname, c = {
                login_type: n,
                uid: e.uid,
                headurl: i,
                nickname: a
            };
            wx.setStorageSync("3rd_session", c), t();
        }).catch(function(e) {
            wx.showModal({
                title: "登录失败",
                content: "错误信息: " + e + " \r\n 微信登录暂时出现问题，可选择手机登录",
                cancelText: "取消",
                confirmText: "手机登录",
                success: function(e) {
                    console.log(e), e.confirm && wx.redirectTo({
                        url: "/pages/phoneLogin/phoneLogin"
                    });
                }
            });
        });
    });
};