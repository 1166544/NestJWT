// CRUD 增删改查 SQL语句
var dash = {

    queryTypeListData : "SELECT name, quality, link FROM mall_labby WHERE type=2",
    querySideItemTopData : "SELECT name, quality, link FROM mall_labby WHERE type=0",
    querySideItemBottomData : "SELECT name, quality, link FROM mall_labby WHERE type=1",
    queryAboutData : "SELECT src, dsc, title, subTitle FROM about",
    queryContactData : "SELECT trafficName, trafficeTime, trafficDesc FROM contact"

};

module.exports = dash;