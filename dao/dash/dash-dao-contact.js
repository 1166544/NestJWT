var mysql   = require("mysql");
var conf    = require("../../conf/db");
var code    = require("../../conf/code");
var util    = require("../../util/util");
var sql     = require("./dash-sql-maping");

// 建立连接
var pool = mysql.createPool(util.extend({}, conf.mysql));

module.exports = {
    getContactData : getContactData
}

/**
 * 获取contact
 * @param req
 * @param res
 * @param next
 */
function getContactData(req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query(sql.queryContactData, function (err, result) {
            util.jsonWrite(res, result);
            connection.release();
        });
    });
}