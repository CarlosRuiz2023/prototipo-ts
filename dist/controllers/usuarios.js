"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cambiarPassPut = exports.usuariosDelete = exports.usuariosPut = exports.usuariosPost = exports.usuariosGet = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuariosGet = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield connection_1.default.query("SELECT * FROM usuarios WHERE estatus!=2");
        res.json({
            usuarios: results,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
});
exports.usuariosGet = usuariosGet;
const usuariosPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo, nombre, id_rol } = req.body;
        let { password } = req.body;
        const salt = bcryptjs_1.default.genSaltSync();
        password = bcryptjs_1.default.hashSync(password, salt);
        yield connection_1.default.query(`CALL insertar_usuario(:nombre, :id_rol, :correo, :password)`, {
            replacements: {
                nombre,
                id_rol,
                correo,
                password,
            },
        });
        res.json({
            msg: "Usuario registrado",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al insertar usuario" });
    }
});
exports.usuariosPost = usuariosPost;
const usuariosPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { correo, nombre, id_rol, latitud = 0.0, longitud = 0.0 } = req.body;
        let { password } = req.body;
        const salt = bcryptjs_1.default.genSaltSync();
        password = bcryptjs_1.default.hashSync(password, salt);
        yield connection_1.default.query(`CALL actualizar_usuario(:id, :correo, :password, :id_rol, :nombre, :latitud, :longitud)`, {
            replacements: {
                id,
                correo,
                password,
                id_rol,
                nombre,
                latitud,
                longitud,
            },
        });
        res.json({
            msg: "Usuario actualizado",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar usuario" });
    }
});
exports.usuariosPut = usuariosPut;
const usuariosDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { estatus } = req.body;
        yield connection_1.default.query(`CALL eliminar_usuario(:id, :estatus)`, {
            replacements: {
                id,
                estatus,
            },
        });
        res.json({ msg: "Estatus del usuario modificado" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al cambiar el estatus del usuario" });
    }
});
exports.usuariosDelete = usuariosDelete;
const cambiarPassPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let { password } = req.body;
        const salt = bcryptjs_1.default.genSaltSync();
        password = bcryptjs_1.default.hashSync(password, salt);
        yield connection_1.default.query(`UPDATE usuarios SET password = '${password}' WHERE id_usuario=${id}`);
        res.json({
            msg: "Password actualizada",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar password" });
    }
});
exports.cambiarPassPut = cambiarPassPut;
//# sourceMappingURL=usuarios.js.map