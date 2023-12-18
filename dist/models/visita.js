"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Visita extends sequelize_1.Model {
}
Visita.init({
    id_visita: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_candidato: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "candidatos",
            key: "id_candidato",
        },
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "usuarios",
            key: "id_usuario",
        },
    },
    razon: {
        type: sequelize_1.DataTypes.STRING(150),
    },
    fotografia: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    latitud: {
        type: sequelize_1.DataTypes.DECIMAL(9, 6),
    },
    longitud: {
        type: sequelize_1.DataTypes.DECIMAL(9, 6),
    },
    createdAt: {
        field: "created_at",
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        field: "updated_at",
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize: connection_1.default,
    modelName: "Visita",
    timestamps: false,
    tableName: "visitas", // Nombre real de la tabla en la base de datos
});
exports.default = Visita;
//# sourceMappingURL=visita.js.map