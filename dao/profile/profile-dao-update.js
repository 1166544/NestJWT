var mysql = require("mysql");
var conf = require("../../conf/db");
var code = require("../../conf/code");
var util = require("../../util/util");
var sql = require('./profile-sql-maping');
var code = require("../../conf/code");

// 连接池
var pool = mysql.createPool(util.extend({}, conf.mysql));

module.exports = {
    updateProfile : updateProfile
}

/**
 * 增加用户
 * @param req
 * @param res
 * @param next
 */
function updateProfile(req, res, next) {
    
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
        if (parm.name == null && parm.lastName == null && obj == null) {
            util.jsonWrite(res, undefined);
            return;
        }
        
        if (obj != null) {
            parm = obj;
        }
        
        // 更新USER
        connection.query(sql.updateUser, [parm.name, parm.lastName, parm.email, parm.phone, parm.address, parm.id], updateUserResult);
        
        // 处理更新USER返回结果
        function updateUserResult(err, result) {
            if (err) {
                console.log(err);
                connection.release();
            }
            else {
                // 更新USER_PROFILE
                connection.query(sql.updateProfile, [parm.callEnable, parm.messageEnable, parm.geoEnable, parm.id], updateUserProfileResult);

                // 处理更新USER_PROFILE返回结果
                function updateUserProfileResult(err, result) {
                    if (err) {
                        console.log(err);
                        connection.release();
                    }
                    else {
                        // 返回JSON形式结果
                        var rec = code.OPERATE_SUCCESS;
                        util.jsonWrite(res, rec);
                        connection.release();
                    }
                }
            }
        }

        
    }
}