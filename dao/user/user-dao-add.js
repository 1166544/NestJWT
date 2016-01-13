var mysql = require("mysql");
var conf = require("../../conf/db");
var code = require("../../conf/code");
var util = require("../../util/util");
var sql = require("./user-sql-mapping");
var status = require('./user-login-status');

// 建立连接
var pool = mysql.createPool(util.extend({}, conf.mysql));

module.exports = {
    addParser : addParser
}

/**
 * 增加用户
 * @param req
 * @param res
 * @param next
 */
function addParser(req, res, next) {
    
    pool.getConnection(updateConnection);
    
    function updateConnection(err, connection) {
        
        // 获取传输参数
        var parm = req.body;
        var key;
        var obj;
        for (key in parm) {
            if (key.indexOf(code.PROTO) == -1) {
                obj = JSON.parse(key);
            }
        }
        if (parm.firstName == null && parm.lastName == null && obj == null) {
            util.jsonWrite(res, undefined);
            return;
        }
        
        if (obj != null) {
            parm = obj;
        }
        
        // 检测有无用户重名
        connection.query(sql.loginUser, [parm.firstName], checkUserResult);
        
        // 处理返回结果
        function checkUserResult(err, result) {
            if (err) {
                // 返回JSON形式结果
                console.log(err);
                util.jsonWrite(res, err);
                connection.release();
                return;
            }
            else {
                if (result.length > 0) {
                    // 通知客户端重名错误
                    err = code.USER_EXISTS;
                    util.jsonWrite(res, err);
                    connection.release();
                    return;
                }
                else {
                    // 向表中插入值
                    connection.query(
                        sql.insert, 
                        [parm.firstName, parm.lastName, parm.password, parm.email, parm.phone, parm.address],
                        connectionResult
                    );
                }
            }
        }
        
        // 插入结果返回
        function connectionResult(err, result) {
            if (result) {
                result = code.INSERT_SUCCESS;
                connection.query(sql.loginUser, [parm.firstName], onQueryUserResult);
            } else {
                result = code.INSERT_FAIL;
                util.jsonWrite(res, err);
                connection.release();
            }
            
            // 处理插入用户返回结果
            function onQueryUserResult(err, result) {
                if (err) {
                    // 返回JSON形式结果
                    console.log(err);
                    util.jsonWrite(res, err);
                    connection.release();
                }
                else {
                    var user;
                    var i;
                    var total = result.length;
                    
                    var rec = code.LOGIN_FAIL;
                    rec.id = 0;
                    rec.name = parm.firstName;
                    
                    for (i = 0; i < total; i++) {
                        user = result[i];
                        if (user != null) {
                            if (user.password == parm.password) {
                                
                                // 登录成功
                                rec = code.LOGIN_SUCCESS;
                                rec.id = user.id;
                                rec.name = parm.firstName;
                                
                                // 存取APP端登录状态
                                status.recordUserStatus(user);
                                break;
                            }
                        }
                    }
                    
                    // 返回JSON形式结果
                    util.jsonWrite(res, rec);
                    
                    // 向PROFILE表插入默认设置
                    connection.query(sql.insertProfile, [rec.id, 1, 1, 1], onQueryProfileResult);
                    
                    // 向PROFILE表插入默认设置结果处理
                    function onQueryProfileResult(err, result) {
                        if (err) {
                            // 返回JSON形式结果
                            console.log(err);
                            util.jsonWrite(res, err);
                            connection.release();
                        }
                        else {
                            console.log("插入设置成功");
                            connection.release();
                        }
                    }


                }
            }

        }
    }
};