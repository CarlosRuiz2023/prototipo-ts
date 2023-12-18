import { Router } from "express";
import { check } from "express-validator";
import { validarArchivoSubir } from "../middlewares/validar-archivo";
import { validarCampos } from "../middlewares/validar-campos";
import {
  cargarArchivo,
  mostrarImagen,
  actualizarImagen,
} from "../controllers/uploads";
import { coleccionesPermitidas } from "../helpers/db-validators";

const router = Router();

router.post("/", validarArchivoSubir, cargarArchivo);

router.put(
  "/:coleccion/:id",
  [
    validarArchivoSubir,
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id", "La id debe ser un numero").isNumeric(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["candidatos", "visitas"])
    ),
    validarCampos,
  ],
  // actualizarImagenCloudinary
  actualizarImagen
);

router.get(
  "/:coleccion/:id",
  [
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id", "La id debe ser un numero").isNumeric(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["candidatos", "visitas"])
    ),
    validarCampos,
  ],
  mostrarImagen
);

export default router;
