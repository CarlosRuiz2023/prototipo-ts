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
exports.visitasAllGet = exports.visitasGet = exports.candidatosApoyoPut = exports.visitasPost = exports.candidatosPut = exports.candidatosPost = exports.candidatosGet = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const visita_1 = __importDefault(require("../models/visita"));
const candidato_1 = __importDefault(require("../models/candidato"));
const candidatosGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield connection_1.default.query("SELECT * FROM candidatos;");
        res.json({
            candidatos: results,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
});
exports.candidatosGet = candidatosGet;
const candidatosPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // obtener datos del body
        const { nombre, edad, estado, municipio, colonia, calle, entre_calles, no_int = "", no_ext, institucion, grado_escolaridad, fotografia = "", id_tipo_apoyo, id_estatus, latitud, longitud, } = req.body;
        const candidato = yield candidato_1.default.findOne({
            where: {
                nombre,
            },
        });
        if (candidato && candidato.nombre) {
            res.status(400).json({
                msg: `El candidato ${candidato.nombre}, ya existe`,
            });
            return; // Termina la ejecución aquí
        }
        // llamar procedimiento
        yield connection_1.default.query(`CALL insertar_candidato(:nombre, :edad, :estado, :municipio, :colonia, :calle, :entre_calles, :no_int, :no_ext, :institucion, :grado_escolaridad, :fotografia, :id_tipo_apoyo, :id_estatus, :latitud, :longitud)`, {
            replacements: {
                nombre,
                edad,
                estado,
                municipio,
                colonia,
                calle,
                entre_calles,
                no_int,
                no_ext,
                institucion,
                grado_escolaridad,
                fotografia,
                id_tipo_apoyo,
                id_estatus,
                latitud,
                longitud,
            },
        });
        const candidatoInsertado = yield candidato_1.default.findOne({
            where: {
                nombre,
            },
            order: [["created_at", "DESC"]],
        });
        const candidatoId = candidatoInsertado.id_candidato;
        res.json({
            msg: "Candidato registrado",
            id_candidato: candidatoId,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al insertar candidato" });
    }
});
exports.candidatosPost = candidatosPost;
const candidatosPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // obtener datos del body
        const { nombre, edad, estado, municipio, colonia, calle, entre_calles, no_int = "", no_ext, institucion, grado_escolaridad, fotografia = "", id_tipo_apoyo, id_estatus, latitud = 0.0, longitud = 0.0, pregunta1 = 0, pregunta2 = "", pregunta3 = "", pregunta4 = "", pregunta5 = "", pregunta6 = "", pregunta7 = "", pregunta8 = "", pregunta9 = "", } = req.body;
        const candidatoActual = yield candidato_1.default.findByPk(id);
        if (!candidatoActual || candidatoActual.nombre !== nombre) {
            const candidato = yield candidato_1.default.findOne({
                where: {
                    nombre,
                },
            });
            if (candidato && candidato.nombre) {
                res.status(400).json({
                    msg: `El candidato ${candidato.nombre}, ya existe`,
                });
                return; // Termina la ejecución aquí
            }
        }
        const pregunta10 = JSON.stringify({
            a1: req.body.pregunta10.a1,
            a2: req.body.pregunta10.a2,
        });
        // Llamar al procedimiento
        yield connection_1.default.query(`CALL actualizar_candidato(:id, :nombre, :edad, :estado, :municipio, :colonia, :calle, :entre_calles, :no_int, :no_ext, :institucion, :grado_escolaridad, :fotografia, :id_tipo_apoyo, :id_estatus, :latitud, :longitud, :pregunta1, :pregunta2, :pregunta3, :pregunta4, :pregunta5, :pregunta6, :pregunta7, :pregunta8, :pregunta9, :pregunta10)`, {
            replacements: {
                id,
                nombre,
                edad,
                estado,
                municipio,
                colonia,
                calle,
                entre_calles,
                no_int,
                no_ext,
                institucion,
                grado_escolaridad,
                fotografia,
                id_tipo_apoyo,
                id_estatus,
                latitud,
                longitud,
                pregunta1,
                pregunta2,
                pregunta3,
                pregunta4,
                pregunta5,
                pregunta6,
                pregunta7,
                pregunta8,
                pregunta9,
                pregunta10,
            },
        });
        res.json({
            msg: "Candidato actualizado",
            id, // Respondemos con el ID actualizado
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar candidato" });
    }
});
exports.candidatosPut = candidatosPut;
const candidatosApoyoPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // obtener datos del body
        const { id_estatus_apoyo } = req.body;
        // Llamar al procedimiento
        yield connection_1.default.query(`UPDATE candidatos SET id_estatus=${id_estatus_apoyo}`);
        res.json({
            msg: "Estatus del candidato actualizado",
            id, // Respondemos con el ID actualizado
        });
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ msg: "Error al actualizar el estatus del candidato" });
    }
});
exports.candidatosApoyoPut = candidatosApoyoPut;
const visitasPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_candidato } = req.params;
        // obtener datos del body
        const { id_usuario, razon = "", id_estatus_encuesta = 0, fotografia = "", latitud = 0.0, longitud = 0.0, } = req.body;
        // llamar procedimiento
        yield connection_1.default.query(`CALL insertar_visita(:id_candidato, :id_usuario, :razon, :id_estatus_encuesta, :fotografia, :latitud, :longitud)`, {
            replacements: {
                id_candidato,
                id_usuario,
                razon,
                id_estatus_encuesta,
                fotografia,
                latitud,
                longitud,
            },
        });
        const visitaInsertada = yield visita_1.default.findOne({
            where: {
                id_candidato,
            },
            order: [["created_at", "DESC"]],
        });
        const visitaId = visitaInsertada.id_visita;
        res.json({
            msg: "Visita registrada",
            id_visita: visitaId,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al insertar candidato" });
    }
});
exports.visitasPost = visitasPost;
const visitasAllGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [visitas] = yield connection_1.default.query(`SELECT v.id_visita,c.nombre AS nombre,t.estatus AS estatus_apoyo,v.id_estatus_encuesta AS visitado,v.id_estatus_encuesta AS estatus_encuesta,u.nombre AS nombre_usuario,v.created_at AS fecha_visita,e.nombre AS catalogos FROM visitas AS v INNER JOIN candidatos AS c ON v.id_candidato=c.id_candidato INNER JOIN usuarios AS u ON u.id_usuario=v.id_usuario INNER JOIN estatus_apoyo AS e ON e.id_estatus=c.id_estatus INNER JOIN tipos_apoyo AS t ON c.id_tipo_apoyo=t.id_tipo_apoyo;`);
        res.json({
            visitas,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al insertar candidato" });
    }
});
exports.visitasAllGet = visitasAllGet;
const visitasGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_visita } = req.params;
        // llamar procedimiento
        const [result] = yield connection_1.default.query(`SELECT v.id_visita,v.id_candidato,v.id_usuario,v.razon,v.id_estatus_encuesta,v.fotografia AS fotografia_visita,v.latitud,v.longitud,v.created_at AS date_visita,c.nombre,c.edad,c.estado,c.municipio,c.colonia,c.calle,c.entre_calles,c.no_int,c.no_ext,c.institucion,c.grado_escolaridad,c.fotografia AS fotografia_candidato,c.id_tipo_apoyo,c.id_estatus,c.pregunta1,c.pregunta2,c.pregunta3,c.pregunta4,c.pregunta5,c.pregunta6,c.pregunta7,c.pregunta8,c.pregunta9,c.pregunta10,c.created_at AS date_candidato,u.nombre AS nombre_usuario, u.correo, u.password,u.id_rol FROM visitas AS v INNER JOIN candidatos AS c ON v.id_candidato=c.id_candidato INNER JOIN usuarios AS u ON u.id_usuario=v.id_usuario WHERE id_visita=${id_visita};`);
        res.json({
            result,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al insertar candidato" });
    }
});
exports.visitasGet = visitasGet;
//# sourceMappingURL=candidatos.js.map