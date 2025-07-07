/**
 * Importar Firebase, autenticación (getAuth) y base de datos (getFirestore)
 */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de la web app de Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Inicializar Firebase con las credenciales del proyecto
const app = initializeApp(firebaseConfig);

// Exportar instancias para autenticación y base de datos
export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore
export default app;

