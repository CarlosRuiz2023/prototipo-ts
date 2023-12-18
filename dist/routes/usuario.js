"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuarios_1 = require("../controllers/usuarios");
const validar_campos_1 = require("../middlewares/validar-campos");
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
router.get("/", usuarios_1.usuariosGet);
router.post("/", [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("correo", "El correo es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("correo", "El correo no es valido").isEmail(),
    (0, express_validator_1.check)("correo").custom(db_validators_1.emailExiste),
    (0, express_validator_1.check)("password", "La contrasenia es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("id_rol", "El id_rol es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("id_rol").isNumeric().isInt({ min: 1, max: 3 }),
    validar_campos_1.validarCampos,
], usuarios_1.usuariosPost);
router.put("/:id", [
    (0, express_validator_1.check)("id", "El id es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("id", "EL id debe ser un numero").isNumeric(),
    (0, express_validator_1.check)("id").custom(db_validators_1.existeUsuarioPorId),
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("correo", "El email es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("correo", "El correo no es valido").isEmail(),
    (0, express_validator_1.check)("correo").custom((correo, { req }) => {
        const id = req.params ? parseInt(req.params.id, 10) : 0;
        if (!isNaN(id)) {
            return (0, db_validators_1.emailInexiste)(correo, id);
        }
        throw new Error("ID no válido");
    }),
    (0, express_validator_1.check)("password", "La contrasenia es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("id_rol", "El id_rol es obligatorio").not().isEmpty(),
    validar_campos_1.validarCampos,
], usuarios_1.usuariosPut);
router.put("/cambiarPass/:id", [
    (0, express_validator_1.check)("id", "El id es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("id", "EL id debe ser un numero").isNumeric(),
    (0, express_validator_1.check)("id").custom(db_validators_1.existeUsuarioPorId),
    (0, express_validator_1.check)("password", "La contrasenia es obligatoria").not().isEmpty(),
    validar_campos_1.validarCampos,
], usuarios_1.cambiarPassPut);
router.delete("/:id", [
    (0, express_validator_1.check)("id", "El id es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("id", "EL id debe ser un numero").isNumeric(),
    (0, express_validator_1.check)("id").custom(db_validators_1.existeUsuarioPorId),
    (0, express_validator_1.check)("estatus", "El estatus es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("estatus").isNumeric().isInt({ min: 1, max: 3 }),
    validar_campos_1.validarCampos,
], usuarios_1.usuariosDelete);
exports.default = router;
//# sourceMappingURL=usuario.js.map