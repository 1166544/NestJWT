var getListDao = require("./social/social-list");
var getMinDao = require("./social/social-min");

module.exports = {
    getSocialListData : getListDao.getSocialListData,
    getMinData : getMinDao.getMinData
}