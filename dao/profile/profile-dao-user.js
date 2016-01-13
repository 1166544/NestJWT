var mysql = require("mysql");
var conf = require("../../conf/db");
var code = require("../../conf/code");
var util = require("../../util/util");
var sql = require("./profile-sql-maping");

// 建立连接
var pool = mysql.createPool(util.extend({}, conf.mysql));

module.exports = {
    getUser : getUser
}

/**
 * 查找用户详细信息
 * @param req
 * @param res
 * @param next
 */
function getUser(req, res, next) {
    var id = req.query.id;
    pool.getConnection(function (err, connection) {
        connection.query(sql.getUser, id, function (err, result) {
            util.jsonWrite(res, result);
            connection.release();
        });
    });
};