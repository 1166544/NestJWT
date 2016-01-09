var express = require('express');
var router = express.Router();
var dashDao = require('../dao/dash-dao');

/**
 * 获取主页列表数据-中间
 */
router.post("/getTypeListData", function (req, res, next) {
    dashDao.getTypeListData(req, res, next);
});

/**
 * 获取主页列表数据-上下部份
 */
router.post("/getSideItemData", function (req, res, next) {
    dashDao.getSideItemData(req, res, next);
});

module.exports = router;