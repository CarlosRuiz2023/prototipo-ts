import { Router } from "express";
import { check } from "express-validator";
import { soporteCorreoPost, soportePasswordPost } from "../controllers/soporte";
import { validarCampos } from "../middlewares/validar-campos";
import { emailExistente } from "../helpers/db-validators";

const router = Router();

router.post(
  "/correo/:correo",
  [
    check("correo", "El correo es obligatorio").not().isEmpty(),
    check("correo").custom(emailExistente),
    validarCampos,
  ],
  soporteCorreoPost
);

router.get(
  "/contrasenia/:correo",
  [
    check("correo", "El correo es obligatorio").not().isEmpty(),
    check("correo").custom(emailExistente),
    validarCampos,
  ],
  soportePasswordPost
);

export default router;
