﻿var mysql = require("mysql");
var conf = require("../../conf/db");
var code = require("../../conf/code");
var util = require("../../util/util");
var sql = require("./user-sql-mapping");
var status = require('./user-login-status');

// 连接池
var pool = mysql.createPool(util.extend({}, conf.mysql));

module.exports = {
    queryByIdParser : queryByIdParser
}

/**
 * 依据ID查找用户
 * @param req
 * @param res
 * @param next
 */
function queryByIdParser(req, res, next) {
    var id = req.query.id;
    pool.getConnection(function (err, connection) {
        connection.query(sql.queryById, id, function (err, result) {
            util.jsonWrite(res, result);
            connection.release();
        });
    });
};