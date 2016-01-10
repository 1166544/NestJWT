var express = require('express');
var router = express.Router();
var socialDao = require('../dao/social-dao');

/**
 * 获取社交页面列表数据
 */
router.get("/getSocialListData", function (req, res, next) {
    socialDao.getSocialListData(req, res, next);
});

/**
 * 获取社交页面SUBJECT数据
 */
router.get("/getMinData", function (req, res, next) {
    socialDao.getMinData(req, res, next);
});

module.exports = router;