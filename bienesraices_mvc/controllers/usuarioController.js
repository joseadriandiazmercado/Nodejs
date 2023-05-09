import Usuario from "../models/Usuario.js";



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
        pagina: 'Crear Cuenta'
});}

//La funcion debe ser async porque espera peticion de la base de datos 
const registrar =async (req,res) => {
    // console.log(req.body)
    
    const usuario = await Usuario.create(req.body)
    res.json(usuario);

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