var stats = require("../scripts/stats");

module.exports = {
    mge_bid: "b_xmm5sgjk",
    mpt_bid: "b_cy70t5em",
    props: {
        val_cid: "c_hw1gt8n5"
    },
    initStats: function(t) {
        stats({
            channel: "rediantong",
            appnm: t.lxAppname || t.appName,
            noPending: !0,
            uid: function() {
                return t.$user.userId;
            }
        })(this.props);
    }
};