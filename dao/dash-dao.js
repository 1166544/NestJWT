var typeListDao = require('./dash/dash-dao-type-list');
var sideItemDao = require('./dash/dash-dao-side-item');
var aboutDao = require('./dash/dash-dao-about');
var contactDao = require('./dash/dash-dao-contact');

module.exports = {

    getTypeListData     : typeListDao.getTypeListData,      // 获取主页中间部份列表数据
    getSideItemData     : sideItemDao.getSideItemData,      // 获取主页上下部份数据 
    getAboutData        : aboutDao.getAboutData,            // 获取公司简介数据
    getContactData      : contactDao.getContactData         // 获取联系方式数据

}