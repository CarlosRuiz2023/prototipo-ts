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
exports.permisosGet = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const permisosGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_rol } = req.params;
        const [results] = yield connection_1.default.query(`SELECT p.nombre FROM permisos AS p INNER JOIN roles_permisos AS r ON p.id_permiso=r.id_permiso WHERE id_rol = ${id_rol};`);
        // Mapear nombres para reestructurar
        const permisosSimplificados = results.map((permiso) => {
            const { nombre } = permiso;
            return nombre;
        });
        res.json({
            permisos: permisosSimplificados,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
});
exports.permisosGet = permisosGet;
//# sourceMappingURL=permisos.js.map