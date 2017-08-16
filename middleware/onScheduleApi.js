module.exports = function (options) {
    return function (req, res, next) {
        console.log("Hello Middleware");
        next();
    }
}