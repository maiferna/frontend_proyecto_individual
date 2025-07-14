import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router';

export const PublicRoute = ({ children }) => {
    const { user, role, loading } = useAuth();
    if (loading) return null;
    if (user) {
        if (role === 'user') {
            return <Navigate to="/" />;
        } else {
            return <Navigate to="/dashboard" />
        }
    } else {
        return (children)
    }
}
