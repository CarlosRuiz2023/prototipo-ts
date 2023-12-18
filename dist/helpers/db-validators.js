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
exports.coleccionesPermitidas = exports.existeVisitaPorId = exports.existeCandidatoPorId = exports.emailExistente = exports.existeUsuarioPorId = exports.emailExiste = exports.emailInexiste = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const candidato_1 = __importDefault(require("../models/candidato"));
const visita_1 = __importDefault(require("../models/visita"));
const emailExiste = (correo = "") => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({
        where: {
            correo: correo,
        },
    });
    if (usuario) {
        throw new Error(`El correo ${correo} ya está registrado`);
    }
});
exports.emailExiste = emailExiste;
const emailExistente = (correo = "") => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({
        where: {
            correo: correo,
        },
    });
    if (!usuario) {
        throw new Error(`El correo ${correo} no se encuentra registrado`);
    }
});
exports.emailExistente = emailExistente;
const emailInexiste = (correo = "", id = 0) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({
        where: {
            correo: correo,
        },
    });
    if (usuario) {
        if (usuario.id_usuario != `${id}`) {
            throw new Error(`El correo ${correo} ya está registrado con otro usuario`);
        }
    }
});
exports.emailInexiste = emailInexiste;
const existeUsuarioPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        throw new Error(`El usuario con ID ${id} no existe`);
    }
});
exports.existeUsuarioPorId = existeUsuarioPorId;
const existeCandidatoPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const candidato = yield candidato_1.default.findByPk(id);
    if (!candidato) {
        throw new Error(`El candidato con ID ${id} no existe`);
    }
});
exports.existeCandidatoPorId = existeCandidatoPorId;
const existeVisitaPorId = (id_visita) => __awaiter(void 0, void 0, void 0, function* () {
    const visita = yield visita_1.default.findByPk(id_visita);
    if (!visita) {
        throw new Error(`La visita con ID ${id_visita} no existe`);
    }
});
exports.existeVisitaPorId = existeVisitaPorId;
const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`);
    }
    return true;
};
exports.coleccionesPermitidas = coleccionesPermitidas;
//# sourceMappingURL=db-validators.js.map