module.exports = {
    parseError : parseError
}

function parseError(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
}