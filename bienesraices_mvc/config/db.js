//Lo que se hace en este archivo es la configuracion de la base de datos
//console.log(process)
//Las variables de entorno que se encuentran en el archivo '.env' se pasan con process
//process.env.BD_NOMBRE


import  Sequelize  from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({path: '.env'}) // -> De donde se sacara las variables de entorno que se encuentran abajo


const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASS ?? '',{
        host: process.env.BD_HOST,
        port: 3306,
        dialect:'mysql', // -> puede ser postgress, mariadb, etc
        define:{
            timestamps:true // -> crea dos nuevas columnas, de cuando se registro el usuario y cuando se actualiza
        },
        pool:{
            max: 5, // -> maximas de conexiones por usuario
            min: 0, // -> minimas de conexiones por usuario
            acquire: 30000, // -> 30 segundo para que espere hacer la conexion
            idle: 10000 // -> tiempo que se le da si no hay ninguna consulta.
        },
        operatorsAliases: false
});

export default db;