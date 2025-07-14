import { useState } from 'react';
// import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router';
// import { auth } from '../../config/firebaseConfig';
import { useAuth } from '../../context/AuthContext';

// capturamos el correo y la contraseña del usuario, luego usamos Firebase para crear la cuenta y almacenamos el rol del usuario en Firestore
export const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { register, loginGoogle } = useAuth();

  const handleRegister = async (ev) => {
    ev.preventDefault();
    try {
      await register(email, password, name);
      navigate('/search');
    } catch (error) {
      console.error('Error en el registro:', error);
      throw error
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await loginGoogle();
      navigate('/search');
    } catch (error) {
      console.log('Error al registrar con Google', error.message);
      throw(error)
    }
  }

  return (
    <>
      <section className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 width-container">
          <header className="mb-3 text-center">
            <h3>Registrarse</h3>
          </header>

          <article>
            <form onSubmit={handleRegister} noValidate>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Nombre"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                  required
                />
              </div>

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
                  Registrarse
                </button>
              </div>
              <div className="mb-3 text-center">
                <button type="button" className="btn btn-green-border w-100" onClick={handleGoogleRegister}>
                  <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" className="google-img"></img>
                  Registrarse con Google
                </button>
              </div>
              <p className="text-center">¿Ya tienes cuenta? <Link to="/login" className='color-green'>Inicia sesión</Link></p>
            </form>
          </article>
        </div>
      </section>
    </>
  );
}
