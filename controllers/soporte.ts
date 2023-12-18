import { Request, Response } from "express";
import nodemailer from "nodemailer";
import sequelize from "../db/connection";
import bcryptjs from "bcryptjs";

// Configuración del transporter para Gmail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "charlyxbox360nuevo@gmail.com",
    pass: (process.env.GOOGLE_APP_PASSWORD as string) || "cali ynuu onwe rvbk",
  },
});

transporter.verify().then(() => {
  console.log("Ready for send emails");
});

const soporteCorreoPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { correo } = req.params;

    // Construye el enlace de activación (cambia por tu lógica real)
    const activationLink = `https://prototipo2023-d6240700184c.herokuapp.com/api/soporte/contrasenia/${correo}`;

    const mailOptions = {
      from: '"Soporte" <charlyxbox360nuevo@gmail.com>',
      to: "juancarlosruizgomez2000@gmail.com", // Cambia esto por el correo del destinatario
      subject: "Solicitud de cambio de contraseña",
      text: `Hola,\n\nSe ha solicitado un cambio de contraseña. Por favor, haz clic en el siguiente enlace para activar:\n\n${activationLink}\n\nAtentamente,\nCharly`,
    };
    await transporter.sendMail(mailOptions);
    res.json({
      ok: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const soportePasswordPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { correo } = req.params;

    // Generar contraseña aleatoria
    const newPassword = generateRandomPassword();

    // Opciones de correo
    const mailOptions = {
      from: '"Soporte" <charlyxbox360nuevo@gmail.com>',
      to: correo as string,
      subject: "Nueva contraseña",
      text: `Hola, 
             Tu nueva contraseña es: ${newPassword}
             Por favor cámbiala después de iniciar sesión.`,
    };

    // Enviar Correo
    await transporter.sendMail(mailOptions);

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    const password = bcryptjs.hashSync(newPassword, salt);

    // Llamar al procedimiento
    await sequelize.query(
      `UPDATE usuarios SET password = '${password}' WHERE correo='${correo}'`
    );

    res.json({
      ok: true,
      msg: "Que revise su correo para ver su nueva contraseña",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Error al enviar contraseña. Intente más tarde" });
  }
};

function generateRandomPassword(): string {
  return Math.random().toString(36).slice(-8);
}

export { soporteCorreoPost, soportePasswordPost };
