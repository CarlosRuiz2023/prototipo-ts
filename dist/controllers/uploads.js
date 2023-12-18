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
exports.mostrarImagen = exports.actualizarImagen = exports.cargarArchivo = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const subir_archivo_1 = require("../helpers/subir-archivo");
const visita_1 = __importDefault(require("../models/visita"));
const candidato_1 = __importDefault(require("../models/candidato"));
const connection_1 = __importDefault(require("../db/connection"));
const cargarArchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const archivos = req.files;
        const nombre = yield (0, subir_archivo_1.subirArchivo)(archivos, [], "imgs");
        res.json({ nombre });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.cargarArchivo = cargarArchivo;
const actualizarImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case "candidatos":
            modelo = yield candidato_1.default.findOne({
                where: {
                    id_candidato: id,
                },
            });
            if (!modelo) {
                res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
                return;
            }
            break;
        case "visitas":
            modelo = yield visita_1.default.findOne({
                where: {
                    id_visita: id,
                },
            });
            if (!modelo) {
                res.status(400).json({ msg: `No existe un producto con el id ${id}` });
                return;
            }
            break;
        default:
            res.status(500).json({ msg: "Se me olvido validar esto" });
            return;
    }
    // Limpiar imágenes previas
    if (modelo.dataValues.fotografia) {
        const pathImagen = path_1.default.join(__dirname, "../..", // Retrocede dos niveles desde la carpeta actual
        "uploads", coleccion, modelo.dataValues.fotografia);
        if (fs_1.default.existsSync(pathImagen)) {
            try {
                fs_1.default.unlinkSync(pathImagen);
            }
            catch (error) {
                console.error("Error al borrar la imagen previa:", error);
            }
        }
    }
    const archivos = req.files;
    const nombre = yield (0, subir_archivo_1.subirArchivo)(archivos, [], coleccion);
    modelo.dataValues.fotografia = nombre;
    if (coleccion === "candidatos") {
        yield connection_1.default.query(`UPDATE candidatos SET fotografia = '${nombre}' WHERE id_candidato=${modelo.dataValues.id_candidato}`);
    }
    if (coleccion === "visitas") {
        yield connection_1.default.query(`UPDATE visitas SET fotografia = '${nombre}' WHERE id_visita=${modelo.dataValues.id_visita}`);
    }
    res.json(modelo);
});
exports.actualizarImagen = actualizarImagen;
const mostrarImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case "candidatos":
            modelo = yield candidato_1.default.findOne({
                where: {
                    id_candidato: id,
                },
            });
            if (!modelo) {
                res.status(400).json({ msg: `No existe un candidato con el id ${id}` });
                return;
            }
            break;
        case "visitas":
            modelo = yield visita_1.default.findOne({
                where: {
                    id_visita: id,
                },
            });
            if (!modelo) {
                res.status(400).json({ msg: `No existe una visita con el id ${id}` });
                return;
            }
            break;
        default:
            res.status(500).json({ msg: "Se me olvido validar esto" });
            return;
    }
    // Limpiar imágenes previas
    if (modelo.dataValues.fotografia) {
        const pathImagen = path_1.default.join(__dirname, "../..", // Retrocede dos niveles desde la carpeta actual
        "uploads", coleccion, modelo.dataValues.fotografia);
        if (fs_1.default.existsSync(pathImagen)) {
            try {
                return res.sendFile(pathImagen);
            }
            catch (error) {
                console.error("Error al borrar la imagen previa:", error);
            }
        }
    }
    const pathImagen = path_1.default.join(__dirname, "../..", // Retrocede dos niveles desde la carpeta actual
    "/assets/no-image.jpg");
    res.sendFile(pathImagen);
});
exports.mostrarImagen = mostrarImagen;
//# sourceMappingURL=uploads.js.map