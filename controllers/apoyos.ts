import { Request, Response } from "express";
import sequelize from "../db/connection";

const apoyosGet = async (req: Request, res: Response): Promise<void> => {
  try {
    const [results]: any[] = await sequelize.query(
      `SELECT * FROM tipos_apoyo;`
    );

    // Mapear nombres para reestructurar
    const apoyosSimplificados: string[] = results.map((apoyo: any) => {
      const { nombre }: { nombre: string } = apoyo;
      return nombre;
    });

    res.json({
      apoyo: apoyosSimplificados,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const apoyosEstatusGet = async (req: Request, res: Response): Promise<void> => {
  try {
    const [results]: any[] = await sequelize.query(
      `SELECT * FROM estatus_apoyo;`
    );

    // Mapear nombres para reestructurar
    const apoyosSimplificados: string[] = results.map((apoyo: any) => {
      const { nombre }: { nombre: string } = apoyo;
      return nombre;
    });

    res.json({
      apoyo_estatus: apoyosSimplificados,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

export { apoyosEstatusGet, apoyosGet };
