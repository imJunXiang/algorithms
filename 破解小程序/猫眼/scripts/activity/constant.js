var STATUS = {
    OK: 0,
    UNGRADE: 1,
    END: 3,
    UNBEGIN: 4,
    OFFLINE: 5
}, REPORTSTATUS = {
    0: "参与活动",
    1: "等级不足",
    3: "已结束",
    4: "即将开始",
    5: "已下线"
};

module.exports = {
    STATUS: STATUS,
    REPORTSTATUS: REPORTSTATUS
};