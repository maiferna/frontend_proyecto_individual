import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth} from '../config/firebaseConfig';
import { sendUserUid } from '../utils/sendUserUid'

// Crear contexto para poder compartir datos entre componentes
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null); // Información básica del usuario (para almacenar los datos que nos da Firebase Auth)
    const [role, setRole] = useState(null); // Rol del usuario (guardado de Firestore (?))
    const [loading, setLoading] = useState(true); // Carga hasta que firebase confirma si hay usuario o no

    // Manejo de la sesión del usuario
    // Podemos detectar si un usuario ha iniciado sesión y mantener la sesión activa a través de onAuthStatechanged
    useEffect(() => {
        // Se ejecuta cada vez que cambia el estado de autenticación
        // Se dispara cuando alguien inicia o cierra sesión
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            // Si el usuario está logueado (?)
            if (firebaseUser) {
                //console.log("Usuario autenticado:", firebaseUser);
                try {
                    const data = await sendUserUid();
                    setUser(data.user);
                    setRole(data.user.role);
                } catch (error) {
                    console.error('Error al sincronizar con el backend', error);
                }
            } else {
                setUser(null);
                setRole(null);
            }
            //setUser(user); // Guardar la información del usuario, el objeto de usuario de Firebase
            setLoading(false); // Finalizar loading
        });
        return () => unsubscribe(); // Al desmontar el componente, se desuscribe
    }, []);
    // Cierra la sesión del usuario mediante el método signOut
    //const logout = async () => signOut(auth);
    const logout = async () => {
        await signOut(auth);
        localStorage.removeItem('token');
        setUser(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ user, role, loading, logout }}>
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

