var mysql = require("mysql");
var $conf = require("../../conf/db");
var $code = require("../../conf/code");
var $util = require("../../util/util");
var $sql = require("./user-sql-mapping");
var $status = require('./user-login-status');
var $loginDao = require('./user-dao-login');

// 连接池
var pool = mysql.createPool($util.extend({}, $conf.mysql));

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
            if (key.indexOf($code.PROTO) == -1) {
                obj = JSON.parse(key);
            }
        }
        if (parm.firstName == null && parm.lastName == null && obj == null) {
            $util.jsonWrite(res, undefined);
            return;
        }
        
        if (obj != null) {
            parm = obj;
        }
        
        // 检测有无用户重名
        connection.query($sql.loginUser, [parm.firstName], checkUserResult);
        connection.release();
        
        // 处理返回结果
        function checkUserResult(err, result) {
            if (err) {
                // 返回JSON形式结果
                console.log(err);
                $util.jsonWrite(res, err);
                return;
            }
            else {
                if (result.length > 0) {
                    // 通知客户端重名错误
                    err = $code.USER_EXISTS;
                    $util.jsonWrite(res, err);
                    return;
                }
                else {
                    // 向表中插入值
                    connection.query(
                        $sql.insert, 
                        [parm.firstName, parm.lastName, parm.password, parm.email, parm.phone, parm.address],
                        connectionResult
                    );
                }
            }
        }
        
        // 插入结果返回
        function connectionResult(err, result) {
            if (result) {
                result = $code.INSERT_SUCCESS;
            } else {
                result = $code.INSERT_FAIL;
            }

            //// 包装登录成功数据
            //result.id = user.id;
            //result.name = parm.name;
            
            //// 返回JSON形式结果
            //$util.jsonWrite(res, result);
            
            // 释放连接
            connection.release();

            // 调用登录流程
            if (result === $code.INSERT_FAIL) {
                $loginDao.loginUserParser(req, res, next);
            }
        }
    }
};