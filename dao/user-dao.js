// 实现与MYSQL交互
var mysql = require("mysql");
var $conf = require("../conf/db");
var $util = require("../util/util");
var $sql = require("./user-sql-mapping");

// 建立连接池
var pool = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法封装
var jsonWrite = function(res, ret){
    if(typeof  ret === undefined){
        res.json({
            code:"1",
            msg:"操作失败"
        });
    }else{
        res.json(ret);
    }
};

module.exports = {

    /**
     * 增加用户
     */
    add: addParser,

    /**
     * 删除用户
     */
    delete:deleteParser,

    /**
     * 更新用户
     */
    update: updateParser,
    
    /**
     * 登录用户
     */
    loginUser: loginUserParser,

    /**
     * 依据ID查找用户
     */
    queryById:queryByIdParser,

    /**
     * 查找所有用户
     */
    queryAll:queryAllParser
};

/**
* 查找所有用户
* @param req
* @param res
* @param next
*/
function queryAllParser(req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryAll, function (err, result) {
            jsonWrite(res, result);
            connection.release();
        });
    });
};

/**
 * 依据ID查找用户
 * @param req
 * @param res
 * @param next
 */
function queryByIdParser(req, res, next) {
    var id = req.query.id;
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryById, id, function (err, result) {
            jsonWrite(res, result);
            connection.release();
        });
    });
};

/**
 * 登录用户
 * @param req
 * @param res
 * @param next
 */
function loginUserParser(req, res, next) {
    var parm = req.body;
    if (parm.name == null || parm.password == null) {
        jsonWrite(res, undefined);
        return;
    }
    
    pool.getConnection(updateConnection);
    
    // 连接查询
    function updateConnection(err, connection) {
        if (err) {
            console.log(err);
        }
        else {
            connection.query($sql.loginUser, [parm.name], updateConnectResult);
            connection.release();
        }
    }
    
    // 处理返回结果
    function updateConnectResult(err, result) {
        if (err) {
            // 返回JSON形式结果
            console.log(err);
            jsonWrite(res, err);
        }
        else {
            var user;
            var i;
            var total = result.length;
            var rec = { id: 0, name: parm.name, code: false, msg: "登录失败" };
            for (i = 0; i < total; i++) {
                user = result[i];
                if (user != null) {
                    if (user.password == parm.password) {
                        // 登录成功
                        rec.id = user.id;
                        rec.name = parm.name;
                        rec.code = true;
                        rec.msg = "登录成功";
                    }
                }
            }
            
            // 返回JSON形式结果
            jsonWrite(res, rec);
        }
    }
};

/**
 * 更新用户
 * @param req
 * @param res
 * @param next
 */
function updateParser(req, res, next) 
{
    var parm = req.body;
    if (parm.name == null || parm.age == null || parm.id == null) {
        jsonWrite(res, undefined);
        return;
    }
    
    pool.getConnection(updateConnection);
    
    // 连接查询
    function updateConnection(err, connection) 
    {
        if (err) {
            console.log(err);
        }
        else {
            connection.query($sql.update, [parm.name, parm.age, parm.id], updateConnectResult);
            connection.release();
        }
    }
    
    // 处理返回结果
    function updateConnectResult(err, result) 
    {
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

/**
 * 增加用户
 * @param req
 * @param res
 * @param next
 */
function addParser(req, res, next) {
    pool.getConnection(function (err, connection) {
        // 获取传输参数
        var parm = req.query || req.params;
        
        // 建立连接，向表中插入值
        connection.query($sql.insert, [parm.name, parm.age, parm.password], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: "增加成功"
                };
            } else {
                result = {
                    code: 404,
                    msg: "插入失败"
                }
            }
            
            // 返回JSON形式结果
            jsonWrite(res, result);
            
            // 释放连接
            connection.release();
        });
    });
};

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
                result = {
                    code : 200,
                    msg : "删除成功"
                };
            } else {
                result = void 0;
            }
            jsonWrite(res, result);
            connecton.release();
        });
    });
};

