var productDao          = require('./cart/cart-dao-product');
var productDetailDao    = require('./cart/cart-dao-product-detail');
var noteDao             = require('./cart/cart-dao-product-notes');
var getDao              = require('./cart/cart-dao-get');
var addDao              = require('./cart/cart-dao-add');
var deleteDao           = require('./cart/cart-dao-delete');
var clearDao            = require('./cart/cart-dao-clear');
var updateDao           = require('./cart/cart-dao-update');

module.exports = {

    getProductListData      : productDao.getProductListData,            // 获取产品信息
    getProductDetailData    : productDetailDao.getProductDetailData,    // 获取产品详细信息    
    getProductNotesData     : noteDao.getProductNotesData,              // 获取产品评论信息
    getCartData             : getDao.getCartData,                       // 获取购物车数据
    addCartData             : addDao.addCartData,                       // 添加数据入购物车
    deleteCartData          : deleteDao.deleteCartData,                 // 删除购物车数据    
    clearCartData           : clearDao.clearCartData,                   // 清空购物车数据
    updateCartData          : updateDao.updateCartData                  // 更新购物车某一条数据

};