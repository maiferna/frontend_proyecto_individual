import { CardRecipes } from "./CardRecipes"

export const GridRecipes = ({ recipes }) => {

  return (
    <section>
      <div className="row p-4">
        {recipes.map(recipe => (
          <div key={recipe._id} className="col-4 col-lg-3 mb-4">
            <CardRecipes recipe={recipe} />
          </div>
        ))}
      </div>
    </section>
  )
}
