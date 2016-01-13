// CRUD 增删改查 SQL语句
var dash = {

    queryTypeListData : "SELECT id, name, quality, link FROM mall_labby WHERE type=?",

    queryAboutData : "SELECT src, dsc, title, subTitle FROM about",

    queryContactData : "SELECT trafficName, trafficeTime, trafficDesc FROM contact"

};

module.exports = dash;