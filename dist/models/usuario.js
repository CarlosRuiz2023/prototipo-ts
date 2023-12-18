"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Usuario extends sequelize_1.Model {
}
Usuario.init({
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    correo: {
        type: sequelize_1.DataTypes.STRING(255),
        unique: true,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    id_rol: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    latitud: {
        type: sequelize_1.DataTypes.DECIMAL(9, 6),
    },
    longitud: {
        type: sequelize_1.DataTypes.DECIMAL(9, 6),
    },
    estatus: {
        type: sequelize_1.DataTypes.STRING(50),
        validate: {
            isIn: [["activo", "inactivo", "bloqueado"]],
        },
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
    modelName: "Usuario",
    timestamps: false,
    tableName: "usuarios", // Nombre real de la tabla en la base de datos
});
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map