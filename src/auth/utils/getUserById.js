
import { fetchCall } from '../../api/fetchCall';
import { auth } from '../../config/firebaseConfig';

export const getUserById = async () => {
    const urlBase = import.meta.env.VITE_API_URL_BASE;
    const user = auth.currentUser;
    //console.log('CURRENT USER', auth.currentUser)
    console.log('UID USUARIO', user.uid)
    if (!user) return;
    try {
        // Modificar url y meter mi función fetch
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
        console.log('GET USER BY ID', user)
        return data;
    } catch (error) {
        console.log({ error });
        throw (error);
    }
}

const getUser = async (req, res) => {
    const {firebaseUid} = req.body
    try {
        const user = await User.findById(firebaseUid);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado."
            })
        }
        return res.status(200).json({
            ok: true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })
    }
}