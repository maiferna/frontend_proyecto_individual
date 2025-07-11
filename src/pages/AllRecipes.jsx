import { useEffect, useState } from "react"
import { FilterRecipes } from "../components/FilterRecipes"
import { GridRecipes } from "../components/GridRecipes";
import { useFetch } from "../hooks/useFetch";


export const AllRecipes = () => {
  const urlBase = import.meta.env.VITE_API_URL_BASE;
  const [category, setCategory] = useState('todas');

  const { data, loading, error, fetchData } = useFetch(`${urlBase}recipes`, {
    method: 'GET'
  })

  useEffect(() => {
    fetchData();
  }, []);

  console.log('RECETAS', data)
  const recipes = data.recipes || [];

  const filtered = category === 'todas' ? recipes : recipes.filter((recipe) => recipe.category.includes(category));
  //const categories = ['todas', ...new Set(recipes.map(recipe => recipe.category))];

  return (
    <section>
      <FilterRecipes setCategory={setCategory} category={category} />
      {console.log('CATEGORIA', category)}
      <GridRecipes recipes={filtered} />
    </section>
  )
}
