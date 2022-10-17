const { Router } = require("express");
const { fileUploads, mostrarImg } = require("../controller/uploads");
const expressFileUpload = require('express-fileupload')
const { validarJWT } = require("../middlewares/validar-jwt");


const router = Router();

router.use(expressFileUpload());

router.put("/:tipo/:id", validarJWT, fileUploads);

router.get("/:tipo/:foto", mostrarImg );

module.exports = router;