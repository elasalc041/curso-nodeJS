function getCopyright(name, year = 2023){
    let copyright = name + " - " + year;
    return copyright;
}

const result = getCopyright("Ejemplo", 2025);

console.log(result);


//anonima
const prueba2 = function (name, year = 2023){
    let copyright = name + " - " + year;
    return copyright;
}

console.log(prueba2("Ejemplo2"));



//callback
const prueba3 = function (name, year, formatter){
    let copyright = formatter(name, year);
    return copyright;
}

const formatter = function(name, year){
    return name + " | " + year;
}

console.log(prueba3("Ejemplo3", 2025, formatter));




//funcion autoinvocada
(function(name, year){
    console.log(name + " ---- " + year);
})("Ejemplo4", 2001);
