// helpers/Token.js
import jwt from 'jsonwebtoken';
import crypto from "crypto";

// Para confirmación de cuenta (correo)
export const generarTokenConfirmacion = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Para autenticación JWT
export const generarTokenJWT = (usuario) => {
  return jwt.sign(
    {
      id: usuario.id_usr,
      tipo: usuario.tipo,
      nombre: usuario.nombre
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