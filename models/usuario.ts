import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";

interface UsuarioAttributes {
  id_usuario: number;
  correo: string;
  password: string;
  nombre: string;
  id_rol: number;
  latitud: number;
  longitud: number;
  estatus: "activo" | "inactivo" | "bloqueado";
  createdAt: Date;
  updatedAt: Date;
}

class Usuario extends Model<UsuarioAttributes> {}

Usuario.init(
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    correo: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(255),
    },
    id_rol: {
      type: DataTypes.INTEGER,
    },
    latitud: {
      type: DataTypes.DECIMAL(9, 6),
    },
    longitud: {
      type: DataTypes.DECIMAL(9, 6),
    },
    estatus: {
      type: DataTypes.STRING(50),
      validate: {
        isIn: [["activo", "inactivo", "bloqueado"]],
      },
    },
    createdAt: {
      field: "created_at",
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: "updated_at",
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "Usuario",
    timestamps: false, // Opcional, dependiendo de si usas timestamps
    tableName: "usuarios", // Nombre real de la tabla en la base de datos
  }
);

export default Usuario;
