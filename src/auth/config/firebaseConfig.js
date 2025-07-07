/**
 * Importar Firebase, autenticación (getAuth) y base de datos (getFirestore)
 */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de la web app de Firebase
const firebaseConfig = {
  apiKey: `${import.meta.env.API_KEY}`,
  authDomain: `${import.meta.env.AUTH_DOMAIN}`,
  projectId: `${import.meta.env.PROJECT_ID}`,
  storageBucket: `${import.meta.env.STORAGE_BUCKET}`,
  messagingSenderId: `${import.meta.env.MESSAGING_SENDER_ID}`,
  appId: `${import.meta.env.APP_ID}`
};

// Inicializar Firebase con las credenciales del proyecto
const app = initializeApp(firebaseConfig);

// Exportar instancias para autenticación y base de datos
export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore
export default app;

