const http = require('http');

/* Ej 1
//servidor que utiliza una función cada vez qe recibe una petición
const server = http.createServer((req, res) => {
    console.log('Método:', req.method);
    console.log('URL:', req.url);
    console.log('Headers:', req.headers);
    res.end('Hola server');
});

//escuchar en el puerto 3000
server.listen(3000);

*/


//Ej 2 Avanzado

/*
const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    //si entra en la raiz: localhost:3000
    if (req.url === '/') {
        fsPromises.readFile('./public/index.html', "utf-8")
            .then((data) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            })
            .catch((err) => {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('500 Error interno');
            });
    }
    else if(req.url.match(/.css$/)){
        //ruta al fichero css independiente del SO
        const cssPath = path.join(__dirname, 'public', req.url);
        //creamos un stream de lectura
        const stream = fs.createReadStream(cssPath, "utf-8");
        //escribimos la cabecera
        res.writeHead(200, {'Content-Type': 'text/css'});
        //pipe para enviar el stream al cliente
        stream.pipe(res);

    }
    else if(req.url.match(/.jpeg$/)){
        //ruta al fichero jpg independiente del SO
        const jpegPath = path.join(__dirname, 'public', req.url);
        //creamos un stream de lectura
        const stream = fs.createReadStream(jpegPath);
        //escribimos la cabecera
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        //pipe para enviar el stream al cliente
        stream.pipe(res);

    }
    else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Página no encontrada');
    }
});

server.listen(3000);

*/


//Ej 3 POST
/*
const fs = require('fs');

http.createServer((req, res) => {
    if(req.method === "GET"){
        //devolver formulario
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('./public/formulario.html', "utf-8").pipe(res);


    }else if(req.method === "POST"){
        //recoger datos del formulario
        let body = '';
        req.on('data', (datos) => {
            body += datos;
        });

        req.on('end', () => {
            console.log('Body:', body);
            res.end('OK');
        });
    }
}).listen(3000);
*/

//Ej 4 devolver JSON

const json = require('./public/ejemplo.json');

http.createServer((req, res) => {
    if (req.url === '/json') {
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(JSON.stringify(json));        
    }
}).listen(3000);