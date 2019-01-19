String.prototype.includes = String.prototype.includes || function(t) {
    return -1 !== this.indexOf(t);
}, Array.prototype.includes = Array.prototype.includes || function(t) {
    return -1 !== this.indexOf(t);
};