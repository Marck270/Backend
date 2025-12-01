import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const correoRegistro = async ({ nombre, correo, token }) => {

  const transport = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transport.sendMail({
    from:'pacoh3208@gmail.com',
    to: correo,
    subject: 'Realiza la confirmacion de tu cuenta',
    html:`
    <p> Hola ${nombre}, para terminar por favor verifica la cuenta</p>
    <p> Confirma en el siguiente enlace:
    <a href="${process.env.URL_BACKEND}:${process.env.PORT_BACKEND ?? 2800}/api/usuario/confirmar/${token}"> Confirmar </a>
    </p>
    <p>Si no solicitaste el registro, por favor ignora el mensaje</p>
    `
  });
};
