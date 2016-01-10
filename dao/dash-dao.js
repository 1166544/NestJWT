var typeListDao = require('./dash/dash-dao-type-list');
var sideItemDao = require('./dash/dash-dao-side-item');
var aboutDao = require('./dash/dash-dao-about');
var contactDao = require('./dash/dash-dao-contact');

module.exports = {
    getTypeListData : typeListDao.getTypeListData,
    getSideItemData : sideItemDao.getSideItemData,
    getAboutData : aboutDao.getAboutData,
    getContactData : contactDao.getContactData
}