import { createContext, useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { sendUserUid } from '../auth/utils/sendUserUid'
import { auth } from '../config/firebaseConfig';
import { getUserById } from '../auth/utils/getUserById';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';

// Crear contexto para poder compartir datos entre componentes
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    const register = async (email, password, name) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // Es un método de Firebase Authentication que permite actualizar datos básicos del usuario autenticado
        // Se utiliza porque firebase no recoge el nombre y así podemos tenerlo capturado para usarlo en nuestor UI
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
        // Creamos una instancia del objeto GoogleAuthProvider, que le indica a Firebase que queremos autenticarnos con Google.
        const provider = new GoogleAuthProvider();
        console.log("auth:", auth);
        console.log("provider:", provider);
        try {
            // Abre una ventana emergente para que el usuario se registre con google
            // Si el usuario está registrado lo autentica y sino lo registra
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log('Usuario registrado con google')
            const data = await sendUserUid();
            setUser(data.user);
            setRole(data.user.role);
            // navigate('/search');
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

export const useAuth = () => {
    return useContext(AuthContext);
}
