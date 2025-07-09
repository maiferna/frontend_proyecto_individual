
import { useState } from 'react'
import { CardRecipes } from '../../components/CardRecipes'


export const SearchInput = () => {
    const [cards, setCards] = useState(false)

    const handleSubmit = (ev) => {
        ev.preventDefault()
        setCards(true);
    }

    return (
        <>
            <section className="container-fluid">
                <form className="d-flex mx-auto p-2" onSubmit={handleSubmit}>
                    <input className="form-control me-2" type="text" placeholder="Añade un ingrediente" />
                    <button className="btn btn-outline-success" type="submit">Buscar</button>
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
            </section>
        </>
    )
}




/* const [cards, setCards] = useState(false)



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
    ) */