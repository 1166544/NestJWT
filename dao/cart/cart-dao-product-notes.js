var mysql = require("mysql");
var conf = require("../../conf/db");
var code = require("../../conf/code");
var util = require("../../util/util");
var sql = require("./cart-sql-maping");

// 建立连接
var pool = mysql.createPool(util.extend({}, conf.mysql));

module.exports = {
    getProductNotesData : getProductNotesData
}

/**
 * 获取详细好中差评数据
 * @param req
 * @param res
 * @param next
 */
function getProductNotesData(req, res, next) {
    var linkId = req.query.linkId;
    var type = req.query.type;
    pool.getConnection(function (err, connection) {
        connection.query(sql.getProductDetailNote, [linkId, type], function (err, result) {
            util.jsonWrite(res, result);
            connection.release();
        });
    });
}