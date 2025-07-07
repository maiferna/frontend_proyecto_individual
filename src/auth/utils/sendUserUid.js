
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig'

export const sendUserUid = async () => {
    const user = auth.currentUser;
    if (!user) return;
    try {
        // Crea una referencia al documento del usuario dentro de Firestore
        const userRef = doc(db, 'users', user.uid);
        // Recupera el snapshot del documento del usuario desde Firestore
        const userDoc = await getDoc(userRef);
        // Extrae el campo role y name del documento de Firestore
        const { role, name } = userDoc.data();
        // Modificar url y meter mi función fetch
        const response = await fetch('http://localhost:3000/api/v1/auth/sync', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firebaseUid: user.uid,
                name,
                email: user.email,
                role
            })
        })
        const data = await response.json();
        console.log('Data del back:', data);
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        console.log({ error });
        throw (error);
    }
}
