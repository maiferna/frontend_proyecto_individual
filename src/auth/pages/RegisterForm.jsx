import { useState } from 'react';
import { auth } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { sendUserUid } from '../utils/sendUserUid';
import { Link, useNavigate } from 'react-router';

// capturamos el correo y la contraseña del usuario, luego usamos Firebase para crear la cuenta y almacenamos el rol del usuario en Firestore
export const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (ev) => {
    ev.preventDefault();
    try {
      // Creamos una cuenta nueva con el método createUserWithEmailAndPassword
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Usuario registrado
      const user = userCredential.user;

      // opcional: actualizar el displayName del usuario
        await updateProfile(user, {
            displayName: name // suponiendo que capturaste un nombre
        });
      // Se le asigna automáticamente el rol como 'user' al nuevo registro usando setDoc
      // await setDoc(doc(db, 'users', user.uid), {
      //   name,
      //   email: user.email,
      //   role: 'user' // Asignamos el rol "user" al nuevo usuario
      // });

      console.log('Usuario registrado exitosamente', user);
      await sendUserUid(); // sincroniza con MongoDB y guarda el token
      // Redirigir a la correspondiente ruta
      navigate('/search');
    } catch (error) {
      console.log('Error en el registro', error.message);
    }
  };

  const handleGoogleRegister = async () => {
    // Creamos una instancia del objeto GoogleAuthProvider, que le indica a Firebase que queremos autenticarnos con Google.
    const provider = new GoogleAuthProvider();
    try {
      // Abre una ventana emergente para que el usuario se registre con google
      // Si el usuario está registrado lo autentica y sino lo registra
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Usuario registrado con google')
      await sendUserUid();
      navigate('/search');
    } catch (error) {
      console.log('Error en el registro', error.message);
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
            <form onSubmit={handleRegister} novalidate>
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
              <p className="text-center">¿Ya tienes cuenta? <Link to="/login" className='color-green'>Inicia sesión</Link></p> {/* Redirigir a login */}
            </form>
          </article>
        </div>
      </section>
    </>
  );
}
