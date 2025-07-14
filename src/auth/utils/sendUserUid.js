
import { fetchCall } from '../../api/fetchCall';
import { auth } from '../../config/firebaseConfig';

export const sendUserUid = async () => {
    const urlBase = import.meta.env.VITE_API_URL_BASE;
    const user = auth.currentUser;
    console.log('CURRENT USER', auth.currentUser)
    if (!user) return;
    try {
        // Modificar url y meter mi función fetch
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
        //console.log('TOKEN DEL BACK', data)
        return data;
    } catch (error) {
        console.log({ error });
        throw (error);
    }
}
