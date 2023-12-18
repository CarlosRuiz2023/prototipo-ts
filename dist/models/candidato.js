"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Candidato extends sequelize_1.Model {
}
Candidato.init({
    id_candidato: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    edad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    municipio: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    colonia: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    calle: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    entre_calles: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    no_int: {
        type: sequelize_1.DataTypes.STRING(10),
    },
    no_ext: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
    },
    institucion: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    grado_escolaridad: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    fotografia: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    id_tipo_apoyo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "tipos_apoyo",
            key: "id_tipo_apoyo",
        },
    },
    id_estatus: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "estatus_apoyo",
            key: "id_estatus",
        },
    },
    latitud: {
        type: sequelize_1.DataTypes.DECIMAL(9, 6),
        allowNull: false,
    },
    longitud: {
        type: sequelize_1.DataTypes.DECIMAL(9, 6),
        allowNull: false,
    },
    pregunta1: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    pregunta2: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    pregunta3: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    pregunta4: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    pregunta5: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    pregunta6: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    pregunta7: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    pregunta8: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    pregunta9: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    pregunta10: {
        type: sequelize_1.DataTypes.JSONB,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize: connection_1.default,
    modelName: "Candidato",
    timestamps: false,
    tableName: "candidatos", // Nombre real de la tabla en la base de datos
});
exports.default = Candidato;
//# sourceMappingURL=candidato.js.map