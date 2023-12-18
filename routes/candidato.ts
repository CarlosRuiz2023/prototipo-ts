import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";
import {
  candidatosGet,
  candidatosPost,
  candidatosPut,
  visitasPost,
  candidatosApoyoPut,
  visitasGet,
  visitasAllGet,
} from "../controllers/candidatos";
import {
  existeCandidatoPorId,
  existeVisitaPorId,
} from "../helpers/db-validators";

const router = Router();

router.get("/", candidatosGet);

router.get(
  "/visita/:id_visita",
  [
    check("id_visita", "La id_visita es obligatoria").not().isEmpty(),
    check("id_visita", "EL id_visita debe ser un numero").isNumeric(),
    check("id_visita").custom(existeVisitaPorId),
    validarCampos,
  ],
  visitasGet
);

router.get("/visitas", visitasAllGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("edad", "La edad es obligatoria").not().isEmpty(),
    check("edad", "La edad debe ser un numero").isNumeric(),
    check("estado", "El estado es obligatorio").not().isEmpty(),
    check("municipio", "El municipio es obligatorio").not().isEmpty(),
    check("colonia", "La colonia es obligatoria").not().isEmpty(),
    check("calle", "La calle es obligatoria").not().isEmpty(),
    check("entre_calles", "El entre_calles es obligatorio").not().isEmpty(),
    check("no_ext", "El no_ext es obligatorio").not().isEmpty(),
    check("institucion", "La institucion es obligatoria").not().isEmpty(),
    check("grado_escolaridad", "El grado_escolaridad es obligatorio")
      .not()
      .isEmpty(),
    check("institucion", "La institucion es obligatoria").not().isEmpty(),
    check("id_tipo_apoyo", "El id_tipo_apoyo es obligatorio").not().isEmpty(),
    check("id_tipo_apoyo", "El id_tipo_apoyo debe ser un numero entre 1 y 10")
      .isNumeric()
      .isInt({ min: 1, max: 10 }),
    check("id_estatus", "El id_estatus es obligatorio").not().isEmpty(),
    check("id_tipo_apoyo", "El id_tipo_apoyo debe ser un numero entre 1 y 3")
      .isNumeric()
      .isInt({ min: 1, max: 3 }),
    check("latitud", "La latitud es obligatoria").not().isEmpty(),
    check("latitud", "La latitud debe ser un numero").isNumeric(),
    check("longitud", "La longitud es obligatoria").not().isEmpty(),
    check("longitud", "La longitud debe ser un numero").isNumeric(),
    validarCampos,
  ],
  candidatosPost
);

router.post(
  "/visita/:id_candidato",
  [
    check("id_candidato", "El id_candidato es obligatorio").not().isEmpty(),
    check("id_candidato", "La id_candidato debe ser un numero").isNumeric(),
    check("id_candidato").custom(existeCandidatoPorId),
    check(
      "id_estatus_encuesta",
      "El id_estatus_encuesta debe ser un numero entre 0 y 1"
    )
      .isNumeric()
      .isInt({ min: 0, max: 1 }),
    validarCampos,
  ],
  visitasPost
);

router.put(
  "/:id",
  [
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id", "La id debe ser un numero").isNumeric(),
    check("id").custom(existeCandidatoPorId),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("edad", "La edad es obligatoria").not().isEmpty(),
    check("edad", "La edad debe ser un numero").isNumeric(),
    check("estado", "El estado es obligatorio").not().isEmpty(),
    check("municipio", "El municipio es obligatorio").not().isEmpty(),
    check("colonia", "La colonia es obligatoria").not().isEmpty(),
    check("calle", "La calle es obligatoria").not().isEmpty(),
    check("entre_calles", "El entre_calles es obligatorio").not().isEmpty(),
    check("no_ext", "El no_ext es obligatorio").not().isEmpty(),
    check("institucion", "La institucion es obligatoria").not().isEmpty(),
    check("grado_escolaridad", "El grado_escolaridad es obligatorio")
      .not()
      .isEmpty(),
    check("institucion", "La institucion es obligatoria").not().isEmpty(),
    check("id_tipo_apoyo", "El id_tipo_apoyo es obligatorio").not().isEmpty(),
    check("id_tipo_apoyo", "El id_tipo_apoyo debe ser un numero entre 1 y 10")
      .isNumeric()
      .isInt({ min: 1, max: 10 }),
    check("id_estatus", "El id_estatus es obligatorio").not().isEmpty(),
    check("id_tipo_apoyo", "El id_tipo_apoyo debe ser un numero entre 1 y 3")
      .isNumeric()
      .isInt({ min: 1, max: 3 }),
    check("latitud", "La latitud es obligatoria").not().isEmpty(),
    check("latitud", "La latitud debe ser un numero").isNumeric(),
    check("longitud", "La longitud es obligatoria").not().isEmpty(),
    check("longitud", "La longitud debe ser un numero").isNumeric(),
    validarCampos,
  ],
  candidatosPut
);

router.put(
  "/apoyo/:id",
  [
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id", "La id debe ser un numero").isNumeric(),
    check("id_estatus_apoyo", "El id_estatus_apoyo es obligatorio")
      .not()
      .isEmpty(),
    check(
      "id_estatus_apoyo",
      "La id_estatus_apoyo debe ser un numero"
    ).isNumeric(),
    check("id_estatus_apoyo").isNumeric().isInt({ min: 1, max: 3 }),
    validarCampos,
  ],
  candidatosApoyoPut
);

export default router;
