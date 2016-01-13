var mysql = require("mysql");
var conf = require("../../conf/db");
var code = require("../../conf/code");
var util = require("../../util/util");
var sql = require("./dash-sql-maping");

module.exports = {
    getSideItemData : getSideItemData
}

/**
 * 获取主页面上下部份数据
 * @param req
 * @param res
 * @param next
 */
function getSideItemData(req, res, next) {
    var type = req.query.direction;
    if (type === "top") {
        // 顶部数据
        var pool = mysql.createPool(util.extend({}, conf.mysql));
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryTypeListData, 0, function (err, result) {
                util.jsonWrite(res, result);
                connection.release();
            });
        });
    }
    else {
        // 底部数据
        var pool = mysql.createPool(util.extend({}, conf.mysql));
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryTypeListData, 1, function (err, result) {
                util.jsonWrite(res, result);
                connection.release();
            });
        });
    }
    
};