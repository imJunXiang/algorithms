var app = getApp();

module.exports = {
    showModal: function(p) {
        app.emit("SHOW_MODAL", p);
    },
    hideModal: function() {
        app.emit("HIDE_MODAL");
    }
};