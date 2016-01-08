var mysql = require("mysql");
var $conf = require("../../conf/db");
var $code = require("../../conf/code");
var $util = require("../../util/util");
var $sql = require("./user-sql-mapping");
var $status = require('./user-login-status');

// 连接池
var pool = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
    deleteParser : deleteParser
}

/**
 * 删除用户
 * @param req
 * @param res
 * @param next
 */
function deleteParser(req, res, next) {
   pool.getConnection(function (err, connecton) {
        var id = req.query.id;
        connecton.query($sql.delete, id, function (err, result) {
            if (result.affectedRows > 0) {
                result = $code.DELETE_SUCCESS;
            } else {
                result = void 0;
            }
            $util.jsonWrite(res, result);
            connecton.release();
        });
    });
};