import { createContext, useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { sendUserUid } from '../auth/utils/sendUserUid'
import { auth } from '../config/firebaseConfig';
import { getUserById } from '../auth/utils/getUserById';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
/**
 * Crear contexto para poder compartir datos del usuario entre componentes
 */
const AuthContext = createContext();

/**
 * Proveedor del contexto de autenticación. Guarda la lógica de autenticación de Firebase.
 * Observa los cambios en el estaod de autenticación de Firebase y mantiene actualizado el usuario.
 * @param {Object} children 
 * @returns Devuelve el usuario autenticado, su rol y las funciones de registro, inicio de sesión y logout.
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    const register = async (email, password, name) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: name });
        const data = await sendUserUid();
        setUser(data.user);
        setRole(data.user.role);
    };

    const login = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const data = await getUserById();
        setUser(data.user);
        setRole(data.user.role);
    };

    const logout = async () => {
        await signOut(auth);
        localStorage.removeItem('token');
        setUser(null);
        setRole(null);
    };

    const loginGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const data = await sendUserUid();
            setUser(data.user);
            setRole(data.user.role);
        } catch (error) {
            console.log('Error en el registro', error.message);
            throw error;
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const data = await getUserById();
                setUser(data.user);
                setRole(data.user.role);
            } else {
                setUser(null);
                setRole(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, role, loading, register, login, loginGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Hook para acceder al contexto de autenticación.
 * @returns Devuelve el contexto de autenticación.
 */
export const useAuth = () => {
    return useContext(AuthContext);
}
