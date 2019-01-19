var app = getApp();

app.MoviePage({
    triggerError: function() {
        throw new Error("test");
    },
    triggerAnotherError: function() {
        throw new Error("lalala");
    },
    gotoIndex: function() {
        app.goto("/pages/movie/index");
    }
});