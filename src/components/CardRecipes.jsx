import { Link } from "react-router";
import { useAuth } from '../auth/context/AuthContext';
import { fetchCall } from "../api/fetchCall";
import { useEffect, useState } from "react";


export const CardRecipes = ({ recipe }) => {

  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { ingredients, name, image, _id } = recipe;

  const host = import.meta.env.VITE_LOCAL_HOST
  const imageUrl = `${host}uploads/${image}`;
  const urlBase = import.meta.env.VITE_API_URL_BASE;

  //const { user } = useAuth(); 
  const uid = 'F9O6ofjRDNR5s9E3BFvxEdIdPXF3'

  const handleFavorite = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchCall(`${urlBase}favorite/user/${uid}`,
        'POST',
        JSON.stringify({ id: _id }),
        { 'Content-Type': 'application/json' }
      )
      setIsFavorite(true);
      console.log('Receta añadida a favoritos', data)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false);
    }
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
          <button onClick={handleFavorite} className="btn btn-outline-danger btn-sm">
            <i className="bi bi-heart"></i>
          </button>
        </div>
      </div>
    </article>
  )
}