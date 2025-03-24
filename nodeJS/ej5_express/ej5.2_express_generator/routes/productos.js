const router = require('express').Router();

router.get('/', (req, res) => {
    //obtener los datos enviados en la query
    console.log(req.query);
    console.log("fecha: ", req.fecha);
    res.send('Recuperamos todos los productos');
});

router.get('/nuevo', (req, res) => {
    res.send('Formulario de alta de productos');
});

//get id dinamica
router.get('/:idProducto', (req, res) => {
    //const id = req.params.idProducto;
    const {idProducto} = req.params;
    res.send(`Recupero el producto con ID: ${idProducto}`);
});

router.post('/crear', (req, res) => {
    //obtener los datos enviados en el body
    console.log(req.body);
    res.send('Gestión datos de alta de producto');
});

module.exports = router;