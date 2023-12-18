"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.soportePasswordPost = exports.soporteCorreoPost = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const connection_1 = __importDefault(require("../db/connection"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Configuración del transporter para Gmail
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "charlyxbox360nuevo@gmail.com",
        pass: process.env.GOOGLE_APP_PASSWORD || "cali ynuu onwe rvbk",
    },
});
transporter.verify().then(() => {
    console.log("Ready for send emails");
});
const soporteCorreoPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo } = req.params;
        // Construye el enlace de activación (cambia por tu lógica real)
        const activationLink = `https://prototipo2023-d6240700184c.herokuapp.com/api/soporte/contrasenia/${correo}`;
        const mailOptions = {
            from: '"Soporte" <charlyxbox360nuevo@gmail.com>',
            to: "juancarlosruizgomez2000@gmail.com",
            subject: "Solicitud de cambio de contraseña",
            text: `Hola,\n\nSe ha solicitado un cambio de contraseña. Por favor, haz clic en el siguiente enlace para activar:\n\n${activationLink}\n\nAtentamente,\nCharly`,
        };
        yield transporter.sendMail(mailOptions);
        res.json({
            ok: "Email sent successfully",
        });
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
});
exports.soporteCorreoPost = soporteCorreoPost;
const soportePasswordPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo } = req.params;
        // Generar contraseña aleatoria
        const newPassword = generateRandomPassword();
        // Opciones de correo
        const mailOptions = {
            from: '"Soporte" <charlyxbox360nuevo@gmail.com>',
            to: correo,
            subject: "Nueva contraseña",
            text: `Hola, 
             Tu nueva contraseña es: ${newPassword}
             Por favor cámbiala después de iniciar sesión.`,
        };
        // Enviar Correo
        yield transporter.sendMail(mailOptions);
        // Encriptar la contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        const password = bcryptjs_1.default.hashSync(newPassword, salt);
        // Llamar al procedimiento
        yield connection_1.default.query(`UPDATE usuarios SET password = '${password}' WHERE correo='${correo}'`);
        res.json({
            ok: true,
            msg: "Que revise su correo para ver su nueva contraseña",
        });
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msg: "Error al enviar contraseña. Intente más tarde" });
    }
});
exports.soportePasswordPost = soportePasswordPost;
function generateRandomPassword() {
    return Math.random().toString(36).slice(-8);
}
//# sourceMappingURL=soporte.js.map