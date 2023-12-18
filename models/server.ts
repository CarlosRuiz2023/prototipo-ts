import express, { Application } from "express";
import userRoutes from "../routes/usuario";
import apoyoRoutes from "../routes/apoyo";
import authRoutes from "../routes/auth";
import candidatoRoutes from "../routes/candidato";
import permisoRoutes from "../routes/permiso";
import rolRoutes from "../routes/rol";
import serviceRoutes from "../routes/service";
import soporteRoutes from "../routes/soporte";
import uploadRoutes from "../routes/upload";
import cors from "cors";
import db from "../db/connection";
import fileUpload from "express-fileupload";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    auth: "/api/auth",
    roles: "/api/roles",
    permisos: "/api/permisos",
    apoyo: "/api/apoyo",
    usuarios: "/api/usuarios",
    candidatos: "/api/candidatos",
    services: "/api/services",
    soporte: "/api/soporte",
    uploads: "/api/uploads",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";
    //Metodos iniciales
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("Database online");
    } catch (error) {
      throw new Error("" + error);
    }
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura del body
    this.app.use(express.json());

    //Carpeta publica
    this.app.use(express.static("public"));

    // Middleware para la carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.apiPaths.auth, authRoutes);
    this.app.use(this.apiPaths.roles, rolRoutes);
    this.app.use(this.apiPaths.permisos, permisoRoutes);
    this.app.use(this.apiPaths.apoyo, apoyoRoutes);
    this.app.use(this.apiPaths.usuarios, userRoutes);
    this.app.use(this.apiPaths.candidatos, candidatoRoutes);
    this.app.use(this.apiPaths.services, serviceRoutes);
    this.app.use(this.apiPaths.soporte, soporteRoutes);
    this.app.use(this.apiPaths.uploads, uploadRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto " + this.port);
    });
  }
}
export default Server;
