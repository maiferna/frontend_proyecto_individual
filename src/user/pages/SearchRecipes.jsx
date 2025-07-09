
import { useState } from 'react'
import { GridRecipes } from '../../components/GridRecipes'
import { SearchInput } from '../components/SearchInput'

export const SearchRecipes = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  return (
    <section className="container my-5">
      <SearchInput
        ingredients={ingredients}
        setIngredients={setIngredients}
        setRecipes={setRecipes} />
      <GridRecipes recipes={recipes}/>
    </section>
  )
}
