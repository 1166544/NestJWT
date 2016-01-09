var mysql = require("mysql");
var conf = require("../../conf/db");
var code = require("../../conf/code");
var util = require("../../util/util");
var sql = require("./dash-sql-maping");

// 连接池
var pool = mysql.createPool(util.extend({}, conf.mysql));

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
    var type = req.query.type;
    if (type === "top") {
        // 顶部数据
        pool.getConnection(function (err, connection) {
            connection.query(sql.querySideItemTopData, function (err, result) {
                util.jsonWrite(res, result);
                connection.release();
            });
        });
    }
    else {
        // 底部数据
        pool.getConnection(function (err, connection) {
            connection.query(sql.querySideItemBottomData, function (err, result) {
                util.jsonWrite(res, result);
                connection.release();
            });
        });
    }
    
};