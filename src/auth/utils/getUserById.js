
import { fetchCall } from '../../api/fetchCall';
import { auth } from '../../config/firebaseConfig';

/**
 * Función para recoger un usuario por su id
 * @returns Devuelve la data obtenida: usuario y token.
 */
export const getUserById = async () => {
    const urlBase = import.meta.env.VITE_API_URL_BASE;
    const user = auth.currentUser;
    if (!user) return;
    try {
        const data = await fetchCall(`${urlBase}auth/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firebaseUid: user.uid
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
