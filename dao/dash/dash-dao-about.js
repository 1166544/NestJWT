var mysql = require("mysql");
var conf = require("../../conf/db");
var code = require("../../conf/code");
var util = require("../../util/util");
var sql = require("./dash-sql-maping");

// 建立连接
var pool = mysql.createPool(util.extend({}, conf.mysql));

module.exports = {
    getAboutData : getAboutData
}

/**
 * 获取about
 * @param req
 * @param res
 * @param next
 */
function getAboutData(req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query(sql.queryAboutData, function (err, result) {
            util.jsonWrite(res, result);
            connection.release();
        });
    });
}