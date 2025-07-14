import {useRef} from 'react'
import JoditEditor from 'jodit-react';
import { InputText } from '../components/InputText';
import { CheckboxGroup } from '../components/CheckboxGroup';
import { IngredientInput } from '../components/IngredientInput';
import { ImageInput } from '../components/ImageInput';
import { useForm } from '../../hooks/useForm';

export const CreateRecipe = () => {
    const urlBase = import.meta.env.VITE_API_URL_BASE;
    const editor = useRef(null);

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
        category: [],
        intolerance: []
    });

    const categoryOptions = ['ensaladas', 'legumbres', 'postres', 'vegano', 'vegetariano', 'pastas', 'otros', 'carne', 'pescado', 'arroz', 'entrantes'];
    const intoleranceOptions = ['gluten', 'lactosa', 'frutos secos'];

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
   

    // const config = useMemo(() => ({
    //     readonly: false,
    //     placeholder: 'Escribe los pasos de la receta...',
    // }), []);

    // prevValue es el estado anterior del formulario, es decir, si de primeras ingredients es un array vacío y le añadimos uno nuevo, prev será el vacío.
    // Después si el array ingredientes es tomate y queremos añadir otro, prev será tomate
    // ...prevValue extiende el objeto del formulario con sus propiedades
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
        formSend(`${urlBase}admin/create`, 'POST');
    };

    return (
        <form onSubmit={handleSubmit} className="card p-4 m-4">
            <h2 className="text-center mb-3">Crear receta</h2>

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
                Crear receta
            </button>
        </form>
    );
};

