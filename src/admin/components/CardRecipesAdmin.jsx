import React from 'react'
import { Link } from 'react-router';
import { useFetch } from '../../hooks/useFetch';

export const CardRecipesAdmin = ({ recipe, handleDelete }) => {
    const { ingredients, name, image, _id, difficulty } = recipe;
    const host = import.meta.env.VITE_LOCAL_HOST
    const imageUrl = `${host}uploads/${image}`;
    const urlBase = import.meta.env.VITE_API_URL_BASE;

    return (
        <article className="card h-100">
            <div className="ratio ratio-1x1">
                <img className="card-img-top object-fit-cover" src={imageUrl} />
            </div>
            <div className="card-body">
                <h5 className="card-title fw-bold">{name}</h5>
                <div className="d-flex justify-content-between mt-3">
                    <Link to={`/edit/recipe/${_id}`} className="btn btn-green-border">Editar</Link>
                    {/* <button
                        className="btn btn-danger"
                        onClick={() => {
                            if (alert(`¿Eliminar receta "${name}"?`)) {
                                handleDelete(_id);
                            }
                        }}>
                        Eliminar
                    </button> */}
                    <button onClick={() => handleDelete(_id)} className="btn btn-red">
                        Eliminar
                    </button>
                </div>

            </div>
        </article>
    )
}
