import { useState } from "react"
import { FilterRecipes } from "../components/FilterRecipes"
import { GridRecipes } from "../components/GridRecipes";



export const AllRecipes = () => {
  const recipes = [{
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
  },
  {
    id: 2,
    name: "tortilla",
    ingredients: [
      {
        name: "patata",
        quantity: "100gr",
        id: 2
      }
    ],
    image_url: "https://centenario.toque.com.ar/sistema/uploads/1600/articulos/684371415594.jpg",
    difficulty: "facil",
    time: "10min",
    category: [
      "otros"
    ],
    intolerance: [],
    steps: "paso1"
  }]
  const [category, setCategory] = useState('todas');

  const filtered = category === 'todas' ? recipes : recipes.filter((recipe) => recipe.category.includes(category));

  return (
    <section>
      <FilterRecipes setCategory={setCategory} category={category} />
      {console.log('CATEGORIA', category)}
      <GridRecipes recipes={filtered} />
    </section>
  )
}
