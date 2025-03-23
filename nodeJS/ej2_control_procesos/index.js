function getParam(param){
    const index = process.argv.indexOf(param);
    return process.argv[index + 1];
}

const nombre = getParam("--nombre");
console.log(nombre);


const edad = getParam("--edad");
console.log(edad);

//node index.js --nombre Mario --edad 38