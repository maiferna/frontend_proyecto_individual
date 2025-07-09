import { Link } from "react-router";

export const CardRecipes = ({ recipe }) => {

  const { ingredients, name, image_url } = recipe;

  return (

    <div className="card">
      <div>
        <img className="card-img-top" src={image_url} />
      </div>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        {
          ingredients.map(ingredient => (
            <p key={ingredient.id} className="col-4 col-lg-3 mb-4 card-text">
              {ingredient.name}
            </p>
          ))
        }
        <Link to="/recipe/id" className="btn btn-green">Ver receta</Link>
      </div>
    </div>
  )
}

