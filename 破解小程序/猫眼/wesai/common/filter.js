function itemStatusHeadTag(e) {
    var t = "";
    switch (e) {
      case 1:
        t = "不可售";
        break;

      case 2:
      case 3:
        t = "售票中";
        break;

      case 4:
        t = "预约";
        break;

      case 5:
        t = "售票中";
        break;

      case 6:
        t = "预约";
    }
    return t;
}

function itemStatusFooterBtn(e) {
    var t = "";
    switch (e) {
      case 1:
        t = "不可售";
        break;

      case 2:
      case 3:
        t = "立即购票";
        break;

      case 4:
        t = "预约";
        break;

      case 5:
        t = "立即购票";
        break;

      case 6:
        t = "预约";
    }
    return t;
}

function formatTime(e) {
    return e < 259200 ? Math.floor(e / 3600) + "时" + Math.floor(e % 3600 / 60) + "分" + Math.floor(e % 60) + "秒" : Math.floor(e / 86400) + "天" + Math.floor(e % 86400 / 3600) + "时" + Math.floor(e % 86400 % 3600 / 60) + "分";
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.itemStatusHeadTag = itemStatusHeadTag, exports.itemStatusFooterBtn = itemStatusFooterBtn, 
exports.formatTime = formatTime;