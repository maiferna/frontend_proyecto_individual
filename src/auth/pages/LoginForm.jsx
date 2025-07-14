import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

/**
 * Componente para el formulario del login.
 * Renderiza el formulario de inicio de sesión con los campos email y contraseña y un botón para autenticar mediante Google.
 */
export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const { login, loginGoogle } = useAuth();

    const handleLogin = async (ev) => {
        ev.preventDefault();
        try {
            await login(email, password);
            navigate('/search');
        } catch (error) {
            console.error('Error en el inicio de sesión', error.message);
        }
    };

    const handleGoogleLogin = async () => {
    try {
      await loginGoogle();
      navigate('/search');
    } catch (error) {
      console.log('Error al registrar con Google', error.message);
      throw(error)
    }
  }

    return (
        <section className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 width-container">
                <header className="mb-3 text-center">
                    <h3>Iniciar sesión</h3>
                </header>

                <article>
                    <form onSubmit={handleLogin} noValidate>
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
                        <p className="text-center">¿No tienes cuenta? <Link to="/signup" className='color-green'>Regístrate</Link></p>
                    </form>
                </article>
            </div>
        </section>
    )
}
