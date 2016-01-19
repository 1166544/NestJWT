var express     = require('express');
var profileDao  = require('../dao/profile-dao');
var router      = express.Router();

module.exports = router;

/**
 * 更改用户设置
 */
router.post("/updateProfile", function (req, res, next) {
    profileDao.updateProfile(req, res, next);
});

/**
 * 获取用户详细信息
 */
router.get("/getUser", function (req, res, next) {
    profileDao.getUser(req, res, next);
});