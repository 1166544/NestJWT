var mysql   = require("mysql");
var conf    = require("../../conf/db");
var code    = require("../../conf/code");
var util    = require("../../util/util");
var sql     = require("./user-sql-maping");
var status  = require('./user-login-status');

// 建立连接
var pool = mysql.createPool(util.extend({}, conf.mysql));

module.exports = {
    updateParser : updateParser
}

/**
 * 更新用户
 * @param req
 * @param res
 * @param next
 */
function updateParser(req, res, next) {
    var parm = req.body;
    if (parm.name == null || parm.age == null || parm.id == null) {
        util.jsonWrite(res, undefined);
        return;
    }
    
    pool.getConnection(updateConnection);
    
    // 连接查询
    function updateConnection(err, connection) {
        if (err) {
            console.log(err);
        }
        else {
            connection.query(sql.update, [parm.name, parm.age, parm.id], updateConnectResult);
            connection.release();
        }
    }
    
    // 处理返回结果
    function updateConnectResult(err, result) {
        if (err) {
            console.log(err);
        }
        else {
            // 使用页面进行跳转提示
            if (result.affectedRows > 0) {
                res.render("suc", { result : result });
            }
            else {
                res.render("fail", { result : result });
            }
        }
    }
};