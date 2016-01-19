var mysql   = require("mysql");
var conf    = require("../../conf/db");
var code    = require("../../conf/code");
var util    = require("../../util/util");
var sql     = require("./cart-sql-maping");

// 建立连接
var pool = mysql.createPool(util.extend({}, conf.mysql));

module.exports = {
    getProductListData : getProductListData
}

/**
 * 获取产品信息
 * @param req
 * @param res
 * @param next
 */
function getProductListData(req, res, next) {

    var linkId = req.query.linkId;
    var recData = {};
    pool.getConnection(onConnected);

    function onConnected(err, connection) {
        connection.query(sql.getProductListData, linkId, onListResult);
        
        function onListResult(err, result) {
            recData.listData = result;
            connection.query(sql.getProductSideData, linkId, onSideResult);
        }
        
        function onSideResult(err, result) {
            recData.sideData = result;
            util.jsonWrite(res, recData);
            connection.release();
        }
    }

}