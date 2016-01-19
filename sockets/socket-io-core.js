var socketConst = require('./socket-consts');
var decotar     = require('./socket-decotar');

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
        // console.log(socketConst.ON_MESSAGE + ':' + msg);
        var obj = { time: getTime() };
        
        // 判断是不是第一次连接，记录ID和用户名
        if (!client.name) {
            
            onlineUserCount++;
            client.id                       = msg.message.id;
            client.name                     = msg.message.name;
            client.teamId                   = msg.message.teamId;
            client.unionId                  = msg.message.unionId;
            obj[socketConst.CHAT_TEXT]      = client.name;
            obj[socketConst.CHAT_AUTHOR]    = socketConst.CHAT_SYS;
            obj[socketConst.CHAT_TYPE]      = socketConst.CHAT_WELCOME;
            obj[socketConst.CHAT_ONLINE]    = onlineUserCount;
            socket.id                       = client.id;
            
            // 用户登录后设置socket.name， 当退出时用该标识删除该在线用户
            if (!onlineUsers.hasOwnProperty(client.id)) {
                onlineUsers[client.id] = client.id;
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
            obj[socketConst.CHAT_TEXT]      = decotar.getMessage(msg);
            obj[socketConst.CHAT_AUTHOR]    = client.id;
            obj[socketConst.CHAT_NAME]      = client.name;
            obj[socketConst.CHAT_TYPE]      = socketConst.CHAT_MESSAGE;
            console.log(client.name + ' 说:' + msg.message);
            
            // CHANNEL类型决定了数据发往目的接收方是谁，CHANNEL可以在装配MSEEAGE过程中更改
            switch (msg.channel) {

                case socketConst.CHAT_HORN:                 // 大喇叭
                case socketConst.CHAT_GLOBAL:               // 全服消息
                case socketConst.BROADCAST_PROTOCOL:        // 一般通讯协议
                case socketConst.BROADCAST_GLOBAL:          // 全服广播通知滚动跑马灯
                    broadCastGlobal(obj, msg);
                    break;

                case socketConst.BROADCAST_PRIVATE:         // 只对某一用户广播通知跑马灯
                case socketConst.CHAT_PRIVATE:              // 私聊
                    broadCastPrivate(obj, msg);
                    break;

                case socketConst.CHAT_UNION:                // 公会聊天
                    broadCastUnion(obj, msg);
                    break;

                case socketConst.CHAT_TEAM:                 // 组队聊天
                    broadCastTeam(obj, msg);
                    break;

            }

        }
        
        // 全局广播
        function broadCastGlobal(obj, msg){
            // socket.emit(socketConst.ON_MESSAGE, obj); // 发送给自已
            socket.broadcast.emit(socketConst.ON_MESSAGE, obj);
        }
        
        // 私聊
        function broadCastPrivate(obj, msg){
            if (onlineUsers[msg.message.toUserId] !== null) {
                onlineUsers[msg.message.toUserId].socket.emit(obj);
            }
        }
        
        // 公会广播
        function broadCastUnion(obj, msg){
            var unionId = msg.message.unionId;
            if (unionId) {
                var key;
                var user;
                for (key in onlineUsers) {
                    user = onlineUser[key];
                    if (user.unionId === unionId) {
                        user.socket.emit(obj);
                    }
                }
            }
        }
        
        // 组队广播
        function broadCastTeam(){
            var teamId = msg.message.teamId;
            if (teamId) {
                var key;
                var user;
                for (key in onlineUsers) {
                    user = onlineUser[key];
                    if (user.teamId === teamId) {
                        user.socket.emit(obj);
                    }
                }
            }
        }

    }
    
    /** 断开连接处理 */
    function onDisconnect() {
        
        onlineUserCount--;
        if (onlineUserCount < 0) {
            onlineUserCount = 0;
        }
        
        if (onlineUsers.hasOwnProperty(socket.id)) {
            delete onlineUsers[client.id];
        }
        
        var obj = { time: getTime() };
        obj[socketConst.CHAT_TEXT]          = client.name;
        obj[socketConst.CHAT_AUTHOR]        = socketConst.CHAT_SYS;
        obj[socketConst.CHAT_TYPE]          = socketConst.ON_DIS_CONNECT;
        obj[socketConst.CHAT_ONLINE]        = onlineUserCount;
        obj[socketConst.CHAT_ONLINE_USER]   = onlineUsers;
        
        // 广播用户退出, 用户登录和退出都使用system事件播报
        socket.broadcast.emit(socketConst.CHAT_SYSTEM, obj);
        console.log(client.name + ' 断开连接,当前在线人数:' + onlineUserCount);

    }
}


/** 输出SOCKET启动日志 */
function listenSocket() {
    console.log('Socket.io 服务启动... 端口:' + socketConst.SOCKET_PORT);
}

/** 获取服务器时间截 2016/02/05 16:59 格式 */
var getTime = function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    month = month + 1;
    if (month < 10) {
        month = "0" + month;
    }
    return year + "/" + month + "/" + date.getDate() + " " +date.getHours() + ":" + date.getMinutes();
}