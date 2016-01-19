var express = require('express');
var cartDao = require('../dao/cart-dao');
var router  = express.Router();

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

/**
 * 获取购物车数据
 */
router.get("/getCartData", function (req, res, next) {
    cartDao.getCartData(req, res, next);
});

/**
 * 添加购物车数据
 */
router.post("/addCartData", function (req, res, next) {
    cartDao.addCartData(req, res, next);
});

/**
 * 删除购物车数据
 */
router.post("/deleteCartData", function (req, res, next) {
    cartDao.deleteCartData(req, res, next);
});

/**
 * 清空购物车数据
 */
router.post("/clearCartData", function (req, res, next) {
    cartDao.clearCartData(req, res, next);
});

/**
 * 更新购物车某一条数据
 */
router.post("/updateCartData", function (req, res, next) {
    cartDao.updateCartData(req, res, next);
});