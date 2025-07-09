
import { useState } from 'react'
import { CardRecipes } from '../../components/CardRecipes'


export const SearchInput = () => {
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

    const [cards, setCards] = useState(false)



    const handleSubmit = (ev) => {
        ev.preventDefault()
        setCards(true);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="ingresa un ingrediente" />
                <button type="submit">Buscar receta</button>
            </form>
            {
                cards && <div className="row">
                    {recipes.map(recipe => (
                        <div key={recipe.id} className="col-4 col-lg-3 mb-4">
                            <CardRecipes recipe={recipe} />
                        </div>
                    ))}
                </div>
            }
        </>
    )
}
