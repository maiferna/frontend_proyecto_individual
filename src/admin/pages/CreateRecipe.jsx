import { useMemo, useRef, useState } from 'react'
import JoditEditor from 'jodit-react';
import { InputText } from '../components/InputText';
import { CheckboxGroup } from '../components/CheckboxGroup';
import { IngredientInput } from '../components/IngredientInput';
import { ImageInput } from '../components/ImageInput';
import { SelectInput } from '../components/SelectInput';
import { useForm } from '../../hooks/useForm';

// export const CreateRecipe = ({ placeholder }) => {
//     const objectPrueba = 'Prueba de texto recibido. Paso1: ..... Paso 2: ..... Paso 3: ....'
//     const editor = useRef(null);
//     const [name, setName] = useState('');
//     const [ingredients, setIngredients] = useState([]);
//     const [prepTime, setPrepTime] = useState('');
//     const [difficulty, setDifficulty] = useState('');
//     const [image, setImage] = useState('');
//     const [steps, setSteps] = useState('');
//     const [content, setContent] = useState(objectPrueba);

//     const config = useMemo(() => ({
//         readonly: false, // all options from https://xdsoft.net/jodit/docs/,
//         placeholder: placeholder || 'Start typings...'
//     }),
//         [placeholder]
//     );

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Nombre:', name);
//         console.log('Contenido:', content);
//     };

//     return (
//         <>
//             <section className="container d-flex justify-content-center align-items-center vh-100">
//                 <div className="card p-4">
//                     <h2 className="text-center mb-3">Crear una receta</h2>
//                     <form onSubmit={handleSubmit}>
//                         <InputText />
//                         {/* <SelectGroup/> */}
//                         <SelectInput/>
//                         <CheckboxGroup /> {/* categoría */}
//                         <CheckboxGroup /> {/* intolerancias */}
//                         <IngredientGroup />
//                         <ImageInput />
//                         <JoditEditor config={config} editor={editor} content={content} />
//                         <button type="submit" className="btn btn-green w-100 mt-3">
//                             Enviar
//                         </button>
//                     </form>
//                 </div>
//             </section>
//         </>
//     );
// }


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
                    /* config={config} */
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



{/* <section className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4">
                    <h2 className="text-center mb-3">Crear una receta</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Nombre de la receta"
                                value={name}
                                onChange={(ev) => setName(ev.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="ingredients"
                                name="ingredients"
                                placeholder="Ingredientes"
                                value={ingredients}
                                onChange={(ev) => setIngredients(ev.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="prepTime"
                                name="prepTime"
                                placeholder="Tiempo de preparación"
                                value={prepTime}
                                onChange={(ev) => setPrepTime(ev.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="difficulty"
                                name="difficulty"
                                placeholder="Dificultad"
                                value={difficulty}
                                onChange={(ev) => setDifficulty(ev.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                name="image"
                                value={image}
                                onChange={(ev) => setImage(ev.target.value)}
                            />
                        </div>
                        <div>
                            <JoditEditor className="mb-3"
                                ref={editor}
                                value={content}
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={newContent => { }}
                            />
                        </div>
                        <button type="submit" className="btn btn-green w-100">
                            Enviar
                        </button>
                    </form>
                </div>
            </section> */}
