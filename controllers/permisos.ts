import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import sequelize from "../db/connection";

const permisosGet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_rol } = req.params;
    const [results]: any[] = await sequelize.query(
      `SELECT p.nombre FROM permisos AS p INNER JOIN roles_permisos AS r ON p.id_permiso=r.id_permiso WHERE id_rol = ${id_rol};`
    );

    // Mapear nombres para reestructurar
    const permisosSimplificados: string[] = results.map((permiso: any) => {
      const { nombre } = permiso;
      return nombre;
    });

    res.json({
      permisos: permisosSimplificados,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

export { permisosGet };
