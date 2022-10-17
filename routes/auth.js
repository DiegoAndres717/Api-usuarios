const { Router } = require('express');
const { check } = require('express-validator');
const { login, renewToken } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.post('/', 
    [
       check('email', 'El email es obligatorio').isEmail(),
       check('password', 'La contraseña incorrecta').not().isEmpty(),
       validarCampos,
    ],
    login
)

router.get('/renew',
    validarJWT,
    renewToken
)


module.exports = router;
