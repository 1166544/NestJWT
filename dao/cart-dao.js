var productDao = require('./cart/cart-dao-product');
var productDetailDao = require('./cart/cart-dao-product-detail');
var noteDao = require('./cart/cart-dao-product-notes');

module.exports = {
    getProductListData : productDao.getProductListData,
    getProductDetailData : productDetailDao.getProductDetailData,
    getProductNotesData : noteDao.getProductNotesData
}