import parse from 'html-react-parser';
import { useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import { useEffect } from "react";

export const DetailContainer = () => {
  const urlBase = import.meta.env.VITE_API_URL_BASE;
  const { id } = useParams();

  const { data, loading, error, fetchData } = useFetch(`${urlBase}recipe/${id}`, {
    method: 'GET'
  })
  console.log('RECETA', data)
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Cargando receta...</p>;
  if (error) return <p>Hubo un error al cargar la receta.</p>;
  const recipe = data.recipe || {};
  const host = import.meta.env.VITE_LOCAL_HOST;
  const imageUrl = `${host}uploads/${recipe.image}`;

  return (
    <>
      <section className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6 order-md-1">
            <h2 className="mb-3 fw-bold">{recipe.name}</h2>
            <p className="text-muted mb-4">Tiempo: {recipe.time} | Dificultad: {recipe.difficulty}</p>
            <p className="mb-2 fs-5 fw-bold">Ingredientes</p>
            <ul>
              {
                recipe.ingredients.map(ingredient => (
                  <li key={ingredient._id} className="mb-2">
                    {ingredient.quantity} {ingredient.name}
                  </li>
                ))
              }
            </ul>
            <div className="mt-4">
              <p className="fw-bold fs-5">Pasos:</p>
              <div>{parse(recipe.steps || '')}</div>
            </div>
          </div>
          <div className="col-md-6 order-md-2 d-flex justify-content-center">
            <div className="ratio ratio-1x1 recipe-image">
              <img src={imageUrl} className="img-fluid rounded-1 object-fit-cover" alt={recipe.name} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

{/* <section className="container mt-5">
        <div className="row">
          <div className="col-md-6 mb-4">
            <img src={imageUrl} className="img-fluid rounded mb-3 product-image" id="mainImage" alt={recipe.name} />
          </div>
          <div className="col-md-6">
            <h2 className="mb-3">{recipe.name}</h2>
            <p className="text-muted mb-4">{recipe.time} | {recipe.difficulty}</p>
            <p className="mb-2 fw-bold">Ingredientes</p>
            <ul>
              {
                recipe.ingredients.map(ingredient => (
                  <li key={ingredient.id} className="col-4 col-lg-3 mb-4 card-text">
                    {ingredient.name}
                  </li>
                ))
              }
            </ul>
            <div className="mb-4">
              <h5>Color:</h5>
            </div>
            <div className="mt-4">
              <h5>Pasos:</h5>
              <p>{recipe.steps}</p>
            </div>
          </div>
        </div>
      </section> */}


{/* <section>
      <div>
        <img className="img-fluid w-50" src={imageUrl} alt={recipe.name} />
      </div>
      <h2>{recipe.name}</h2>
      <ul>
        {
          recipe.ingredients.map(ingredient => (
            <li key={ingredient.id} className="col-4 col-lg-3 mb-4 card-text">
              {ingredient.name}
            </li>
          ))
        }
      </ul>
      <p>{recipe.difficulty}</p>
      <p>{recipe.time}</p>
      <p>{recipe.category}</p>
      <p>{recipe.steps}</p>
    </section> */}