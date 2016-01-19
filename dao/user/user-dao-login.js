var mysql   = require("mysql");
var conf    = require("../../conf/db");
var code    = require("../../conf/code");
var util    = require("../../util/util");
var sql     = require("./user-sql-maping");
var status  = require('./user-login-status');

// 建立连接
var pool = mysql.createPool(util.extend({}, conf.mysql));

module.exports = {
    loginUserParser : loginUserParser
}

/**
 * 登录用户
 * @param req
 * @param res
 * @param next
 */
function loginUserParser(req, res, next) {
    
    var parm = req.body;
    var key;
    var obj;
    for (key in parm) {
        if (key.indexOf(code.PROTO) == -1) {
            obj = JSON.parse(key);
        }
    }
    if (parm.name == null && parm.password == null && obj == null) {
        util.jsonWrite(res, undefined);
        return;
    }
    
    if (obj != null) {
        parm = obj;
    }
    
    pool.getConnection(updateConnection);
    
    // 连接查询
    function updateConnection(err, connection) {
        if (err) {
            console.log(err);
            connection.release();
        }
        else {
            connection.query(sql.loginUser, [parm.name], updateConnectResult);
            connection.release();
        }
    }
    
    // 处理返回结果
    function updateConnectResult(err, result) {
        if (err) {
            // 返回JSON形式结果
            console.log(err);
            util.jsonWrite(res, err);
        }
        else {
            var user;
            var i;
            var total = result.length;
            
            var rec = code.LOGIN_FAIL;
            rec.id = 0;
            rec.name = parm.name;

            for (i = 0; i < total; i++) {
                user = result[i];
                if (user != null) {
                    if (user.password == parm.password) {
                        
                        // 登录成功
                        rec = code.LOGIN_SUCCESS;
                        rec.id = user.id;
                        rec.name = parm.name;
                        
                        // 存取APP端登录状态
                        status.recordUserStatus(user);
                        break;
                    }
                }
            }
            
            // 返回JSON形式结果
            util.jsonWrite(res, rec);
        }
    }
};