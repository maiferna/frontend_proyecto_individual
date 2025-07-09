import { useState } from 'react';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { sendUserUid } from '../utils/sendUserUid';
import { Link} from 'react-router';
import { useAuth } from '../context/AuthContext';
import { auth } from '../config/firebaseConfig';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (ev) => {
        ev.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('El usuario ha iniciado sesión', userCredential.user);
            await sendUserUid();
        } catch (error) {
            console.log('Error en el inicio de sesión', error.message);
        }
    };

    const handleGoogleLogin = async () => {
        // Creamos una instancia del objeto GoogleAuthProvider, que le indica a Firebase que queremos autenticarnos con Google.
        const provider = new GoogleAuthProvider();
        try {
            // Abre una ventana emergente para que el usuario se registre con google
            // El AuthProvider se activa automáticamente (así que no hay que gestional el rol (?))
            const result = await signInWithPopup(auth, provider);
            console.log('El usuario ha iniciado sesión con google')
            await sendUserUid();
        } catch (error) {
            console.log('Error en el inicio de sesión con google', error.message);
        }
    }

    return (
        <section className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 width-container">
                <header className="mb-3 text-center">
                    <h3>Iniciar sesión</h3>
                </header>

                <article>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(ev) => setEmail(ev.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(ev) => setPassword(ev.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3 text-center">
                            <button type="submit" className="btn btn-green w-100">
                                Iniciar sesión
                            </button>
                        </div>
                        <div className="mb-3 text-center">
                            <button type="button" className="btn btn-green-border w-100" onClick={handleGoogleLogin}>
                                <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" className="google-img"></img>
                                Iniciar sesión con Google
                            </button>
                        </div>
                        <p className="text-center">¿No tienes cuenta? <Link to="/signup" className='color-green'>Regístrate</Link></p> {/* Redirigir a signup */}
                    </form>
                </article>
            </div>
        </section>
    )
}
