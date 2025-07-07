/**
 * Importar Firebase, autenticación (getAuth) y base de datos (getFirestore)
 */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de la web app de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAGTTvEgqGE9qE7pubWENFH5larDBcejsg",
  authDomain: "proyecto-personal-b377d.firebaseapp.com",
  projectId: "proyecto-personal-b377d",
  storageBucket: "proyecto-personal-b377d.firebasestorage.app",
  messagingSenderId: "17483122664",
  appId: "1:17483122664:web:9f302f5a2f00c9dff4465d"
};

// Inicializar Firebase con las credenciales del proyecto
const app = initializeApp(firebaseConfig);

// Exportar instancias para autenticación y base de datos
export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore
export default app;

