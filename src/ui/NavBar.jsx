import { Link } from 'react-router'

export const NavBar = () => {
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
            <Link className="navbar-brand" to="/">Nombre</Link>
            <button className="navbar-toggler" type="button"></button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <div className="navbar-nav">
                    <Link to="/" className="nav-link mx-2">Home</Link>
                    <Link to="/recipes" className="nav-link mx-2">Recetas</Link>
                    <Link to="/search" className="nav-link mx-2">Buscar</Link>
                    <Link to="/recipe/id" className="nav-link mx-2">Receta detallada</Link>
                    <Link to="/favorites" className="nav-link mx-2">Favoritos</Link>
                    <Link to="/menu" className="nav-link mx-2">Menú</Link>
                    <Link to="/login" className="nav-link mx-2">Iniciar sesión</Link>
                    <Link to="/signup" className="nav-link mx-2">Registro</Link>
                </div>
            </div>
        </nav>
    </>
    )
}
