import { useState } from 'react';

/**
 * Hook personalizado para gestionar los formularios.
 * @param {Object} initialState Estado inicial del formulario.
 * @returns Devuelve el estado del formulario actualizado
 */
export const useForm = (initialState = {}) => {
    const [form, setForm] = useState(initialState);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Actualiza el estado del formulario para inputs de texto, file..
     */
    const handleChange = (ev) => {
        const input = ev.target;
        const name = input.name;
        let value;

        if (input.type === 'file') {
            value = input.files[0];
        } else {
            value = input.value;
        }
        setForm({
            ...form,
            [name]: value,
        });
    };

    /**
     * Enviar el formulario al back.
     * Si el valor del formulario es un array, lo pasa a formato JSON.stringify, sino lo deja como string
     * @param {String} url 
     * @param {Object} method 
     */
    const formSend = async (url, method = 'POST') => {
        const formData = new FormData();

        for (let key in form) {
            if (Array.isArray(form[key])) {
                formData.append(key, JSON.stringify(form[key]));
            } else {
                formData.append(key, form[key]);
            }
        }

        try {
            const response = await fetch(url, {
                method,
                body: formData,
            });
            const data = await response.json();
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
