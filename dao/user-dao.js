var $userAdd = require("./user/user-dao-add");
var $userDelete = require("./user/user-dao-delete");
var $userUpdate = require('./user/user-dao-update');
var $userLogin = require('./user/user-dao-login');
var $userQuery = require('./user/user-dao-query');
var $userQueryAll = require('./user/user-dao-query-all');

/* 用户模块DAO操作 */
module.exports = {

    /**
     * 增加用户
     */
    add : $userAdd.addParser,

    /**
     * 删除用户
     */
    delete : $userDelete.deleteParser,

    /**
     * 更新用户
     */
    update : $userUpdate.updateParser,
    
    /**
     * 登录用户
     */
    loginUser: $userLogin.loginUserParser,

    /**
     * 依据ID查找用户
     */
    queryById : $userQuery.queryByIdParser,

    /**
     * 查找所有用户
     */
    queryAll : $userQueryAll.queryAllParser
};