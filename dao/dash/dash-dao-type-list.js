var mysql   = require("mysql");
var conf    = require("../../conf/db");
var code    = require("../../conf/code");
var util    = require("../../util/util");
var sql     = require('./dash-sql-maping');

// 建立连接
var pool = mysql.createPool(util.extend({}, conf.mysql));

module.exports = {
    getTypeListData : getTypeListData
}

/**
 * 获取主面板中间部份列表数据
 * @param req
 * @param res
 * @param next
 */
function getTypeListData(req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query(sql.queryTypeListData, 2, function (err, result) {
            util.jsonWrite(res, result);
            connection.release();
        });
    });
};