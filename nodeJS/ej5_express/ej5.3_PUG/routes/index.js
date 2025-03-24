var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    variable: 'Express', 
    available: true,
    animales: ['perro', 'gato', 'pez', 'loro'] 
  });
});

module.exports = router;
