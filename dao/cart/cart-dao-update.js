var mysql   = require("mysql");
var conf    = require("../../conf/db");
var code    = require("../../conf/code");
var util    = require("../../util/util");
var sql     = require("./cart-sql-maping");
var status  = require('../user/user-login-status');

// 建立连接
var pool = mysql.createPool(util.extend({}, conf.mysql));

module.exports = {
    updateCartData : updateCartData
}

/**
 * 更新购物车某一条数据    
 * @param req
 * @param res
 * @param next
 */
function updateCartData(req, res, next) {
    
    var parm = req.body;
    var key;
    var obj;
    for (key in parm) {
        if (key.indexOf(code.PROTO) == -1) {
            obj = JSON.parse(key);
        }
    }
    
    if (obj != null) {
        parm = obj;
    }
    
    // 检测用户登录状态
    if (!status.getUserStatus(parm.userId)) {
        util.jsonWrite(res, code.OPERATE_FAIL);
        return;
    }
    
    pool.getConnection(updateConnection);
    
    // 连接查询
    function updateConnection(err, connection) {
        if (err) {
            console.log(err);
            connection.release();
        }
        else {
            connection.query(sql.updateCartData, [parm.size, parm.color, parm.quality, parm.id], updateConnectResult);
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
            // 返回JSON形式结果
            util.jsonWrite(res, code.OPERATE_SUCCESS);
        }
    }
};