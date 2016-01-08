var express = require('express');
var router = express.Router();
var userDao = require('../dao/user-dao');

/* 监控更新用户信息输出 */
router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    res.render("update-user");
});

/* 监控用户登录输入 */
router.get('/login', function (req, res, next) {
    res.render("login-user");
});

/**
 * 增加用户
 */
router.post("/addUser", function(req, res, next){
    userDao.add(req, res, next);
});

/**
 * 查询所有用户
 */
router.get("/queryAll", function(req, res, next){
    userDao.queryAll(req, res, next);
});

/**
 * 依据条件查询用户
 */
router.get("/query", function(req, res, next){
    userDao.queryById(req, res, next);
});

/**
 * 删除用户
 */
router.get("/deleteUser", function(req, res, next){
    userDao.delete(req, res, next);
});

/**
 * 更新用户
 */
router.post("/updateUser", function(req, res, next){
    userDao.update(req, res, next);
});

/**
 * 登录用户
 */
router.post("/loginUser", function (req, res, next) {
    userDao.loginUser(req, res, next);
});

module.exports = router;
