import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/generar-jwt";
import sequelize from "../db/connection";

const login = async (req: Request, res: Response): Promise<void> => {
  const { correo, password } = req.body;

  try {
    // Verificar si el email existe
    const [result]: any[] = await sequelize.query(
      `SELECT * FROM usuarios WHERE correo = '${correo}';`
    );

    const usuario = result[0];

    if (!usuario) {
      res.status(400).json({
        msg: "Usuario / Password no son correctos - Correo",
      });
      return;
    }

    // Si el usuario esta inactivo
    if (usuario.estatus === 2) {
      res.status(400).json({
        msg: "Usuario / Password no son correctos - estado:false",
      });
      return;
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
      return;
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id_usuario);

    // Insertar token
    await sequelize.query(
      `UPDATE usuarios SET token = '${token}' WHERE id_usuario = ${usuario.id_usuario};`
    );

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Eliminar token
    await sequelize.query(
      `UPDATE usuarios SET token = null WHERE id_usuario = ${id};`
    );

    res.json({ msg: "Sesión cerrada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al cerrar la sesión del usuario" });
  }
};

export { login, logout };
