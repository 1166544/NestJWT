module.exports = {

    SOCKET_PORT         : 3000,                         // SOCKET连接端口
    SOCKET_CONNECT      : "connection",                 // 连接命令
    ON_MESSAGE          : "chat message",               // 聊天事件
    ON_OPEN             : "open",                       // 建立连接  
    ON_DIS_CONNECT      : "disconnect",                 // 断开连接  

    CHAT_NAME           : "name",                       // 聊天名字      
    CHAT_TEXT           : "text",                       // 聊天文本
    CHAT_AUTHOR         : "author",                     // 聊天作者ID
    CHAT_SYS            : "Sys",                        // 系统发言前缀
    CHAT_TYPE           : "type",                       // 类型
    CHAT_ONLINE         : "onlineUserCount",            // 在线用户数    
    CHAT_ONLINE_USER    : "onlineUsers",                // 在线用户
    CHAT_SYSTEM         : "system",                     // 系统标识
    CHAT_MESSAGE        : "message",                    // 消息标识
    CHAT_WELCOME        : "Welcome",                    // 欢迎标识

    CHAT_GLOBAL         : 'chat global',                // 全服消息
    CHAT_PRIVATE        : 'chat private',               // 私聊
    CHAT_UNION          : 'chat union',                 // 公会聊天
    CHAT_TEAM           : 'chat team',                  // 组队聊天
    CHAT_HORN           : 'chat horn',                  // 大喇叭
    BROADCAST_PROTOCOL  : 'broadcast protocol',         // 一般通讯协议
    BROADCAST_GLOBAL    : 'broadcast global',           // 全服广播通知滚动跑马灯
    BROADCAST_PRIVATE   : 'broadcast private',          // 只对某一用户广播通知跑马灯
}
