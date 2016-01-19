var express = require('express');
var dashDao = require('../dao/dash-dao');
var router  = express.Router();

/**
 * 获取主页列表数据-中间
 */
router.get("/getTypeListData", function (req, res, next) {
    dashDao.getTypeListData(req, res, next);
});

/**
 * 获取主页列表数据-上下部份
 */
router.get("/getSideItemData", function (req, res, next) {
    dashDao.getSideItemData(req, res, next);
});

/**
 * 获取公司简介信息
 */
router.get("/getAboutData", function (req, res, next) {
    dashDao.getAboutData(req, res, next);
});

/**
 * 获取联系方式信息
 */
router.get("/getContactData", function (req, res, next) {
    dashDao.getContactData(req, res, next);
});

module.exports = router;