
import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

/**
 * Componente para definir las rutas privadas de la aplicación.
 * @param {Array} allowedRoles Roles permitidos
 * @returns Si el usuario está logueado y tiene el rol adecuado, muestra el contenido de la ruta protegida
 */
export const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useAuth();

  if (loading) return null;
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
}
