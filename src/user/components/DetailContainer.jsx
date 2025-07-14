import parse from 'html-react-parser';
import { useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import { useEffect } from "react";

/**
 * Componente para renderizar la vista de detalle de la receta.
 * Con html-react-parse se parsea el texto html que devuelve joditeditor
 */
export const DetailContainer = () => {
  const urlBase = import.meta.env.VITE_API_URL_BASE;
  const { id } = useParams();
  const recipe = data.recipe || {};
  const host = import.meta.env.VITE_LOCAL_HOST;
  const imageUrl = `${host}uploads/${recipe.image}`;

  const { data, loading, error, fetchData } = useFetch(`${urlBase}recipe/${id}`, {
    method: 'GET'
  })

  useEffect(() => {
    fetchData();
  }, []);

  // if (loading) return <p>Cargando receta...</p>;
  // if (error) return <p>Hubo un error al cargar la receta.</p>;
  
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
