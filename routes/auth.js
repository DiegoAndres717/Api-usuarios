const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post('/', 
    [
       check('email', 'El email es obligatorio').isEmail(),
       check('password', 'La contraseña incorrecta').not().isEmpty(),
       validarCampos,
    ],
    login
)




module.exports = router;
