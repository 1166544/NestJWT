var getListDao  = require("./social/social-list");
var getMinDao   = require("./social/social-min");

module.exports = {

    getSocialListData   : getListDao.getSocialListData, // 获取社交数据
    getMinData          : getMinDao.getMinData          // 获取SOCIAL页面列表数据  

}