import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";

interface VisitaAttributes {
  id_visita: number;
  id_candidato: number;
  id_usuario: number;
  razon?: string | null;
  fotografia?: string | null;
  latitud?: number | null;
  longitud?: number | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

class Visita extends Model<VisitaAttributes> {}

Visita.init(
  {
    id_visita: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_candidato: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "candidatos",
        key: "id_candidato",
      },
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id_usuario",
      },
    },
    razon: {
      type: DataTypes.STRING(150),
    },

    fotografia: {
      type: DataTypes.STRING(255),
    },

    latitud: {
      type: DataTypes.DECIMAL(9, 6),
    },

    longitud: {
      type: DataTypes.DECIMAL(9, 6),
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
    modelName: "Visita",
    timestamps: false, // Opcional, dependiendo de si usas timestamps
    tableName: "visitas", // Nombre real de la tabla en la base de datos
  }
);
export default Visita;
