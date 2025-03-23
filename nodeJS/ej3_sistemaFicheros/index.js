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
