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
exports.conexionGet = exports.coordenadasPost = exports.municipiosGet = exports.estadosGet = void 0;
const axios_1 = __importDefault(require("axios"));
const estadosmexico_json_1 = __importDefault(require("../db/estadosmexico.json"));
const estados_municipios_1 = __importDefault(require("../db/estados-municipios"));
const connection_1 = __importDefault(require("../db/connection"));
const estadosGet = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Mapear array de estados para remover el ID
        const estadosSimplificados = estadosmexico_json_1.default.map((estado) => {
            const { nombre } = estado;
            return nombre;
        });
        res.json({
            estados: estadosSimplificados,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener los estados" });
    }
});
exports.estadosGet = estadosGet;
const conexionGet = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ejemplo de una consulta simple para verificar la conexión
        const [result] = yield connection_1.default.query("SELECT 1");
        if (result) {
            res.status(200).json({ msg: "Conexión exitosa" });
        }
        else {
            res.status(500).json({ msg: "No se pudo establecer la conexión" });
        }
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ msg: "Error al verificar la conexión a la base de datos" });
    }
});
exports.conexionGet = conexionGet;
const municipiosGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { estado } = req.params;
        // Obtener array de municipios para el estado
        const municipios = estados_municipios_1.default[estado];
        if (!municipios) {
            res.status(400).json({
                msg: "Estado no encontrado",
            });
            return;
        }
        res.json({
            municipios,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener municipios" });
    }
});
exports.municipiosGet = municipiosGet;
const coordenadasPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tipo_busqueda } = req.params;
        if (tipo_busqueda === "0") {
            const { direccion } = req.body;
            const direccionFormat = direccion.replace(/\s/g, "%20");
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${direccionFormat}.json?country=mx&proximity=ip&access_token=${process.env.MAPBOX_KEY ||
                "pk.eyJ1IjoiY2FybG9zZ29tZTIwMjMiLCJhIjoiY2xvMjdubGUzMGdyczJpbXMxNWk4dWV2ZiJ9.351WLg6_0x_Kq8gd7ixInA"}`;
            const response = yield axios_1.default.get(url);
            const coordenadas = response.data.features[0].geometry.coordinates;
            const [longitud, latitud] = coordenadas;
            res.json({ latitud, longitud });
        }
        else {
            const { latitud, longitud } = req.body;
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitud},${latitud}.json?access_token=${process.env.MAPBOX_KEY ||
                "pk.eyJ1IjoiY2FybG9zZ29tZTIwMjMiLCJhIjoiY2xvMjdubGUzMGdyczJpbXMxNWk4dWV2ZiJ9.351WLg6_0x_Kq8gd7ixInA"}`;
            const response = yield axios_1.default.get(url);
            const direccion = response.data.features[0].place_name;
            res.json({ direccion });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener las coordenadas" });
    }
});
exports.coordenadasPost = coordenadasPost;
//# sourceMappingURL=services.js.map