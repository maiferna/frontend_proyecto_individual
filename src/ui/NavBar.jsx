import { Link } from 'react-router'
import { useAuth } from '../auth/context/AuthContext'

export const NavBar = () => {

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      //localStorage.removeItem('token');
    } catch (error) {
      throw error;
    }
  }
  return (
    <>
      <nav className="navbar navbar-light bg-light px-4 navbar-expand-lg">
  <div className="container-fluid">
    <Link className="navbar-brand fw-bold" to="/">Planit</Link>
    
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
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menú</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/recipes" className="nav-link">Recetas</Link>
          </li>
          <li className="nav-item">
            <Link to="/search" className="nav-link">Buscar</Link>
          </li>
          <li className="nav-item">
            <Link to="/favorites" className="nav-link">Favoritos</Link>
          </li>
          <li className="nav-item">
            <Link to="/menu" className="nav-link">Menú</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">Iniciar sesión</Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">Registro</Link>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="btn btn-link nav-link">Cerrar sesión</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>      

    </>
  )
}


{/* <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
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
            <button onClick={handleLogout} className="btn btn-link nav-link mx-2">
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav> */}
{/* <nav className="navbar navbar-light bg-light px-4 navbar-expand-lg">
  <div className="container-fluid">
    <Link className="navbar-brand fw-bold" to="/">Planit</Link>
    
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
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menú</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/recipes" className="nav-link">Recetas</Link>
          </li>
          <li className="nav-item">
            <Link to="/search" className="nav-link">Buscar</Link>
          </li>
          <li className="nav-item">
            <Link to="/favorites" className="nav-link">Favoritos</Link>
          </li>
          <li className="nav-item">
            <Link to="/menu" className="nav-link">Menú</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">Iniciar sesión</Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">Registro</Link>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="btn btn-link nav-link">Cerrar sesión</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav> */}



{/* <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
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
                        <button onClick={handleLogout} className="btn btn-link nav-link mx-2">
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </nav> */}
