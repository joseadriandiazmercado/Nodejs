//Lo que se hace en este archivo es la configuracion de la base de datos

import { Sequelize } from 'sequelize';


const db = new Sequelize('bienesraices_node_mvc', 'root','',{
        host: 'localhost',
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