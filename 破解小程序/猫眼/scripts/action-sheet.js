var apiConfig = require("./api-config"), _require = require("./config"), setEnv = _require.setEnv, user = require("./user"), actionSheet = [];

module.exports = {
    getActionSheet: function() {
        return actionSheet = [ {
            get desc() {
                return ("develpment" === apiConfig.getApiEnv() ? ">> " : "") + "切换到dev环境";
            },
            action: function() {
                apiConfig.setApiEnv("develpment"), setEnv("develpment");
            }
        }, {
            get desc() {
                return ("test" === apiConfig.getApiEnv() ? ">> " : "") + "切换到test环境";
            },
            action: function() {
                apiConfig.setApiEnv("test"), setEnv("test");
            }
        }, {
            get desc() {
                return ("staging" === apiConfig.getApiEnv() ? ">> " : "") + "切换到staging环境";
            },
            action: function() {
                apiConfig.setApiEnv("staging"), setEnv("staging");
            }
        }, {
            get desc() {
                return ("prod" === apiConfig.getApiEnv() ? ">> " : "") + "切换到prod环境";
            },
            action: function() {
                apiConfig.setApiEnv("prod"), setEnv("prod");
            }
        }, {
            desc: "清除登录信息",
            action: user.logout
        }, {
            desc: "打开debug面板",
            action: function() {
                getApp().goto("/pages/debug/index");
            }
        } ], actionSheet.map(function(t) {
            return t.desc;
        });
    },
    invokeAction: function(t) {
        actionSheet[t].action();
    }
};