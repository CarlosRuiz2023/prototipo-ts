import { Router } from "express";
import { check } from "express-validator";
import {
  estadosGet,
  municipiosGet,
  coordenadasPost,
  conexionGet,
} from "../controllers/services";
import { validarCampos } from "../middlewares/validar-campos";

const router = Router();

router.get("/", estadosGet);

router.get("/verificarConexion", conexionGet);

router.get(
  "/:estado",
  [check("estado", "El estado es obligatorio").not().isEmpty(), validarCampos],
  municipiosGet
);

router.post(
  "/:tipo_busqueda",
  [
    check("tipo_busqueda", "El tipo_busqueda es obligatorio").not().isEmpty(),
    check("tipo_busqueda", "El tipo_busqueda debe ser un numero entre 0 y 1")
      .isNumeric()
      .isInt({ min: 0, max: 1 }),
    validarCampos,
  ],
  coordenadasPost
);

export default router;
