// CRUD 增删改查 SQL语句
var user = {
    
    // 插入数据
    insert: "INSERT INTO user(id, name, lastName, password, email, phone, address) VALUES(0, ?, ?, ?, ?, ?, ?)",
    
    // 更新数据
    update: "UPDATE user SET name=?, age=? WHERE id=?",
    
    // 删除数据
    delete: "DELETE FROM user WHERE id=?",
    
    // 查询BY ID
    queryById: "SELECT * FROM user WHERE id=?",
    
    // 查询所有
    queryAll: "SELECT * FROM user",

    // 用户登录
    loginUser: "SELECT id, name, password FROM user WHERE name=?",

    // 插入用户设置
    insertProfile: "INSERT INTO user_profile(id, userId, callEnable, messageEnable, geoEnable) VALUES(0, ?, ?, ?, ?)"

};

module.exports = user;
