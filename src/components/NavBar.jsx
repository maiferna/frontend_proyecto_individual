
import { Link } from 'react-router';
import { useAuth } from '../auth/context/AuthContext';

export const NavBar = () => {
  const { user, logout, role } = useAuth();
    // Si no  existe el usuario, muestra en el menú el acceso a login o registro
    // sino, si el rol es usuario muestra el dashboard del usuario y sino el del admin
  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        {!user ? (
          <>
            <li><Link to="/login">Iniciar Sesión</Link></li>
            <li><Link to="/register">Registrarse</Link></li>
          </>
        ) : (
          <>
            {role === 'admin' && <li><Link to="/admin-dashboard">Dashboard Admin</Link></li>}
            {role === 'user' && <li><Link to="/user-dashboard">Dashboard Usuario</Link></li>}
            <li><button onClick={logout}>Cerrar sesión</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

