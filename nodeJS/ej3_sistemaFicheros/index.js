const fs = require("fs");

//version Sincrona
const files = fs.readdirSync("../");

console.log("SYNC", files);



//version Asincrona con callback
fs.readdir("../", (error, files)=>{
    console.log(error);
    console.log("ASYNC", files);
});


//version Asincrona con Promesa
const fsPromise = require("fs/promises");

fsPromise.readdir("../")
    .then(files => console.log("PROMISE", files))
    .catch(err => console.log(err));

//Async-await
(async ()=>{
    const filesP = await fsPromise.readdir("../");
    console.log(filesP);
})();




//leer fichero
fsPromise.readFile("../ej2_control_procesos/index.js", "utf-8")
    .then(data => console.log(data))
    .catch(err => console.log(err));


//escribir fichero
async function accionFicheros(){

    try {

        await fsPromise.appendFile("../ej2_control_procesos/prueba.txt", "Esto es una prueba");

        const data = await fsPromise.readFile("../ej2_control_procesos/prueba.txt", "utf-8");

        console.log(data);
        
    } catch (error) {

        console.log(error)
        
    }
    
}

accionFicheros();



//trabajar fichero

if (!fs.existsSync("./config")) {

    fsPromise.mkdir("./config")
    .then(console.log("Fichero creado"))
    .catch(err => console.log(err));
    
}else{
    console.log("El directorio ya existe")
}




//trabajar fichero muy grande

const stream = fs.createReadStream("../ej2_control_procesos/prueba.txt", "utf-8");

stream.once("data", ()=>{
    console.log("Comienza la lectura");
})

let body = ";"
//data ejecutara la funcion de la funcion del segundo parametro cada paquete de datos que lee
stream.on("data", funcion => {
    console.log("datos recibidos ...");
    body += funcion;
});

stream.on("end", ()=>{
    console.log(`Body: ${body.length}`);
})



//stream escritura

const readline = require("readline");

const rl = readline.createInterface(process.stdin, process.stdout);


rl.question("¿Cómo te llamas?", (answer)=>{
    const stream = fs.createWriteStream(`./${answer}.md`);

    rl.setPrompt("¿Qué quieres decir? (exit para salir)");
    rl.prompt();

    rl.on("line", (data)=>{
        if (data.toLowerCase().trim()=== "exit") {
            stream.close()
            rl.close();
        }else{
            stream.write(`${data}\n`);
        }
    });

});


rl.on("close", ()=>{
    console.log("Escritura terminada");
})