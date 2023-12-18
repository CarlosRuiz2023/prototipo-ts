"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const permisos_1 = require("../controllers/permisos");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = (0, express_1.Router)();
router.get("/:id_rol", [
    (0, express_validator_1.check)("id_rol", "El id_rol es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("id_rol", "El id_rol debe ser un numero entre 1 y 3")
        .isNumeric()
        .isInt({ min: 1, max: 3 }),
    validar_campos_1.validarCampos,
], permisos_1.permisosGet);
exports.default = router;
//# sourceMappingURL=permiso.js.map