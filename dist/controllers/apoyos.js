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
exports.apoyosGet = exports.apoyosEstatusGet = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const apoyosGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield connection_1.default.query(`SELECT * FROM tipos_apoyo;`);
        // Mapear nombres para reestructurar
        const apoyosSimplificados = results.map((apoyo) => {
            const { nombre } = apoyo;
            return nombre;
        });
        res.json({
            apoyo: apoyosSimplificados,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
});
exports.apoyosGet = apoyosGet;
const apoyosEstatusGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield connection_1.default.query(`SELECT * FROM estatus_apoyo;`);
        // Mapear nombres para reestructurar
        const apoyosSimplificados = results.map((apoyo) => {
            const { nombre } = apoyo;
            return nombre;
        });
        res.json({
            apoyo_estatus: apoyosSimplificados,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
});
exports.apoyosEstatusGet = apoyosEstatusGet;
//# sourceMappingURL=apoyos.js.map