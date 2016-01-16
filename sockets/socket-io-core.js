var socketConst = require('./socket-consts');

module.exports = {
    connectSocket : connectSocket,
    listenSocket : listenSocket
}

// 客户端连接数量
var onlineUserCount = 0;   

// 统计客户端登录用户
var onlineUsers = {};      

// 客户端对象
var client = {};

/** 建立连接处理 */
function connectSocket(socket) {
    
    // 通知客户端已连接
    socket.emit(socketConst.ON_OPEN);
    
    // 存取socket引用
    client.socket = socket;
    client.name = false;
    
    // 收到消息处理
    socket.on(socketConst.ON_MESSAGE, onMessage);
    
    // 断开连接处理
    socket.on(socketConst.ON_DIS_CONNECT, onDisconnect);

    /** 收到消息处理 */
    function onMessage(msg) {
        
        // 构建客户端返回的对象
        console.log(socketConst.ON_MESSAGE + ':' + msg);
        var obj = { time: getTime() };
        
        // 判断是不是第一次连接，以第一条消息作为昵称
        if (!client.name) {
            
            onlineUserCount++;
            client.name = msg;
            obj[socketConst.CHAT_TEXT] = client.name;
            obj[socketConst.CHAT_AUTHOR] = socketConst.CHAT_SYS;
            obj[socketConst.CHAT_TYPE] = socketConst.CHAT_WELCOME;
            obj[socketConst.CHAT_ONLINE] = onlineUserCount;
            socket.name = client.name;
            
            // 用户登录后设置socket.name， 当退出时用该标识删除该在线用户
            if (!onlineUsers.hasOwnProperty(client.name)) {
                onlineUsers[client.name] = client.name;
            }
            
            // 当前在线用户集合
            obj[socketConst.CHAT_ONLINE_USER] = onlineUsers;
            console.log(client.name + ' 登录,当前在线人数:' + onlineUserCount);
            
            // 返回欢迎语,发送给自己的消息
            socket.emit(socketConst.CHAT_SYSTEM, obj);
            
            // 广播新用户已登录 向其他用户发送消息
            socket.broadcast.emit(socketConst.CHAT_SYSTEM, obj);

        } else {
            
            // 如果不是第一次聊天，则返回正常的聊天消息
            obj[socketConst.CHAT_TEXT] = msg;
            obj[socketConst.CHAT_AUTHOR] = client.name;
            obj[socketConst.CHAT_TYPE] = socketConst.CHAT_MESSAGE;
            console.log(client.name + ' 说:' + msg);
            
            // 发送给自己的消息，如果不想打印自己发送的消息，则注释掉该句。
            socket.emit(socketConst.ON_MESSAGE, obj);
            
            // 向其他用户发送消息 
            socket.broadcast.emit(socketConst.ON_MESSAGE, obj);

        }

    }
    
    /** 断开连接处理 */
    function onDisconnect() {
        
        onlineUserCount--;
        if (onlineUserCount < 0) {
            onlineUserCount = 0;
        }
        
        if (onlineUsers.hasOwnProperty(socket.name)) {
            delete onlineUsers[client.name];
        }
        
        var obj = {
            time: getTime(),
            author: socketConst.CHAT_SYS,
            text: client.name,
            type: socketConst.ON_DIS_CONNECT,
            onlineUserCount: onlineUserCount,
            onlineUsers: onlineUsers
        };
        
        // 广播用户退出, 用户登录和退出都使用system事件播报
        socket.broadcast.emit(socketConst.CHAT_SYSTEM, obj);
        console.log(client.name + ' 断开连接,当前在线人数:' + onlineUserCount);

    }
}


/** 输出SOCKET启动日志 */
function listenSocket() {
    console.log('Socket.io 服务启动... 端口:' + socketConst.SOCKET_PORT);
}

/** 获取服务器时间截 16:59:32 格式 */
var getTime = function () {
    var date = new Date();
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}