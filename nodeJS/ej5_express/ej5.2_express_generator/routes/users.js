var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //devolver un json
  //res.json({uno: 'uno', dos: 'dos'});
  //devolver descarga de un fichero
  res.download('./main.log');
});


router.get('/edit', (req, res) =>{
  res.send('formulario de edicion de usuario');
});

router.post('/update', (req, res) =>{
  res.send('gestion de datos de usuario');
});

module.exports = router;
