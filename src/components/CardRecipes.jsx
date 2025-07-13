import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../context/AuthContext";


export const CardRecipes = ({ recipe, initialFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const { ingredients, name, image, _id, difficulty } = recipe;
  const host = import.meta.env.VITE_LOCAL_HOST
  const imageUrl = `${host}uploads/${image}`;
  const urlBase = import.meta.env.VITE_API_URL_BASE;

  const { user } = useAuth();
  const uid = user?._id; // solo accede si existe

  const { data, loading, fetchData } = useFetch(`${urlBase}favorite/user/${uid}`,
    { method: 'POST' })


  const handleAddFavorite = () => {
    setIsFavorite(true);
    fetchData(`${urlBase}favorite/user/${uid}`, {
      method: 'POST',
      body: JSON.stringify({ id: _id })
    })
  };

  const handleRemoveFavorite = () => {
    setIsFavorite(false);
    fetchData(`${urlBase}favorite/user/${uid}`, {
      method: 'DELETE',
      body: JSON.stringify({ id: _id })
    })
    console.log('RECETA ELIMINADA')
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
        {/* {
          ingredients.map(ingredient => (
            <p key={ingredient._id} className="col-4 col-lg-3 mb-4 card-text d-inline-block text-truncate">
              {ingredient.name}
            </p>
          ))
        } */}
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
          <button
            onClick={handleClick}
            className={`btn btn-sm ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
          >
            <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
          </button>
          {/* {user ? (
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
          )} */}
        </div>
      </div>
    </article>
  )
}

// isFavorite(recipe._id) 
//   ? <i className="bi bi-heart-fill"></i>  // ❤️ Ya es favorito
//   : <i className="bi bi-heart"></i>      // 🤍 No es favorito



{/* <article className="card h-100">
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
          {isFavorite(_id) ? (
            <button onClick={removeFavorite} className="btn btn-danger btn-sm">
              <i className="bi bi-heart-fill"></i>
            </button>
          ) : (
            <button onClick={addFavorite} className="btn btn-outline-danger btn-sm">
              <i className="bi bi-heart"></i>
            </button>
          )}
          {/* {user ? (
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
          )}}
        </div>
      </div>
    </article> */}