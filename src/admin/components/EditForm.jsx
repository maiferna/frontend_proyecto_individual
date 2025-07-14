import { useEffect, useRef, useState } from 'react'
import { useForm } from '../../hooks/useForm';
import { InputText } from './InputText';
import { CheckboxGroup } from './CheckboxGroup';
import { IngredientInput } from './IngredientInput';
import { ImageInput } from './ImageInput';
import JoditEditor from 'jodit-react';

export const EditForm = ({ recipe }) => {
    const editor = useRef(null);
    const urlBase = import.meta.env.VITE_API_URL_BASE;

    const [isLoading, setIsLoading] = useState(true);

    const {
        form,
        handleChange,
        setForm,
        formSend,
    } = useForm({
        name: '',
        time: '',
        difficulty: '',
        ingredients: [],
        steps: '',
        image: null,
        imageUrl: '',
        id: '',
        category: [],
        intolerance: []
    });

    const categoryOptions = ['ensaladas', 'legumbres', 'postres', 'vegano', 'vegetariano', 'pastas', 'otros', 'carne', 'pescado', 'arroz', 'entrantes'];
    const intoleranceOptions = ['gluten', 'lactosa', 'frutos secos'];

    useEffect(() => {
        if (recipe) {
            setForm({
                ...recipe,
                image: null, // file vacío al inicio
                imageUrl: recipe.image, // la url de la imagen guardada
                id: recipe._id
            });
        }
    }, [recipe])

    const handleCheckbox = (ev) => {
        // Extrae los datos del checkbox
        const { name, value, checked } = ev.target;
        // Obtiene el array actual para ese campo
        const current = form[name] || [];

        // Actualiza el estado del formulario
        // Si el checkbox está marcado, añade el valor, si está desmarcado, elimina el valor
        setForm({
            ...form,
            [name]: checked
                ? [...current, value]
                : current.filter((item) => item !== value),
        });
    };

    const addIngredient = (ingredient) => {
        setForm((prevValue) => ({
            ...prevValue,
            ingredients: [...prevValue.ingredients, ingredient],
        }));
    };

    const removeIngredient = (name) => {
        setForm((prevValue) => ({
            ...prevValue,
            ingredients: prevValue.ingredients.filter(ingredient => ingredient.name !== name),
        }));
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        formSend(`${urlBase}admin/edit/${form.id}`, 'PUT');
    };


    return (
        <form onSubmit={handleSubmit} className="card p-4 m-4">
            <h2 className="text-center mb-3">Editar receta</h2>
            <input type="hidden" name="id" value={form.id} />
            <input type="hidden" name="imageUrl" value={form.imageUrl} />
            <InputText
                label="Nombre de la receta"
                name="name"
                value={form.name}
                onChange={handleChange}
            />

            <InputText
                label="Tiempo de preparación"
                name="time"
                value={form.time}
                onChange={handleChange}
            />

            <InputText
                label="Dificultad"
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
            />

            <CheckboxGroup
                label="Categorías"
                name="category"
                options={categoryOptions}
                selected={form.category}
                onChange={handleCheckbox}
            />

            <CheckboxGroup
                label="Intolerancias"
                name="intolerance"
                options={intoleranceOptions}
                selected={form.intolerance}
                onChange={handleCheckbox}
            />

            <IngredientInput
                ingredients={form.ingredients}
                addIngredient={addIngredient}
                removeIngredient={removeIngredient}
            />

            <ImageInput
                name="image"
                onChange={handleChange}
            />

            <div className="mb-3">
                <label className="form-label">Pasos</label>
                <JoditEditor
                    ref={editor}
                    value={form.steps}
                    // Cuando se ejecuta pasa el contenido actualizado del editor como un string de HTML (newContent)
                    // newContent es lo que el usuario ha escrito
                    onChange={(newContent) =>
                        setForm((prev) => ({ ...prev, steps: newContent }))
                    }
                />
            </div>
            <button type="submit" className="btn btn-green w-100 mt-3">
                Editar receta
            </button>
        </form>
    )
}
