
import { fetchCall } from '../../api/fetchCall';
import { auth } from '../../config/firebaseConfig';

/**
 * Función para enviar los datos del usuario autenticado con Firebase a Mongo.
 * @returns Devuelve la data obtenida: el token y lo almacena en el localStorage.
 */
export const sendUserUid = async () => {
    const urlBase = import.meta.env.VITE_API_URL_BASE;
    const user = auth.currentUser;
    if (!user) return;
    try {
        const data = await fetchCall(`${urlBase}auth/sync`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firebaseUid: user.uid,
                name: user.displayName,
                email: user.email,
                role: 'user'
            })
        })
        if (data.token) {
            localStorage.setItem('token', data.token);
        } else {
            throw ('No se recibió token del backend');
        }
        return data;
    } catch (error) {
        console.log({ error });
        throw (error);
    }
}
