import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";

interface CandidatoAttributes {
  id_candidato: number;
  nombre: string;
  edad: number;
  estado: string;
  municipio: string;
  colonia: string;
  calle: string;
  entre_calles: string;
  no_int?: string | null;
  no_ext: string;
  institucion: string;
  grado_escolaridad: string;
  fotografia?: string | null;
  id_tipo_apoyo: number;
  id_estatus: number;
  latitud: number;
  longitud: number;
  pregunta1?: number | null;
  pregunta2?: string | null;
  pregunta3?: string | null;
  pregunta4?: string | null;
  pregunta5?: string | null;
  pregunta6?: string | null;
  pregunta7?: string | null;
  pregunta8?: string | null;
  pregunta9?: string | null;
  pregunta10?: any | null; // Podría ser un tipo específico dependiendo del contenido
  created_at?: Date | null;
  updated_at?: Date | null;
}

class Candidato extends Model<CandidatoAttributes> {}

Candidato.init(
  {
    id_candidato: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    municipio: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    colonia: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    calle: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    entre_calles: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    no_int: {
      type: DataTypes.STRING(10),
    },
    no_ext: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    institucion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    grado_escolaridad: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fotografia: {
      type: DataTypes.STRING(255),
    },
    id_tipo_apoyo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tipos_apoyo",
        key: "id_tipo_apoyo",
      },
    },
    id_estatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "estatus_apoyo",
        key: "id_estatus",
      },
    },
    latitud: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
    },
    longitud: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
    },
    pregunta1: {
      type: DataTypes.INTEGER,
    },
    pregunta2: {
      type: DataTypes.STRING(100),
    },
    pregunta3: {
      type: DataTypes.STRING(100),
    },
    pregunta4: {
      type: DataTypes.STRING(100),
    },
    pregunta5: {
      type: DataTypes.STRING(100),
    },
    pregunta6: {
      type: DataTypes.STRING(100),
    },
    pregunta7: {
      type: DataTypes.STRING(100),
    },
    pregunta8: {
      type: DataTypes.STRING(100),
    },
    pregunta9: {
      type: DataTypes.STRING(100),
    },
    pregunta10: {
      type: DataTypes.JSONB,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "Candidato",
    timestamps: false, // Opcional, dependiendo de si usas timestamps
    tableName: "candidatos", // Nombre real de la tabla en la base de datos
  }
);
export default Candidato;
