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
exports.logout = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generar_jwt_1 = require("../helpers/generar-jwt");
const connection_1 = __importDefault(require("../db/connection"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, password } = req.body;
    try {
        // Verificar si el email existe
        const [result] = yield connection_1.default.query(`SELECT * FROM usuarios WHERE correo = '${correo}';`);
        const usuario = result[0];
        if (!usuario) {
            res.status(400).json({
                msg: "Usuario / Password no son correctos - Correo",
            });
            return;
        }
        // Si el usuario esta inactivo
        if (usuario.estatus === 2) {
            res.status(400).json({
                msg: "Usuario / Password no son correctos - estado:false",
            });
            return;
        }
        // Verificar la contraseña
        const validPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validPassword) {
            res.status(400).json({
                msg: "Usuario / Password no son correctos - password",
            });
            return;
        }
        // Generar el JWT
        const token = yield (0, generar_jwt_1.generarJWT)(usuario.id_usuario);
        // Insertar token
        yield connection_1.default.query(`UPDATE usuarios SET token = '${token}' WHERE id_usuario = ${usuario.id_usuario};`);
        res.json({
            usuario,
            token,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Eliminar token
        yield connection_1.default.query(`UPDATE usuarios SET token = null WHERE id_usuario = ${id};`);
        res.json({ msg: "Sesión cerrada exitosamente" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al cerrar la sesión del usuario" });
    }
});
exports.logout = logout;
//# sourceMappingURL=login.js.map