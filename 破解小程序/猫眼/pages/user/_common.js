module.exports = {
    back: function() {
        var e = getApp();
        this._options.path ? (delete e._loginReturnUrl, wx.redirectTo({
            url: decodeURIComponent(this._options.path)
        })) : e._loginReturnUrl && e._page5 ? wx.redirectTo({
            url: decodeURIComponent(e._loginReturnUrl)
        }) : wx.navigateBack();
    },
    updateAppUser: function(e) {
        var o = e.token, r = e.userId, t = e.mobile, n = getApp();
        n.$user.token = o, n.$user.userId = r, n.$user.mobile = t || this.data.inputMobile, 
        n.$user.isBindMobile = !0, n.$user.openId = n.$openId, n.$user.wxUserInfo = n.$wxUserInfo || {}, 
        n.saveUser();
    }
};