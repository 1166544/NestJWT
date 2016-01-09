// CRUD 增删改查 SQL语句
var dash = {
    queryTypeListData: "SELECT name, quality, link FROM mall-labby where type=2",
    querySideItemTopData: "SELECT name, quality, link FROM mall-labby where type=0",
    querySideItemBottomData: "SELECT name, quality, link FROM mall-labby where type=1"
};

module.exports = dash;