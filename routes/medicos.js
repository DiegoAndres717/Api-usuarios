const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getMedico,
    updateMedico,
    createMedico,
    deleteMedico
} = require("../controller/medicos");

const router = Router();

router.get("/", getMedico);

router.post(
  "/",
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('hospital', 'El id hospital debe ser valido').isMongoId( ),
    validarCampos
  ],
  createMedico
);

router.put(
  "/:id",
  [],
  updateMedico
);

router.delete(
  "/:id",

  deleteMedico
);

module.exports = router;
