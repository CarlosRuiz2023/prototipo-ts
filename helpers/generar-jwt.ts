import jwt from "jsonwebtoken";

const generarJWT = (uid: string = ""): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY || "Est03sMyPublick3y23@913", // Asegúrate de definir el tipo y valor adecuado
      {
        expiresIn: "4h",
      },
      (err: Error | null, token?: string) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token || "");
        }
      }
    );
  });
};

export { generarJWT };
