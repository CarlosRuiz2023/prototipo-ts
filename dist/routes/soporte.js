"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const soporte_1 = require("../controllers/soporte");
const validar_campos_1 = require("../middlewares/validar-campos");
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
router.post("/correo/:correo", [
    (0, express_validator_1.check)("correo", "El correo es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("correo").custom(db_validators_1.emailExistente),
    validar_campos_1.validarCampos,
], soporte_1.soporteCorreoPost);
router.get("/contrasenia/:correo", [
    (0, express_validator_1.check)("correo", "El correo es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("correo").custom(db_validators_1.emailExistente),
    validar_campos_1.validarCampos,
], soporte_1.soportePasswordPost);
exports.default = router;
//# sourceMappingURL=soporte.js.map