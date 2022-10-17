const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getTodo, getDocuColecion,
  
} = require("../controller/busquedas");

const router = Router();

router.get("/:busqueda", validarJWT ,getTodo);

router.get("/coleccion/:tabla/:busqueda", validarJWT ,getDocuColecion);

module.exports = router;