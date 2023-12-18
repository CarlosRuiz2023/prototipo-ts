"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar-campos");
const candidatos_1 = require("../controllers/candidatos");
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
router.get("/", candidatos_1.candidatosGet);
router.get("/visita/:id_visita", [
    (0, express_validator_1.check)("id_visita", "La id_visita es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("id_visita", "EL id_visita debe ser un numero").isNumeric(),
    (0, express_validator_1.check)("id_visita").custom(db_validators_1.existeVisitaPorId),
    validar_campos_1.validarCampos,
], candidatos_1.visitasGet);
router.get("/visitas", candidatos_1.visitasAllGet);
router.post("/", [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("edad", "La edad es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("edad", "La edad debe ser un numero").isNumeric(),
    (0, express_validator_1.check)("estado", "El estado es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("municipio", "El municipio es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("colonia", "La colonia es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("calle", "La calle es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("entre_calles", "El entre_calles es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("no_ext", "El no_ext es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("institucion", "La institucion es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("grado_escolaridad", "El grado_escolaridad es obligatorio")
        .not()
        .isEmpty(),
    (0, express_validator_1.check)("institucion", "La institucion es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("id_tipo_apoyo", "El id_tipo_apoyo es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("id_tipo_apoyo", "El id_tipo_apoyo debe ser un numero entre 1 y 10")
        .isNumeric()
        .isInt({ min: 1, max: 10 }),
    (0, express_validator_1.check)("id_estatus", "El id_estatus es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("id_tipo_apoyo", "El id_tipo_apoyo debe ser un numero entre 1 y 3")
        .isNumeric()
        .isInt({ min: 1, max: 3 }),
    (0, express_validator_1.check)("latitud", "La latitud es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("latitud", "La latitud debe ser un numero").isNumeric(),
    (0, express_validator_1.check)("longitud", "La longitud es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("longitud", "La longitud debe ser un numero").isNumeric(),
    validar_campos_1.validarCampos,
], candidatos_1.candidatosPost);
router.post("/visita/:id_candidato", [
    (0, express_validator_1.check)("id_candidato", "El id_candidato es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("id_candidato", "La id_candidato debe ser un numero").isNumeric(),
    (0, express_validator_1.check)("id_candidato").custom(db_validators_1.existeCandidatoPorId),
    (0, express_validator_1.check)("id_estatus_encuesta", "El id_estatus_encuesta debe ser un numero entre 0 y 1")
        .isNumeric()
        .isInt({ min: 0, max: 1 }),
    validar_campos_1.validarCampos,
], candidatos_1.visitasPost);
router.put("/:id", [
    (0, express_validator_1.check)("id", "El id es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("id", "La id debe ser un numero").isNumeric(),
    (0, express_validator_1.check)("id").custom(db_validators_1.existeCandidatoPorId),
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("edad", "La edad es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("edad", "La edad debe ser un numero").isNumeric(),
    (0, express_validator_1.check)("estado", "El estado es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("municipio", "El municipio es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("colonia", "La colonia es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("calle", "La calle es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("entre_calles", "El entre_calles es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("no_ext", "El no_ext es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("institucion", "La institucion es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("grado_escolaridad", "El grado_escolaridad es obligatorio")
        .not()
        .isEmpty(),
    (0, express_validator_1.check)("institucion", "La institucion es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("id_tipo_apoyo", "El id_tipo_apoyo es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("id_tipo_apoyo", "El id_tipo_apoyo debe ser un numero entre 1 y 10")
        .isNumeric()
        .isInt({ min: 1, max: 10 }),
    (0, express_validator_1.check)("id_estatus", "El id_estatus es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("id_tipo_apoyo", "El id_tipo_apoyo debe ser un numero entre 1 y 3")
        .isNumeric()
        .isInt({ min: 1, max: 3 }),
    (0, express_validator_1.check)("latitud", "La latitud es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("latitud", "La latitud debe ser un numero").isNumeric(),
    (0, express_validator_1.check)("longitud", "La longitud es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("longitud", "La longitud debe ser un numero").isNumeric(),
    validar_campos_1.validarCampos,
], candidatos_1.candidatosPut);
router.put("/apoyo/:id", [
    (0, express_validator_1.check)("id", "El id es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("id", "La id debe ser un numero").isNumeric(),
    (0, express_validator_1.check)("id_estatus_apoyo", "El id_estatus_apoyo es obligatorio")
        .not()
        .isEmpty(),
    (0, express_validator_1.check)("id_estatus_apoyo", "La id_estatus_apoyo debe ser un numero").isNumeric(),
    (0, express_validator_1.check)("id_estatus_apoyo").isNumeric().isInt({ min: 1, max: 3 }),
    validar_campos_1.validarCampos,
], candidatos_1.candidatosApoyoPut);
exports.default = router;
//# sourceMappingURL=candidato.js.map