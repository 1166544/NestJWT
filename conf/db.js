var util    = require("../util/util");
var conf    = require("../conf/db");
var mysql   = require("mysql");

/**
 * DB配置
 * @type {{mysql: {host: string, user: string, password: string, database: string, port: number}}}
 */
module.exports = {

    mysql:{
        host:"localhost",
        user:"root",
        password:"123456",
        database:"totallyselldb",
        port:3306
    }

}

