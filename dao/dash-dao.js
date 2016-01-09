var typeListDao = require('./dash/dash-dao-type-list');
var sideItemDao = require('./dash/dash-dao-side-item');

module.exports = {
    getTypeListData : typeListDao.getTypeListData,
    getSideItemData : sideItemDao.getSideItemData
}