var init;

exports = module.exports = {
    params: function(t, e) {
        var n = getApp(), o = init || {}, i = function(t) {
            o.latitude && !t.latitude || (o.latitude = t.latitude, o.longitude = t.longitude, 
            o.speed = null != t.speed ? t.speed : -1, o.accuracy = null != t.accuracy ? t.accuracy : -1);
        };
        if (n.$location && n.$location.latitude && i(n.$location), n.$location && i(n.$location), 
        init || (o.networkType = "unknow"), wx.getNetworkType({
            success: function(t) {
                o.networkType = t.networkType;
            }
        }), !init) {
            var a = function(t) {
                o.model = t.model, o.pixelRatio = t.pixelRatio, o.windowWidth = t.windowWidth, o.windowHeight = t.windowHeight, 
                o.language = t.language, o.version = t.version, o.system = t.system, o.platform = t.platform;
            };
            n.$systemInfo && n.$systemInfo.model ? a(n.$systemInfo) : n.systemInfo().then(a), 
            wx.onAccelerometerChange(function(t) {
                o.x = t.x, o.y = t.y, o.z = t.z;
            }), wx.onCompassChange(function(t) {
                o.direction = t.direction;
            });
        }
        if (o.touchPoint = "", t) {
            var r;
            try {
                r = t.detail.x + "," + t.detail.y;
            } catch (t) {}
            try {
                r = r || t.touches[0].pageX + "," + t.touches[0].pageY;
            } catch (t) {}
            try {
                r = r || t.touches[0].x + "," + t.touches[0].y;
            } catch (t) {}
            null == r && (r = "string" == typeof t ? t : JSON.stringify(t)), r && (o.touchPoint = r);
        }
        o.app_name = "group", o.user_type = "wx", init = o;
        var c = function() {
            "function" == typeof e && (e(o), e = null);
        }, u = n.getUser();
        u && u.openId && function(t) {
            var e = t.userInfo || (t.wxUserInfo && t.wxUserInfo.userInfo ? t.wxUserInfo.userInfo : {});
            o.openid = t.openId, o.gender = e.gender, o.city = e.city, o.province = e.province, 
            o.country = e.country, o.avatarUrl = e.avatarUrl, o.unionId = "{{ unionId }}", setTimeout(c, 50);
        }(n.$user), setTimeout(c, 700);
    }
};