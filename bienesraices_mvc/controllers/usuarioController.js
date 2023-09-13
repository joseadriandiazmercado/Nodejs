//validationResult -> guarda la informacion del campo 
//check -> valida el campo
import { check, validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";
import { generarId } from "../helpers/tokens.js";


const formularioLogin = (req,res) => {
    // .render -> funcion que se encarga de mostrar una vista
    // 1.  Se le pasa el path que quieres que renderise (url -> despues del localhost:3000)
    // 2.  despues tomara la informacion que quiere pasar
    res.render('auth/login.pug',{
        pagina: 'Iniciar sesion'
});
    }

const formularioRegistro = (req,res) => {
    res.render('auth/registro.pug',{
        pagina: 'Crear Cuenta'})
;}

//La funcion debe ser async porque espera peticion de la base de datos 
const registrar = async (req,res) => {
    //Validacion
    //funcion check con 'name' del html, notEmpty() -> verificar que no este vacio, run(req) -> correr la funcion con la peticion para que la lea
    await check('nombre').notEmpty().withMessage('El campo nombre es requerido').run(req);
    await check('email').isEmail().withMessage('Email no aceptado').run(req); 
    await check('password').isLength({min: 6}).withMessage('Password debe tener minimo 6 caracteres').run(req); 
    //!!No detecta las contrasenas iguales
    // await check('confirmarPassword').equals('password').withMessage('passwords deben de conincidir').run(req);
    
    //Guardar el resultado de la peticion en result
    const result = validationResult(req);
    //Verificar que el resultado este vacio
    if(!result.isEmpty()){
        return res.render('auth/registro.pug',{
            pagina: 'Crear Cuenta',
            errores: result.array(), //regresar los errores a la pantalla
            usuario: { //Colocar valor a los inputs al fallo del req
                nombre: req.body.nombre,
                email: req.body.email
            }})
        }

    //?Verificar que el usuario no este replicado
    //?findOne -> retornara el primero que encuentre
    //?Dentro del where se coloca primero la tabla en la base de datos y despues con que lo vamos a comparar 
    const existeUsuario = await Usuario.findOne({where: {email : req.body.email}})
        if(existeUsuario){
            return res.render('auth/registro.pug',{
                pagina: 'Crear Cuenta',
                errores: [{msg:'El Usuario ya esta registrado'}],
                usuario: {
                    nombre: req.body.nombre,
                    email: req.body.email
                }})}

    //.create para mandar req a la base
    //Creacion del usuario en base de datos
    // exportado de otro componente  y llenado en el actual
    await Usuario.create({
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,
        token: generarId(),        
    })
    console.log('Se creo el usuario correctamente')
    
    //Mostrar mensaje de confirmacion
    //mostrar otra pagina con con mensaje de confirmacion
    res.render('templates/mensaje.pug',{
        pagina:'Cuenta Creada Correctamente',
        mensaje: 'Hemos enviado un enlace de confirmacion'})
    }

    
const formularioOlvidePassword = (req,res) =>{
    res.render('auth/olvide-password.pug',{
        pagina: 'Recupera tu acceso a Bienes Raices'
    })
}

    export {
        formularioLogin,
        formularioRegistro,
        registrar,
        formularioOlvidePassword
    }