
import { GridRecipes } from '../../components/GridRecipes'
import { DetailContainer } from '../components/DetailContainer'

export const FavoriteRecipes = () => {

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

  return (
    <GridRecipes recipes={recipes} />
  )
}
