import { Link } from "react-router";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../context/AuthContext";

/**
 * Componente para mostrar las tarjetas de las recetas.
 * Gestiona las funciones para añadir y eliminar de favoritos.
 */
export const CardRecipes = ({ recipe, initialFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const { name, image, _id } = recipe;
  const host = import.meta.env.VITE_LOCAL_HOST
  const imageUrl = `${host}uploads/${image}`;
  const urlBase = import.meta.env.VITE_API_URL_BASE;
  const token = localStorage.getItem("token");

  const { user } = useAuth();
  const uid = user?._id;

  const { data, loading, fetchData } = useFetch(`${urlBase}favorite/user/${uid}`,
    { method: 'POST' })

  const handleAddFavorite = () => {
    setIsFavorite(true);
    fetchData(`${urlBase}favorite/user/${uid}`, {
      method: 'POST',
      headers: { "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ id: _id })
    })
  };

  const handleRemoveFavorite = () => {
    setIsFavorite(false);
    fetchData(`${urlBase}favorite/user/${uid}`, {
      method: 'DELETE',
      headers: { "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ id: _id })
    })
  };

  const handleClick = () => {
    isFavorite ? handleRemoveFavorite() : handleAddFavorite();
  };

  return (
    <article className="card h-100">
      <div className="ratio ratio-1x1">
        <img className="card-img-top object-fit-cover" src={imageUrl} />
      </div>
      <div className="card-body">
        <h5 className="card-title fw-bold">{name}</h5>
        <div className="d-flex justify-content-between">
          <Link to={`/recipe/${_id}`} className="btn btn-green">Ver receta</Link>
          {
            user && (
              <button
                onClick={handleClick}
                className={`btn btn-sm ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
              >
                <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
              </button>
            )
          }
        </div>
      </div>
    </article>
  )
}

