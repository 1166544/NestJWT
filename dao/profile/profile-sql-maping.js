var profile = {
    
    // 更新USER数据
    updateUser : "UPDATE user set name=?, lastName=?, email=?, phone=?, address=? WHERE id=?",
    
    // 更新PROFILE数据
    updateProfile : "UPDATE user_profile set callEnable=?, messageEnable=?, geoEnable=? WHERE userId=?",
    
    // 获取USER数据
    getUser : "SELECT user.name, user.lastName, user.email, user.phone, user.address, user_profile.callEnable, user_profile.messageEnable, user_profile.geoEnable FROM user, user_profile WHERE user.id = user_profile.userId AND user.id=?",               

};

module.exports = profile;