import Usuario from "../models/usuario";
import Candidato from "../models/candidato";
import Visita from "../models/visita";

const emailExiste = async (correo: string = ""): Promise<void> => {
  const usuario: any = await Usuario.findOne({
    where: {
      correo: correo,
    },
  });
  if (usuario) {
    throw new Error(`El correo ${correo} ya está registrado`);
  }
};

const emailExistente = async (correo: string = ""): Promise<void> => {
  const usuario = await Usuario.findOne({
    where: {
      correo: correo,
    },
  });

  if (!usuario) {
    throw new Error(`El correo ${correo} no se encuentra registrado`);
  }
};

const emailInexiste = async (
  correo: string = "",
  id: number = 0
): Promise<void> => {
  const usuario: any = await Usuario.findOne({
    where: {
      correo: correo,
    },
  });

  if (usuario) {
    if (usuario.id_usuario != `${id}`) {
      throw new Error(
        `El correo ${correo} ya está registrado con otro usuario`
      );
    }
  }
};

const existeUsuarioPorId = async (id: number): Promise<void> => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    throw new Error(`El usuario con ID ${id} no existe`);
  }
};

const existeCandidatoPorId = async (id: number): Promise<void> => {
  const candidato = await Candidato.findByPk(id);
  if (!candidato) {
    throw new Error(`El candidato con ID ${id} no existe`);
  }
};

const existeVisitaPorId = async (id_visita: number): Promise<void> => {
  const visita = await Visita.findByPk(id_visita);
  if (!visita) {
    throw new Error(`La visita con ID ${id_visita} no existe`);
  }
};

const coleccionesPermitidas = (
  coleccion: string = "",
  colecciones: string[] = []
): boolean => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error(
      `La coleccion ${coleccion} no es permitida, ${colecciones}`
    );
  }
  return true;
};

export {
  emailInexiste,
  emailExiste,
  existeUsuarioPorId,
  emailExistente,
  existeCandidatoPorId,
  existeVisitaPorId,
  coleccionesPermitidas,
};
