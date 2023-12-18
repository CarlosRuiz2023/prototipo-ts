import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { subirArchivo } from "../helpers/subir-archivo";
import Visita from "../models/visita";
import Candidato from "../models/candidato";
import fileUpload from "express-fileupload";
import sequelize from "../db/connection";

const cargarArchivo = async (req: Request, res: Response): Promise<void> => {
  try {
    const archivos: any = req.files as fileUpload.FileArray;

    const nombre = await subirArchivo(archivos, [], "imgs");
    res.json({ nombre });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const actualizarImagen = async (req: Request, res: Response): Promise<void> => {
  const { id, coleccion } = req.params;

  let modelo: any;

  switch (coleccion) {
    case "candidatos":
      modelo = await Candidato.findOne({
        where: {
          id_candidato: id,
        },
      });
      if (!modelo) {
        res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
        return;
      }
      break;
    case "visitas":
      modelo = await Visita.findOne({
        where: {
          id_visita: id,
        },
      });
      if (!modelo) {
        res.status(400).json({ msg: `No existe un producto con el id ${id}` });
        return;
      }
      break;
    default:
      res.status(500).json({ msg: "Se me olvido validar esto" });
      return;
  }
  // Limpiar imágenes previas
  if (modelo.dataValues.fotografia) {
    const pathImagen = path.join(
      __dirname,
      "../..", // Retrocede dos niveles desde la carpeta actual
      "uploads",
      coleccion,
      modelo.dataValues.fotografia
    );
    if (fs.existsSync(pathImagen)) {
      try {
        fs.unlinkSync(pathImagen);
      } catch (error) {
        console.error("Error al borrar la imagen previa:", error);
      }
    }
  }

  const archivos: any = req.files as fileUpload.FileArray;

  const nombre = await subirArchivo(archivos, [], coleccion);
  modelo.dataValues.fotografia = nombre;

  if (coleccion === "candidatos") {
    await sequelize.query(
      `UPDATE candidatos SET fotografia = '${nombre}' WHERE id_candidato=${modelo.dataValues.id_candidato}`
    );
  }
  if (coleccion === "visitas") {
    await sequelize.query(
      `UPDATE visitas SET fotografia = '${nombre}' WHERE id_visita=${modelo.dataValues.id_visita}`
    );
  }
  res.json(modelo);
};

const mostrarImagen = async (req: Request, res: Response): Promise<void> => {
  const { id, coleccion } = req.params;
  let modelo: any;

  switch (coleccion) {
    case "candidatos":
      modelo = await Candidato.findOne({
        where: {
          id_candidato: id,
        },
      });
      if (!modelo) {
        res.status(400).json({ msg: `No existe un candidato con el id ${id}` });
        return;
      }
      break;
    case "visitas":
      modelo = await Visita.findOne({
        where: {
          id_visita: id,
        },
      });
      if (!modelo) {
        res.status(400).json({ msg: `No existe una visita con el id ${id}` });
        return;
      }
      break;
    default:
      res.status(500).json({ msg: "Se me olvido validar esto" });
      return;
  }
  // Limpiar imágenes previas
  if (modelo.dataValues.fotografia) {
    const pathImagen = path.join(
      __dirname,
      "../..", // Retrocede dos niveles desde la carpeta actual
      "uploads",
      coleccion,
      modelo.dataValues.fotografia
    );
    if (fs.existsSync(pathImagen)) {
      try {
        return res.sendFile(pathImagen);
      } catch (error) {
        console.error("Error al borrar la imagen previa:", error);
      }
    }
  }

  const pathImagen = path.join(
    __dirname,
    "../..", // Retrocede dos niveles desde la carpeta actual
    "/assets/no-image.jpg"
  );
  res.sendFile(pathImagen);
};

export { cargarArchivo, actualizarImagen, mostrarImagen };
