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
//!Links que se colocan es postman
router.get('/login', formularioLogin)

router.get('/registro', formularioRegistro)

router.post('/registro', registrar)

router.get('/olvide-password',formularioOlvidePassword)


export default router;