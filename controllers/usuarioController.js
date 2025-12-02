// controllers/usuarioController.js - VERSIÓN CORREGIDA
import bcrypt from 'bcrypt'; // AÑADIR ESTA IMPORTACIÓN
import Usuario from "../models/Usuario.js";
import { generarToken } from "../helpers/Token.js";
import { hashPassword } from "../helpers/Password.js";
import { correoRegistro } from "../helpers/Correo.js";

// Create - REGISTRO DE USUARIO
export const registrar = async (req, res) => {
  const { nombre, correo, password, tipo } = req.body; // Agregar tipo

  try {
    // Verificar si existe
    const existe = await Usuario.findOne({ where: { correo } });
    if (existe) {
      return res.status(400).json({ msg: "El correo ya está registrado" });
    }

    const token = generarToken();

    const nuevoUsuario = await Usuario.create({
      nombre,
      correo,
      password: await hashPassword(password),
      token,
      tipo: tipo || "comprador" // Usar tipo si viene, sino por defecto "comprador"
    });

    // Enviar correo
    await correoRegistro({
      nombre,
      correo,
      token
    });

    res.json({ 
      msg: "Usuario registrado. Revisa tu correo para confirmar.",
      usuario: {
        id: nuevoUsuario.id_usr,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
        tipo: nuevoUsuario.tipo
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

// Login - AGREGAR ESTE MÉTODO (no lo tenías)
export const login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    // Buscar usuario
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(400).json({ msg: "Usuario no encontrado" });
    }

    // Verificar si la cuenta está confirmada
    if (!usuario.confirmar) {
      return res.status(400).json({ msg: "Confirma tu cuenta antes de iniciar sesión" });
    }

    // Verificar contraseña
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    // Excluir campos sensibles
    const usuarioSinSensibles = {
      id_usr: usuario.id_usr,
      nombre: usuario.nombre,
      correo: usuario.correo,
      tipo: usuario.tipo,
      confirmar: usuario.confirmar
    };

    res.json({
      msg: "Login exitoso",
      usuario: usuarioSinSensibles,
      token: generarToken() // Generar token de sesión
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

// Update - CORREGIDO
export const actualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, password, tipo } = req.body;

    // Buscar usuario
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    // Actualizar datos
    if (nombre) usuario.nombre = nombre;
    if (correo) usuario.correo = correo;
    if (tipo) usuario.tipo = tipo;

    // Si viene una nueva contraseña, la encriptamos
    if (password && password.trim() !== "") {
      usuario.password = await bcrypt.hash(password, 10);
    }

    // Guardamos cambios
    await usuario.save();

    return res.json({ 
      msg: "Usuario actualizado correctamente",
      usuario: {
        id: usuario.id_usr,
        nombre: usuario.nombre,
        correo: usuario.correo,
        tipo: usuario.tipo
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al actualizar el usuario" });
  }
};

// Los demás métodos (listar, usuarioPorId, eliminar, confirmar) se mantienen igual