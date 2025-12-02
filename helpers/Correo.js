// helpers/Correo.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const correoRegistro = async ({ nombre, correo, token }) => {
  try {
    const transport = nodemailer.createTransport({
      service: 'gmail',
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const urlConfirmacion = `${process.env.URL_BACKEND || 'http://localhost:3001'}/api/usuario/confirmar/${token}`;

    await transport.sendMail({
      from: process.env.EMAIL_USER || 'tu_correo@gmail.com',
      to: correo,
      subject: 'Confirma tu cuenta en Lonja Veracruzana',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2196F3;">¡Hola ${nombre}!</h2>
        <p>Gracias por registrarte en Lonja Veracruzana.</p>
        <p>Para activar tu cuenta, por favor haz clic en el siguiente enlace:</p>
        <p>
          <a href="${urlConfirmacion}" 
             style="background-color: #2196F3; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 4px; display: inline-block;">
            Confirmar mi cuenta
          </a>
        </p>
        <p>Si el botón no funciona, copia y pega esta URL en tu navegador:</p>
        <p style="background-color: #f5f5f5; padding: 10px; border-radius: 4px;">
          ${urlConfirmacion}
        </p>
        <p>Si no solicitaste este registro, por favor ignora este mensaje.</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Este es un mensaje automático, por favor no respondas a este correo.
        </p>
      </div>
      `
    });

    console.log('✅ Correo enviado a:', correo);
  } catch (error) {
    console.error('❌ Error enviando correo:', error);
    throw error;
  }
};

// Para compatibilidad
export default {
  correoRegistro
};