import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import sequelize from "../db/connection";

const rolesGet = async (req: Request, res: Response): Promise<void> => {
  try {
    const [results]: any[] = await sequelize.query("SELECT nombre FROM roles;");

    // Mapear nombres para remover el ID
    const rolesSimplificados: string[] = results.map((rol: any) => {
      const { nombre } = rol;
      return nombre;
    });

    res.json({
      roles: rolesSimplificados,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

export { rolesGet };
