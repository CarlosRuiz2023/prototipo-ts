"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_archivo_1 = require("../middlewares/validar-archivo");
const validar_campos_1 = require("../middlewares/validar-campos");
const uploads_1 = require("../controllers/uploads");
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
router.post("/", validar_archivo_1.validarArchivoSubir, uploads_1.cargarArchivo);
router.put("/:coleccion/:id", [
    validar_archivo_1.validarArchivoSubir,
    (0, express_validator_1.check)("id", "El id es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("id", "La id debe ser un numero").isNumeric(),
    (0, express_validator_1.check)("coleccion").custom((c) => (0, db_validators_1.coleccionesPermitidas)(c, ["candidatos", "visitas"])),
    validar_campos_1.validarCampos,
], 
// actualizarImagenCloudinary
uploads_1.actualizarImagen);
router.get("/:coleccion/:id", [
    (0, express_validator_1.check)("id", "El id es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("id", "La id debe ser un numero").isNumeric(),
    (0, express_validator_1.check)("coleccion").custom((c) => (0, db_validators_1.coleccionesPermitidas)(c, ["candidatos", "visitas"])),
    validar_campos_1.validarCampos,
], uploads_1.mostrarImagen);
exports.default = router;
//# sourceMappingURL=upload.js.map