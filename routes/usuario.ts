import { Router } from "express";
import { check } from "express-validator";
import {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  cambiarPassPut,
} from "../controllers/usuarios";
import { validarCampos } from "../middlewares/validar-campos";
import {
  emailExiste,
  existeUsuarioPorId,
  emailInexiste,
} from "../helpers/db-validators";

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El correo es obligatorio").not().isEmpty(),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(emailExiste),
    check("password", "La contrasenia es obligatoria").not().isEmpty(),
    check("id_rol", "El id_rol es obligatorio").not().isEmpty(),
    check("id_rol").isNumeric().isInt({ min: 1, max: 3 }),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id", "EL id debe ser un numero").isNumeric(),
    check("id").custom(existeUsuarioPorId),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El email es obligatorio").not().isEmpty(),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom((correo, { req }) => {
      const id = req.params ? parseInt(req.params.id, 10) : 0;
      if (!isNaN(id)) {
        return emailInexiste(correo, id);
      }
      throw new Error("ID no válido");
    }),
    check("password", "La contrasenia es obligatoria").not().isEmpty(),
    check("id_rol", "El id_rol es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  usuariosPut
);

router.put(
  "/cambiarPass/:id",
  [
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id", "EL id debe ser un numero").isNumeric(),
    check("id").custom(existeUsuarioPorId),
    check("password", "La contrasenia es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  cambiarPassPut
);

router.delete(
  "/:id",
  [
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id", "EL id debe ser un numero").isNumeric(),
    check("id").custom(existeUsuarioPorId),
    check("estatus", "El estatus es obligatorio").not().isEmpty(),
    check("estatus").isNumeric().isInt({ min: 1, max: 3 }),
    validarCampos,
  ],
  usuariosDelete
);

export default router;
