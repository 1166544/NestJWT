// CRUD 增删改查 SQL语句
var cart = {
    
    // 某一类型产品列表数据
    getProductListData : "SELECT id, link, src, title, pName, pPrice FROM mall_main_list WHERE linkId=?",
    
    // 某一类型产品SIDE SHOW数据
    getProductSideData : "SELECT id, link, src, title, dsc FROM maill_side_list WHERE linkId=?",
    
    // 详细产品数据
    getProductDetailData : "SELECT id, dsc, size, color FROM mall_product_detail WHERE linkId=?",
    
    // 详细产品好/中/差评数据
    getProductDetailNote : "SELECT id, src, name, note, favorites FROM mall_product_notes WHERE linkId=? AND type=?",

    // 评细产品SIDE SHOW数据
    getProductDetailSideData : "SELECT id, src, title, dsc FROM mall_product_side_show WHERE linkId=?",
    
    // 获取购物车数据
    getCartData : "SELECT src, pName, pPrice FROM mall_main_list WHERE id=？ AS t1 INNER JOIN (SELECT id, size, color, quality, FROM cart) AS t2 WHERE t2.userId=? AND t1.id = t2.productId",
    
    // 添加购物车数据
    addCartData : "INSERT INTO cart (productId, userId, size, color, quality) VALUES (?, ?, ?, ?, ?)",
    
    // 删除购物车数据
    deleteCartData : "DELETE FROM cart WHERE id=? AND userId=?",
    
    // 清空购物车数据
    clearCartData : "DELETE FROM cart WHERE userId=?",

    // 更新购物车数据
    updateCartData : "UPDATE cart SET size=?, color=?, quality=? WHERE id=?"
};

module.exports = cart;