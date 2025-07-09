
export const DetailContainer = () => {
  const recipe = {
    id: 1,
    name: "ensalada cesar",
    ingredients: [
      {
        name: "lechuga",
        quantity: "100gr",
        id: 1
      },
    ],
    image_url: "https://centenario.toque.com.ar/sistema/uploads/1600/articulos/684371415594.jpg",
    difficulty: "facil",
    time: "10min",
    category: [
      "ensaladas"
    ],
    intolerance: [],
    steps: "paso1"
  }

  return (
    <section>
      <div>
        <img src={recipe.image_url} />
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
    </section>
  )
}
