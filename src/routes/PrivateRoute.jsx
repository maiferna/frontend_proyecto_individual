// Restringe el acceso a ciertas rutas dependiendo del estado del usuario y su rol
// Si el usuario no está autenticado o no tiene el rol adecuado, será redirigido a una página específica (inicio o login)

import { Navigate } from 'react-router';
import { useAuth } from '../auth/context/AuthContext';

// allowedRoles --> lista de roles que tienen acceso a la ruta
export const PrivateRoute = ({ children, allowedRoles }) => {
  // accede al usuario autenticado y su rol desde el contexto AuthContext
  const { user, role, loading } = useAuth();
  //console.log("PrivateRoute - user:", user, "role:", role, "loading:", loading);
  
  if (loading) return null; // El componente espera sin hacer nada, hasta que recibe el user
  // Si el usuario no está autenticado, redirige a login
  if (!user) {
    console.log("Redirigiendo a login");
    return <Navigate to="/login" />;
  }
  // Si el usuario está autenticado, pero su rol no está dentro del array de roles permitidos, redirige al inicio
  if (!allowedRoles.includes(role)) {
    console.log("Redirigiendo a home: rol no permitido");
    return <Navigate to="/" />;
  }

  // Si el usuario está logueado y tiene el rol adecuado, muestra el contenido de la ruta protegida
  return children;
}
