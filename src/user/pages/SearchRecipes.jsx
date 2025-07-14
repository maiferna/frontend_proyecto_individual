
import { useState } from 'react'
import { GridRecipes } from '../../components/GridRecipes'
import { SearchInput } from '../components/SearchInput'

/**
 * Página para renderizar el buscador de recetas.
 */
export const SearchRecipes = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  return (
    <section>
      <SearchInput
        ingredients={ingredients}
        setIngredients={setIngredients}
        setRecipes={setRecipes} />
      <GridRecipes recipes={recipes}/>
    </section>
  )
}
