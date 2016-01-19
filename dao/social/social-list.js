var mysql   = require("mysql");
var conf    = require("../../conf/db");
var code    = require("../../conf/code");
var util    = require("../../util/util");
var sql     = require('./social-sql-maping');

// 建立连接
var pool = mysql.createPool(util.extend({}, conf.mysql));

module.exports = {
    getSocialListData : getSocialListData
}

/**
 * 获取SOCIAL SUBJECT数据
 * @param req
 * @param res
 * @param next
 */
function getSocialListData(req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query(sql.getSocialListData, function (err, result) {
            util.jsonWrite(res, result);
            connection.release();
        });
    });
};