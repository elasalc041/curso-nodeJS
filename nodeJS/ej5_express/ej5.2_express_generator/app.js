var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//añadimos la ruta de productos
const productsRouter = require('./routes/productos');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//uso de middleware para la ruta de productos
app.use('/productos', (req, res, next) => {
    console.log(new Date());
    //paso de un valor a manejador de ruta desde el middleware
    req.fecha = new Date();
    next();
});

//uso de middleware, bloqueo acceso aleatorio, para cualquier ruta
app.use((req, res, next) => {
    const random = Math.random();
    if (random < 0.5) {
         res.send('No puedes acceder a la página');
    }else{
        next();
    }
});

//uso de middleware para editar ficheros
const fs = require('fs/promises');
app.use(async (req, res, next) => {
    await fs.appendFile("./main.log", `Método: ${req.method}, URL: ${req.url}\n`);
    next();
});



app.use('/', indexRouter);
app.use('/users', usersRouter);
//añadimos la ruta de productos
app.use('/productos', productsRouter);

module.exports = app;
