import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import firebase_app from "../config";

// Obtén la instancia de autenticación utilizando la aplicación Firebase
const auth = getAuth(firebase_app);

// Función para enviar un correo de recuperación de cuenta
export default async function sendPasswordReset(email: string) {
  let result = null, // Variable para almacenar el resultado del envío del correo
    error = null; // Variable para almacenar cualquier error que ocurra

  try {
    await sendPasswordResetEmail(auth, email); // Envía el correo de recuperación
    result = "Correo de recuperación enviado con éxito"; // Opcional: Mensaje de éxito
  } catch (e) {
    error = e; // Captura y almacena cualquier error que ocurra durante el envío del correo
  }

  return { result, error }; // Devuelve el resultado del envío del correo y el error (si lo hay)
}
