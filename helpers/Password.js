// helpers/Password.js
import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const verificarPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// Para compatibilidad
export default {
  hashPassword,
  verificarPassword
};