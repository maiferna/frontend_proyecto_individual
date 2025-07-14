
import { CardRecipesAdmin } from './CardRecipesAdmin'

export const GridCardsAdmin = ({recipes, handleDelete}) => {
  return (
      <section>
        <div className="row p-4">
          {recipes.map(recipe => (
            <div key={recipe._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <CardRecipesAdmin recipe={recipe} handleDelete={handleDelete}/>
            </div>
          ))}
        </div>
      </section>
    )
}
