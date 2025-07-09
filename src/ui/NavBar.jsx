import { Link } from 'react-router'

export const NavBar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
                <Link className="navbar-brand fw-bold" to="/">Planit</Link>
                <button className="navbar-toggler" type="button"></button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <div className="navbar-nav">
                        <Link to="/" className="nav-link mx-2">Home</Link>
                        <Link to="/recipes" className="nav-link mx-2">Recetas</Link>
                        <Link to="/search" className="nav-link mx-2">Buscar</Link>
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

{/* <nav className="navbar navbar-light bg-light fixed-top px-4">
                <Link className="navbar-brand" to="/">Nombre</Link>

               
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                
                <div
                    className="offcanvas offcanvas-end bg-green"
                    tabIndex="-1"
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                >
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title color-white" id="offcanvasNavbarLabel">Menú</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="offcanvas-body">
                        <div className="navbar-nav color-white">
                            <Link to="/" className="nav-link mx-2 color-white">Home</Link>
                            <Link to="/recipes" className="nav-link mx-2 color-white">Recetas</Link>
                            <Link to="/search" className="nav-link mx-2 color-white">Buscar</Link>
                            <Link to="/recipe/id" className="nav-link mx-2 color-white">Receta detallada</Link>
                            <Link to="/favorites" className="nav-link mx-2 color-white">Favoritos</Link>
                            <Link to="/menu" className="nav-link mx-2 color-white">Menú</Link>
                            <Link to="/login" className="nav-link mx-2 color-white">Iniciar sesión</Link>
                            <Link to="/signup" className="nav-link mx-2 color-white">Registro</Link>
                        </div>
                    </div>
                </div>
            </nav> */}

