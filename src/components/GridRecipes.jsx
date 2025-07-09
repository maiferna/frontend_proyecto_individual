import { CardRecipes } from "./CardRecipes"

export const GridRecipes = ({ recipes }) => {

  return (
    <section>
      <div className="row">
        {recipes.map(recipe => (
          <div key={recipe.id} className="col-4 col-lg-3 mb-4">
            <CardRecipes recipe={recipe} />
          </div>
        ))}
      </div>
    </section>
  )
}
