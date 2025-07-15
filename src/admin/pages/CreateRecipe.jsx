//import {useRef} from 'react'
import JoditEditor from 'jodit-react';
import { InputText } from '../components/InputText';
import { CheckboxGroup } from '../components/CheckboxGroup';
import { IngredientInput } from '../components/IngredientInput';
import { ImageInput } from '../components/ImageInput';
import { useForm } from '../../hooks/useForm';

/**
 * Componente que renderiza el formulario para crear recetas.
 * useRef hace referencia al editor Jodit Editor.
 * Gestiona el manejador de los checkbox, añadir y eliminar ingredientes y el submit.
 */
export const CreateRecipe = () => {
    const urlBase = import.meta.env.VITE_API_URL_BASE;
    // const editor = useRef(null);

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

    /**
     * Extrae los datos del checkbox y obtiene el array actual para ese campo.
     * Comprueba si el checkbox está marcado, si lo está añade el valor, si no lo elimina
     */
    const handleCheckbox = (ev) => {
        const { name, value, checked } = ev.target;
        const current = form[name] || [];
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
                    //ref={editor}
                    value={form.steps}
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

