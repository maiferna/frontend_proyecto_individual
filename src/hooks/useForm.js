import { useState } from 'react';

export const useForm = (initialState = {}) => {
    const [form, setForm] = useState(initialState);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState(null);

    // actualiza el estado del formulario para inputs de texto, file, número..
    // name: nombre del input value: lo que el usuario escribió
    const handleChange = (ev) => {
        const input = ev.target; // captura el input que provocó el cambio
        const name = input.name; // captura el nombre del input
        let value;

        // Si el input es de tipo file utiliza el primer archivo, sino el valor que el usuario escribió
        if (input.type === 'file') {
            value = input.files[0];
        } else {
            value = input.value;
        }
        // Actualiza el valor del formulario con el nuevo valor
        setForm({
            ...form, // conserva el formulario
            [name]: value, // actualiza el campo que se ha cambiado
        });
    };

    // Enviar el formulario al back
    const formSend = async (url, method = 'POST') => {
        console.log('🧪 Estado del formulario como objeto:', form);

        const formData = new FormData();

        // Si es un array lo pasa a formato JSON.stringidy
        // sino lo deja como string
        // key: 'categoria', form[key]:'vegano'
        for (let key in form) {
            if (Array.isArray(form[key])) {
                formData.append(key, JSON.stringify(form[key]));
            } else {
                formData.append(key, form[key]);
            }
        }

        console.log('📦 Datos que se enviarán al backend:');
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        try {
            const response = await fetch(url, {
                method,
                body: formData,
            });
            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            setIsSent(true);
            setForm(initialState);
        } catch (error) {
            console.error('Error al enviar:', error);
            setError(error.message)
        }
    };

    return {
        form,
        setForm,
        handleChange,
        formSend,
        isSent,
    };
};
