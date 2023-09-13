//Importacion de express con una variable
//Lo que hace abajo es extraer primero la dependencia instalada
//Despues busca en node_modules y busca esa dependencia y la extrae
//Por la tanto ya tenemos lo que es uso libre de esa dependencia

//!! const express = require('express'); //COMMONJS
import express from 'express';
import router from './routes/usuarioRoutes.js'; //Se requiere la extencion .js
import db from './config/db.js'

//!!Crear la app con express
//app contiene toda la informacion de express que estamos formando
//app es la intancia de la aplicacion de express
const app = express()

console.log(router);
//!!Habilitar lectura de datos de formularios
//Poder recibir los req en los controladores
//Toma los parametros desde "name" en el html
app.use(express.urlencoded({extended: true}))



//!!Conexion a la base de datos
try {
    await db.authenticate();
    //db.sync(); -> creacion de las tablas en la base de datos
    //Siempre y cuando se haga correcto la conexcion
    //Y la creara cuando esta no exista
    db.sync();
    console.log('Conexion exitosa a la base de datos')
} catch (error) {
    console.log('Conexion incompleta a la base de datos')
    console.log(error)
}


//!!Habilitar Pug
// app.set -> Es para agregar configuracion
app.set('view engine', 'pug') //Se quiere utilizar pug
app.set('views', './views'); // Y quiero que esas rutas las utilices de Aqui  

//!!Carpeta publica
//Decirle a node, donde encontrar la carpeta de los archivos estaticos
//recursos estáticos como logos, videos, archivos javascript
//y css los cuales se agregan directamente a las plantillas html generadas
app.use(express.static('public'))


//!!Definir un puerto y arrancar el proyecto (Se puede decir que esto es lo mas esencial)
 const port = 3000;

//!!Routing
// app.get -> Busca la ruta en especifico
// app.get('/', router)
// app.use -> Buscara todas las rutas que inicien con una diagonal
app.use('/auth', router);


 //!!app escuchar al puerto 3000
app.listen(port, () =>{
console.log(`El servidor esta funcionando en el puerto ${port}`)
 });