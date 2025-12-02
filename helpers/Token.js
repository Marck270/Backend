// helpers/Token.js
import crypto from "crypto";
import jwt from 'jsonwebtoken';

// Token de confirmación para correo
export const generarToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Token JWT para autenticación
export const generarTokenJWT = (usuario) => {
  return jwt.sign(
    {
      id: usuario.id_usr,
      tipo: usuario.tipo,
      nombre: usuario.nombre,
      correo: usuario.correo
    },
    process.env.JWT_SECRET || 'secreto-desarrollo',
    { expiresIn: '24h' }
  );
};

export const verificarTokenJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secreto-desarrollo');
  } catch (error) {
    return null;
  }
};

// Para compatibilidad, también exportar como default
export default {
  generarToken,
  generarTokenJWT,
  verificarTokenJWT
};