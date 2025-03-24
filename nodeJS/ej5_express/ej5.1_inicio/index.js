const express = require('express');

//conf .env variable de entorno
require('dotenv').config();

const app = express();

//GET http://localhost:3000/contactos
app.get('/contactos', (req, res) => {
    res.send('Lista de contactos');
});


app.post('/usuarios/nuevo', (req, res) => {
    res.send('Crear contacto');
});

//usando variables de entorno
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor escuchando en http://localhost:`${PORT}`');
});