// CRUD 增删改查 SQL语句
var user = {
    insert:"INSERT INTO user(id, name, age, password) VALUES(0, ?, ?, ?)",
    update:"UPDATE user set name=?, age=? WHERE id=?",
    delete:"DELETE FROM user WHERE id=?",
    queryById:"SELECT * FROM user where id=?",
    queryAll:"SELECT * FROM user"
};

module.exports = user;
