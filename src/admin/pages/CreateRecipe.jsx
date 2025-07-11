import React, { useMemo, useRef, useState } from 'react'
import JoditEditor from 'jodit-react';

export const CreateRecipe = ({ placeholder }) => {
    const objectPrueba = 'Prueba de texto recibido. Paso1: ..... Paso 2: ..... Paso 3: ....'
    const editor = useRef(null);
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [prepTime, setPrepTime] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [image, setImage] = useState('');
    const [steps, setSteps] = useState('');
    const [content, setContent] = useState(objectPrueba);

    const config = useMemo(() => ({
        readonly: false, // all options from https://xdsoft.net/jodit/docs/,
        placeholder: placeholder || 'Start typings...'
    }),
        [placeholder]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Nombre:', name);
        console.log('Contenido:', content);
    };

    return (
        <>
            <section className="container d-flex justify-content-center align-items-center vh-100">
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
            </section>
        </>
    );
}
