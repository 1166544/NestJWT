var profileDao = require('./profile/profile-dao-update');
var userDao = require('./profile/profile-dao-user');

module.exports = {
    
    updateProfile : profileDao.updateProfile,
    getUser : userDao.getUser

}