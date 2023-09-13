//!!Definicion de estructura que tendra la tabla
//!!Se pueden tener varios modelos, estos modelos son correspondientes a las tablas que se crearan
//Datatypes para definir tipos de datos en las columnas de las tablas en la base de datos
import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt'; //libreria para hashear un password
import  db  from "../config/db.js";

//!! Crear una tabla en la base de datos
//El nombre que se coloque aqui, sera el nombre de la tabla que se crea en la base de datos
//Colocar nombre de la variable
//colcoar tipo de dato
//() longitud de la variable
//'allowNull: false' -> significa que este campo no puede ir vacio
const Usuario = db.define('usuarios',{
    nombre: {
        //tipo de dato a recibir
        type: DataTypes.STRING,
        //allowNull -> este campo no puede venir vacio 
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN
},{
    hooks: {
        beforeCreate: async function(usuario){
            const salt = await bcrypt.genSalt(10) //-> mientras mas grande sea el numero, mayor dificultad para desincriptarla
            usuario.password = await bcrypt.hash(usuario.password, salt) // -> es una función de hash y derivación de claves para contraseñas basada en el cifrado Blowfish
        },
        
    }
})
export default Usuario;