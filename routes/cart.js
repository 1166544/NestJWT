var express = require('express');
var router = express.Router();
var cartDao = require('../dao/cart-dao');

module.exports = router;

/**
 * 获取主页某一类型产品列表数据
 */
router.get("/getProductListData", function (req, res, next) {
    cartDao.getProductListData(req, res, next);
});

/**
 * 获取主页某一类型产品详细数据
 */
router.get("/getProductDetailData", function (req, res, next) {
    cartDao.getProductDetailData(req, res, next);
});

/**
 * 获取主页某一类型产品好中差评数据
 */
router.get("/getProductNotesData", function (req, res, next) {
    cartDao.getProductNotesData(req, res, next);
});