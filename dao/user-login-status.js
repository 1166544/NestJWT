//  监控用户登录时效，如果超进，则返回错误

// 登录用户列表
var loginUserList = {};

// 超时时限
var expireTime = 3600 * 4 * 1000;

module.exports = {
    recordUserStatus : recordUserStatus,
    removeUserStatus : removeUserStatus,
    getUserStatus : getUserStatus
}

/** 记录用户状态 */
function recordUserStatus(user){
    if (user != null) {
        user.time = new Date().getTime();
        loginUserList[user.id] = user;
    }
};

/** 移除用户状态 */
function removeUserStatus(id){
    if (loginUserList[id] != null) {
        delete loginUserList[id]
    }
};

/** 查找用户登录状态 */
function getUserStatus(id){
    var user = loginUserList[id];
    var isExpire = new Date().getTime() - user.time >= expireTime;
    if (user != null && !isExpire) {
        return true;
    }
    else {
        return false;
    }
};