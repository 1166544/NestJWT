var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var http            = require('http').Server(app);
var io              = require('socket.io')(http);

var routes          = require('./routes/index');
var users           = require('./routes/users');
var cart            = require('./routes/cart');
var dash            = require('./routes/dash');
var profile         = require('./routes/profile');
var social          = require('./routes/social');
var socketAdapter   = require('./sockets/socket-io-core');
var socketConst     = require('./sockets/socket-consts');
var domain          = require('./core/core-cross-domain');
var error404        = require('./core/core-error-404');
var errorDev        = require('./core/core-error-dev');
var errorDeploy     = require('./core/core-error-deploy');

// 主程序
var app = express();

// 设置跨域访问
app.all('*', domain.setDomain);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 输出日志到目录
var fs = require('fs');
var accessLogStream = fs.createWriteStream(__dirname + '/log/access.log', {flags: 'a',  encoding:'utf8'});
app.use(logger('combined', {stream: accessLogStream}));

// 客户端路由
app.use('/', routes);
app.use('/p/users', users);
app.use('/p/cart', cart);
app.use('/p/dash', dash);
app.use('/p/profile', profile);
app.use('/p/social', social);

// 服务端管理后台路由


// catch 404 and forward to error handler
app.use(error404.parseError);

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(errorDev.parseError);
}

// production error handler
// no stacktraces leaked to user
app.use(errorDeploy.parseError);

// SOCKET服务
io.on(socketConst.SOCKET_CONNECT, socketAdapter.connectSocket);
http.listen(socketConst.SOCKET_PORT, socketAdapter.listenSocket);

// 输出应用程序
module.exports = app;
