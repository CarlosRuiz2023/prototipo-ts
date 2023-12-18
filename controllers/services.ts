import axios from "axios";
import { Request, Response } from "express";
import estados from "../db/estadosmexico.json";
import estadosMunicipios from "../db/estados-municipios";
import sequelize from "../db/connection";

const estadosGet = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Mapear array de estados para remover el ID
    const estadosSimplificados: string[] = estados.map((estado: any) => {
      const { nombre } = estado;
      return nombre;
    });

    res.json({
      estados: estadosSimplificados,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener los estados" });
  }
};

const conexionGet = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Ejemplo de una consulta simple para verificar la conexión
    const [result] = await sequelize.query("SELECT 1");
    if (result) {
      res.status(200).json({ msg: "Conexión exitosa" });
    } else {
      res.status(500).json({ msg: "No se pudo establecer la conexión" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Error al verificar la conexión a la base de datos" });
  }
};

const municipiosGet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { estado } = req.params;
    // Obtener array de municipios para el estado
    const municipios = estadosMunicipios[estado];
    if (!municipios) {
      res.status(400).json({
        msg: "Estado no encontrado",
      });
      return;
    }
    res.json({
      municipios,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener municipios" });
  }
};

const coordenadasPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tipo_busqueda } = req.params;
    if (tipo_busqueda === "0") {
      const { direccion } = req.body;
      const direccionFormat = direccion.replace(/\s/g, "%20");
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${direccionFormat}.json?country=mx&proximity=ip&access_token=${
        process.env.MAPBOX_KEY ||
        "pk.eyJ1IjoiY2FybG9zZ29tZTIwMjMiLCJhIjoiY2xvMjdubGUzMGdyczJpbXMxNWk4dWV2ZiJ9.351WLg6_0x_Kq8gd7ixInA"
      }`;
      const response = await axios.get(url);
      const coordenadas = response.data.features[0].geometry.coordinates;
      const [longitud, latitud] = coordenadas;
      res.json({ latitud, longitud });
    } else {
      const { latitud, longitud } = req.body;
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitud},${latitud}.json?access_token=${
        process.env.MAPBOX_KEY ||
        "pk.eyJ1IjoiY2FybG9zZ29tZTIwMjMiLCJhIjoiY2xvMjdubGUzMGdyczJpbXMxNWk4dWV2ZiJ9.351WLg6_0x_Kq8gd7ixInA"
      }`;
      const response = await axios.get(url);
      const direccion = response.data.features[0].place_name;
      res.json({ direccion });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener las coordenadas" });
  }
};

export { estadosGet, municipiosGet, coordenadasPost, conexionGet };
