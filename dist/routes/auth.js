"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const login_1 = require("../controllers/login");
const validar_campos_1 = require("../middlewares/validar-campos");
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
router.post("/login", [
    (0, express_validator_1.check)("correo", "El correo es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("correo", "El correo no es valido").isEmail(),
    (0, express_validator_1.check)("password", "La contraseña es obligatoria").not().isEmpty(),
    validar_campos_1.validarCampos,
], login_1.login);
router.post("/logout/:id", [
    (0, express_validator_1.check)("id", "El id es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("id").custom(db_validators_1.existeUsuarioPorId),
    validar_campos_1.validarCampos,
], login_1.logout);
exports.default = router;
//# sourceMappingURL=auth.js.map