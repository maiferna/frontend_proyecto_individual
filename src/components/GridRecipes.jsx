import { CardRecipes } from "./CardRecipes"

export const GridRecipes = ({ recipes, initialFavorite }) => {

  return (
    <section>
      <div className="row p-4">
        {recipes.map(recipe => (
          <div key={recipe._id} className="col-4 col-lg-3 mb-4">
            <CardRecipes recipe={recipe} initialFavorite={initialFavorite}/>
          </div>
        ))}
      </div>
    </section>
  )
}
