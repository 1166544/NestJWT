// 实现与MYSQL交互
var mysql = require("mysql");
var $conf = require("../conf/db");
var $util = require("../util/util");
var $sql = require("./userSqlMapping");

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
     * @param req
     * @param res
     * @param next
     */
    add: function(req, res, next){
        pool.getConnection(function(err, connection){
            // 获取传输参数
            var parm = req.query || req.params;

            // 建立连接，向表中插入值
            connection.query($sql.insert, [parm.name, parm.age, parm.password], function(err, result){
               if(result){
                   result = {
                     code:200,
                     msg:"增加成功"
                   };
                } else {
                    result = {
                      code: 404,
                      msg:"插入失败" 
                    }
                }

               // 返回JSON形式结果
               jsonWrite(res, result);

               // 释放连接
               connection.release();
            });
        });
    },

    /**
     * 删除用户
     * @param req
     * @param res
     * @param next
     */
    delete:function(req, res, next){
        pool.getConnection(function(err, connecton){
            var id = req.query.id;
            connecton.query($sql.delete, id, function(err, result){
                if(result.affectedRows > 0){
                    result = {
                        code : 200,
                        msg : "删除成功"
                    };
                }else{
                    result = void 0;
                }
                jsonWrite(res, result);
                connecton.release();
            });
        });
    },

    /**
     * 更新用户
     * @param req
     * @param res
     * @param next
     */
    update:function(req, res, next){
        var parm = req.body;
        if(parm.name == null || parm.age == null || parm.id == null){
            jsonWrite(res, undefined);
            return;
        }

        pool.getConnection(function(err, connection){
            connection.query($sql.update, [parm.name, parm.age, parm.id], function(err, result){
                // 使用页面进行跳转提示
                if(result.affectedRows > 0){
                    res.render("suc", {result : result});
                }
                else{
                    res.render("fail", {result : result});
                }
            });

            connection.release();
        });
    },

    /**
     * 依据ID查找用户
     * @param req
     * @param res
     * @param next
     */
    queryById:function(req, res, next){
        var id = req.query.id;
        pool.getConnection(function(err, connection){
            connection.query($sql.queryById, id, function(err, result){
                jsonWrite(res, result);
                connection.release();
            });
        });
    },

    /**
     * 查找所有用户
     * @param req
     * @param res
     * @param next
     */
    queryAll:function(req, res, next){
        pool.getConnection(function(err, connection){
            connection.query($sql.queryAll, function(err, result){
                jsonWrite(res, result);
                connection.release();
            });
        });
    }
};

