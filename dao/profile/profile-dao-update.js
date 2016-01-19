var mysql   = require("mysql");
var conf    = require("../../conf/db");
var code    = require("../../conf/code");
var util    = require("../../util/util");
var sql     = require('./profile-sql-maping');
var code    = require("../../conf/code");

// 建立连接
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
        // user.name=?, 
        // user.lastName=?, 
        // user.email=?, 
        // user.phone=?, 
        // user.address=?, 
        // user_profile.callEnable=?, 
        // user_profile.messageEnable=?, 
        // user_profile.geoEnable=? 
        // user.id=?
        var values = [
            parm.name, 
            parm.lastName, 
            parm.email, 
            parm.phone, 
            parm.address, 
            parm.callEnable, 
            parm.messageEnable, 
            parm.geoEnable,
            parm.id];
        connection.query(sql.updateUser, values, updateUserResult);
        
        // 处理更新USER返回结果
        function updateUserResult(err, result) {
        if (err) {
            console.log(err);
            connection.release();
        }
        else {
            // 返回JSON形式结果
            util.jsonWrite(res, code.OPERATE_SUCCESS);
            connection.release();
            }
        }

    }
}