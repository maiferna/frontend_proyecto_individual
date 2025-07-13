
import { useEffect, useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useAuth } from '../../context/AuthContext';


export const SearchInput = ({ ingredients, setIngredients, setRecipes }) => {
    // Cada vez que cambia el input, onChange, se actualiza su valor
    const [input, setInput] = useState("");
    const [error, setError] = useState('')
    const [oneIngredient, setOneIngredient] = useState(false);
    const { user } = useAuth()

    const urlBase = import.meta.env.VITE_API_URL_BASE;
    const { data, fetchData } = useFetch(`${urlBase}recipes/ingredients`, {
        method: 'POST'
    })

    // Si data.recipes existe, se actualiza el estado recipes con setRecipes
    useEffect(() => {
        if (data && data.ok === false) {
            setError(data.msg)
        } else if (data.recipes) {
            setRecipes(data.recipes);
        }
    }, [data, setRecipes]);

    // Si el ingrediente no está repetido, lo añade al array de ingredientes
    // El array de ingrredientes viene del componente padre, por lo que cuando React detecta un cambio, envía el array actualizado
    const handleAdd = (e) => {
        e.preventDefault();
        if (!ingredients.includes(input)) {
            setIngredients([...ingredients, input]);
        }
        setInput("");
    };

    // Elimina el ingrediente del array
    const handleDelete = (name) => {
        setIngredients(ingredients.filter((ingredient) => ingredient !== name));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Ingredientes a buscar:", ingredients);
        if (ingredients.length === 1) {
            setOneIngredient(true);
        } else {
            setOneIngredient(false);
        }
        fetchData(`${urlBase}recipes/ingredients`, {
            method: 'POST',
            body: JSON.stringify({ ingredients })
        });
    };

    return (
        <section className="container mt-4">
            <h2 className="text-center mb-3">¡Hola, {user.name}!</h2>
            <p className="text-center mb-3">Añade los ingredientes que tengas en la cocina (hasta 7)</p>
            <form onSubmit={handleAdd} className="mb-3 d-flex">
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Añade un ingrediente"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" className="btn btn-red-border">+</button>
            </form>

            <div className="mb-3">
                {ingredients.map((name) => (
                    <div key={name} className="badge bg-dark me-2 d-inline-flex align-items-center justify-content-between px-2 py-1">
                        {name}
                        <button
                            type="button"
                            className="btn-close btn-sm ms-2"
                            data-bs-theme="dark"
                            aria-label="Eliminar"
                            onClick={() => handleDelete(name)}
                        ></button>
                    </div>
                ))}
            </div>
            <div className="text-end">
                <button className="btn btn-green" onClick={handleSubmit}>
                    Buscar recetas
                </button>
                {oneIngredient && (
                    <p className="mt-3 text-center">
                        Igual va siendo hora de hacer la compra... Pero aquí te dejamos algunas ideas. 🙄🛒
                    </p>
                )}
                {error && (
                    <p className="text-danger mt-2">{error}</p>
                )}
            </div>
        </section>
    )
}




//     const urlBase = import.meta.env.VITE_API_URL_BASE;
// // Inputs dinámicos
// const [input, setInput] = useState('')
// const { user } = useAuth();

// const { data, loading, error, fetchData } = useFetch(`${urlBase}recipes/ingredients`, 'POST');

// const handleChange = (ev) => {
//     setInput(ev.target.value);
// }
// const handleSubmit = (ev) => {
//     ev.preventDefault()
//     setIngredients([...ingredients, input]);
//     setInput('');
// }

// const handleAddInput = () => {
//     if (input.length < 7) {
//         setInput([...input, ""]);
//     }
// };

// return (
//     <>
//         <section className="container-fluid">
//             <h2>Busca recetas</h2>
//             <form className="d-flex mx-auto p-2" onSubmit={handleSubmit}>
//                 <input
//                     className="form-control me-2"
//                     type="text"
//                     placeholder="Añade un ingrediente"
//                     // value={input}
//                     onChange={handleChange}
//                 />
//                 <button className="btn btn-outline-success" type="submit" onClick={handleAddInput}>
//                         +
//                 </button>
//                 <button className="btn btn-outline-success" type="submit">Buscar</button>
//             </form>
//         </section>
//     </>
// )