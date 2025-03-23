const operaciones = require("./operaciones.js");
//const {mult} = require("./operaciones.js");

const Persona = require("./persona.js");

const suma = operaciones.sumar(5, 3);

console.log(suma);


const persona1 = new Persona("Laura", "Gomez", 15);

console.log(persona1.mostrar());


//modulo externo
const colors = require("colors");

console.log("hola".green);

