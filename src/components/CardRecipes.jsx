import { Link } from "react-router";
import { useAuth } from '../auth/context/AuthContext';
import { fetchCall } from "../api/fetchCall";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";


export const CardRecipes = ({ recipe, initialFavorite }) => {

  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const { ingredients, name, image, _id } = recipe;
  const host = import.meta.env.VITE_LOCAL_HOST
  const imageUrl = `${host}uploads/${image}`;
  const urlBase = import.meta.env.VITE_API_URL_BASE;

  const { user } = useAuth();
  const uid = user?._id; // solo accede si existe

  const { data, loading, fetchData } = useFetch(`${urlBase}favorite/user/${uid}`,
    { method: 'POST' })

  const handleAddFavorite = () => {
    setIsFavorite(true);
    fetchData({
      method: 'POST',
      body: JSON.stringify({ id: _id })
    })
  };

  const handleRemoveFavorite = () => {
    setIsFavorite(false);
    fetchData({
      method: 'DELETE',
      body: JSON.stringify({ id: _id })
    })
    console.log('RECETA ELIMINADA')
  };

  return (
    <article className="card h-100">
      <div className="ratio ratio-1x1">
        <img className="card-img-top object-fit-cover" src={imageUrl} />
      </div>
      <div className="card-body">
        <h5 className="card-title fw-bold">{name}</h5>
        {
          ingredients.map(ingredient => (
            <p key={ingredient._id} className="col-4 col-lg-3 mb-4 card-text">
              {ingredient.name}
            </p>
          ))
        }
        <div className="d-flex justify-content-between">
          <Link to={`/recipe/${_id}`} className="btn btn-green">Ver receta</Link>
          {/* {isFavorite ? (
            <button onClick={handleRemoveFavorite} className="btn btn-danger btn-sm">
              <i className="bi bi-heart-fill"></i>
            </button>
          ) : (
            <button onClick={handleAddFavorite} className="btn btn-outline-danger btn-sm">
              <i className="bi bi-heart"></i>
            </button>
          )} */}
          {user ? (
            isFavorite ? (
              <button onClick={handleRemoveFavorite} className="btn btn-danger btn-sm">
                <i className="bi bi-heart-fill"></i>
              </button>
            ) : (
              <button onClick={handleAddFavorite} className="btn btn-outline-danger btn-sm">
                <i className="bi bi-heart"></i>
              </button>
            )
          ) : (
            <button onClick={() => navigate('/login')} className="btn btn-outline-danger btn-sm">
              <i className="bi bi-heart"></i>
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
