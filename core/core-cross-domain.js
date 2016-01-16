module.exports = {
    setDomain : setDomain
}

function setDomain(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("X-Powered-By", "james-remote");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
}