var mysql = require("mysql");
var conf = require("../../conf/db");
var code = require("../../conf/code");
var util = require("../../util/util");
var sql = require("./user-sql-mapping");
var status = require('./user-login-status');
var dao = require('../../dao/user-dao');

// 连接池
var pool = mysql.createPool(util.extend({}, conf.mysql));

module.exports = {
    queryAllParser : queryAllParser
}

/**
* 查找所有用户
* @param req
* @param res
* @param next
*/
function queryAllParser(req, res, next) {

    pool.getConnection(onQueryResult);

    function onQueryResult(err, connection) {
        connection.query(sql.queryAll, onExecResult);
    }

    function onExecResult(err, result) {
        util.jsonWrite(res, result);
        connection.release();
    }
};