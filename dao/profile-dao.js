var profileDao  = require('./profile/profile-dao-update');
var userDao     = require('./profile/profile-dao-user');

module.exports = {
    
    updateProfile   : profileDao.updateProfile, // 增加用户
    getUser         : userDao.getUser           // 查找用户详细信息

}