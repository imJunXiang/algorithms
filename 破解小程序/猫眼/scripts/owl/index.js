function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _classCallCheck(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

function request(e) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : owl;
    return (0, _request2.default)(e, r);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.OWL = exports.owl = void 0;

var _createClass = function() {
    function e(e, r) {
        for (var n = 0; n < r.length; n++) {
            var t = r[n];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(r, n, t) {
        return n && e(r.prototype, n), t && e(r, t), r;
    };
}();

exports.request = request;

var _index = require("./error/index"), _index2 = _interopRequireDefault(_index), _index3 = require("./resource/index"), _index4 = _interopRequireDefault(_index3), _request = require("./resource/request"), _request2 = _interopRequireDefault(_request), _index5 = require("./page/index"), _index6 = _interopRequireDefault(_index5), _index7 = require("./metric/index"), _index8 = _interopRequireDefault(_index7), _index9 = require("./log/index"), _index10 = _interopRequireDefault(_index9), _config = require("./config"), _config2 = _interopRequireDefault(_config), _env = require("./env"), _model = require("./error/model"), _model2 = _interopRequireDefault(_model), _logan = require("./util/logan"), _logan2 = _interopRequireDefault(_logan), OWL = function() {
    function e(r) {
        _classCallCheck(this, e);
        var n = new _config2.default(r);
        this.error = new _index2.default(n), this.resource = new _index4.default(n, this.error), 
        this.pageSpeed = new _index6.default(n), this.logManager = new _index10.default(n), 
        this.cfgManager = n, this.init();
    }
    return _createClass(e, [ {
        key: "init",
        value: function() {
            var e = this;
            (0, _env.getEnv)().then(function(r) {
                e.cfgManager.setExtension(r);
            });
        }
    }, {
        key: "newMetric",
        value: function() {
            return new _index8.default(this.cfgManager);
        }
    }, {
        key: "report",
        value: function() {
            this.error.report(), this.resource.report(), this.pageSpeed.report();
        }
    } ]), e;
}(), owl = new OWL({});

owl.OWL = OWL, owl.errorModel = _model2.default, owl.start = function(e) {
    if (!this.isStarted && (this.isStarted = !0, e && owl.cfgManager.set(e), this.cfgManager.get("logan").enable)) {
        var r = this.cfgManager.get("logan").Logan, n = this.cfgManager.get("logan").config, t = this.cfgManager.get("project");
        _logan2.default.ready({
            LoganAPI: r,
            project: t,
            loganConfig: n
        });
    }
}, exports.owl = owl, exports.OWL = OWL;