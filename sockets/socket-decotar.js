var socketCore      = require('./socket-io-core');
var socketProtocol  = require('./socket-protocol');

module.exports = {
    getMessage : getMessage
}

/** 处理数据包装返回，例如协议处理，连接SOCKET等 */
function getMessage(data){

    var parsedData;
    switch (data.protocol) {
        case socketProtocol.CLIENT_001:         // 聊天登录
            parsedData = parseLogin(data);
            break;
        case socketProtocol.CLIENT_002:         // 聊天消息
            parsedData = parseMessage(data);    
            break;
    }
    return parsedData;
   
};

/** 处理用户从SOCKET登录 */
function parseLogin(data){

    return data;

};

/** 处理全局聊天消息 */
function parseMessage(data){

    return data;

};