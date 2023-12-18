import { Router } from "express";
import { check } from "express-validator";
import { login, logout } from "../controllers/login";
import { validarCampos } from "../middlewares/validar-campos";
import { existeUsuarioPorId } from "../helpers/db-validators";

const router = Router();

router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").not().isEmpty(),
    check("correo", "El correo no es valido").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/logout/:id",
  [
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  logout
);

export default router;
