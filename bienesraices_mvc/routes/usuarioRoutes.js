//Ruta para auth del usuario

import express from 'express';
import { formularioLogin,
        formularioRegistro,
        registrar,
        formularioOlvidePassword, } from '../controllers/usuarioController.js';
const router = express.Router();

//!!Routing
//Cuando alguien visite la pagina con '/'
//Se hace un callback (funcion) que requiere de dos parametros (req, res)
//req === lo que tu estas enviando al servidor de node 
//res === es la respuesta del servidor

//!!DIferentes links
router.get('/login', formularioLogin)

router.get('/registro', formularioRegistro)

router.post('/registro', registrar)

router.get('/olvide-password',formularioOlvidePassword)



// router.get('/nosotros', (req,res) => {
//     //.send para mandar texto plano a la respuesta
//     res.send('Informacion de nosotros');
// })


//Rutas con el mismo path
// router.route('/')
//     //Se manda a llamar esta ruta cuando la peticion es de tipo GET
//     .get(function(req,res){
//         res.json({ msg: 'Hola mundo en express'})
//     })
//     //Se manda a llamar esta ruta cuando la peticion es de tipo POST
//     .post(function(req,res){
//         //.send para mandar texto plano a la respuesta
//         res.json({msg: 'Respuesta de tipo POST'});
//     })

export default router;