"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const services_1 = require("../controllers/services");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = (0, express_1.Router)();
router.get("/", services_1.estadosGet);
router.get("/verificarConexion", services_1.conexionGet);
router.get("/:estado", [(0, express_validator_1.check)("estado", "El estado es obligatorio").not().isEmpty(), validar_campos_1.validarCampos], services_1.municipiosGet);
router.post("/:tipo_busqueda", [
    (0, express_validator_1.check)("tipo_busqueda", "El tipo_busqueda es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("tipo_busqueda", "El tipo_busqueda debe ser un numero entre 0 y 1")
        .isNumeric()
        .isInt({ min: 0, max: 1 }),
    validar_campos_1.validarCampos,
], services_1.coordenadasPost);
exports.default = router;
//# sourceMappingURL=service.js.map