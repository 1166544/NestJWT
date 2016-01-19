var mysql   = require("mysql");
var conf    = require("../../conf/db");
var code    = require("../../conf/code");
var util    = require("../../util/util");
var sql     = require("./cart-sql-maping");

// 建立连接
var pool = mysql.createPool(util.extend({}, conf.mysql));

module.exports = {
    getProductDetailData : getProductDetailData
}

/**
 * 获取详细产品信息 
 * @param req
 * @param res
 * @param next
 */
function getProductDetailData(req, res, next) {

    var linkId = req.query.linkId;
    var recData = {};
    pool.getConnection(onConnected);

    function onConnected(err, connection) {
        connection.query(sql.getProductDetailData, linkId, onDetailResult);

        function onDetailResult(err, result) {
            recData = result[0];
            connection.query(sql.getProductDetailSideData, linkId, onSideResult);
        }

        function onSideResult(err, result){
            recData.sideShowList = result;
            util.jsonWrite(res, recData);
            connection.release();
        }
    }

}