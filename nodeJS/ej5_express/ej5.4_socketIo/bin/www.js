#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('ej5.4-socketio:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

const io = require('socket.io')(server);

io.on("connection", (socket) => {
  
  socket.broadcast.emit("mensaje_chat", {
    usuario: "INFO",
    mensaje: "Nuevo cliente conectado"
  });

  //enviar a todos los clientes conectados el numero de
  //clientes
  io.emit("num_conectados", io.engine.clientsCount);

  //recibir mensaje del cliente y emitir a todos los
  //clientes conectados
  socket.on("mensaje_chat", (data) => {
    io.emit("mensaje_chat", data);
  });


  //cuando un cliente se desconecta
  socket.on("disconnect", () => {
    io.emit("num_conectados", io.engine.clientsCount);
    socket.emit("mensaje_chat", {
      usuario: "INFO",
      mensaje: "Cliente desconectado"
    });
  });
});


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
