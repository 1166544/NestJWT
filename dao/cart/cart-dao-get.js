var mysql   = require("mysql");
var conf    = require("../../conf/db");
var code    = require("../../conf/code");
var util    = require("../../util/util");
var sql     = require("./cart-sql-maping");

// 建立连接
var pool = mysql.createPool(util.extend({}, conf.mysql));

module.exports = {
    getCartData : getCartData
}

/**
 * 获取购物车数据
 * @param req
 * @param res
 * @param next
 */
function getCartData(req, res, next) {
    
    var userId = req.query.userId;
    pool.getConnection(onConnected);
    
    function onConnected(err, connection) {
        connection.query(sql.getCartData, userId, onListResult);
        
        function onListResult(err, result) {
            util.jsonWrite(res, result);
            connection.release();
        }
    }

}