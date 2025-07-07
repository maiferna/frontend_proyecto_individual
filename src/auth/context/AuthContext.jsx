import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// Crear contexto para poder compartir datos entre componentes
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null); // Información básica del usuario (para almacenar los datos que nos da Firebase Auth)
    const [role, setRole] = useState(null); // Rol del usuario (guardado de Firestore (?))

    // Manejo de la sesión del usuario
    // Podemos detectar si un usuario ha iniciado sesión y mantener la sesión activa a través de onAuthStatechanged
    useEffect(() => {
        // Se ejecuta cada vez que cambia el estado de autenticación
        // Se dispara cuando alguien inicia o cierra sesión
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            // si el usuario está autenticado, recuperamos su información desde Firestore para asignarle el rol y lo guardamos en el estado
            // si el usuario está logueado, busca en firestore (en la colección) su documento por su uid
            if (user) {
                // getDoc lee un documento específico de Firestore. 
                // devuelve un objeto de tipo DocumentSnapshot
                const userDoc = await getDoc(doc(db, 'users', user.uid)); // crea una referencia al documento del usuario con ese uid, en la colección users.
                if (userDoc.exists()) {
                    setRole(userDoc.data().role); // Asignar rol desde Firestore. Extrae su rol y lo guarda en el estado
                }
            }
            setUser(user); // Guardar la información del usuario, el objeto de usuario de Firebase
        });
        return () => unsubscribe(); // Al desmontar el componente, se desuscribe
    }, []);
    // Cierra la sesión del usuario mediante el método signOut
    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider value={{ user, role, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
// Se recomienda crear un hook
// nos permite acceder al estado de autenticación (usuario y rol) desde cualquier componente en nuestra aplicación
export const useAuth = () => {
    return useContext(AuthContext);
}

// Con este hook podremos hacer esto en cualquier componente:
// const { user, role, logout } = useAuth();

/* AuthProvider escucha el login/logout
Consulta Firestore para saber el rol del usuario
Comparte user, role y logout() a través de React Context
Lo usas con useAuth() en cualquier parte de tu app
 */