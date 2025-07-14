import { useEffect, useState } from "react"
import { FilterRecipes } from "../components/FilterRecipes"
import { GridRecipes } from "../components/GridRecipes";
import { useFetch } from "../hooks/useFetch";

/**
 * Página que muestra todas las recetas de la base de datos.
 * Ejecuta la llamada a la API cuando se monta el componente.
 */
export const AllRecipes = () => {
  const urlBase = import.meta.env.VITE_API_URL_BASE;
  const [category, setCategory] = useState('todas');

  const { data, loading, fetchData } = useFetch(`${urlBase}recipes`, {
    method: 'GET'
  })

  useEffect(() => {
    fetchData();
  }, []);

  const recipes = data.recipes || [];

  const filtered = category === 'todas' ? recipes : recipes.filter((recipe) => recipe.category.includes(category));

  return (
    <section>
      <FilterRecipes setCategory={setCategory} category={category} />
      {console.log('CATEGORIA', category)}
      {
        !loading && filtered.length === 0 && <p className="m-4">No hay recetas con esa categoría.</p>
      }
      <GridRecipes recipes={filtered} />
    </section>
  )
}
