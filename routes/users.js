var express = require('express');
var router = express.Router();
var userDao = require('../dao/user-dao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 * 增加用户
 */
router.get("/addUser", function(req, res, next){
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

module.exports = router;
