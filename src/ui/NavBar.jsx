import { Link, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext';

/* export const NavBar = () => {

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      throw error;
    }
  }
  return (
    <>
      <nav className="navbar navbar-light bg-green px-4 navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold color-white" to="/">Planit</Link>

          <button
            className="navbar-toggler border-white color-white"
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
            <div className="offcanvas-header bg-green">
              <h5 className="offcanvas-title color-white" id="offcanvasNavbarLabel">Menú</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body bg-green">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 ">
                <li className="nav-item">
                  <Link to="/" className="nav-link color-white">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/recipes" className="nav-link color-white">Recetas</Link>
                </li>
                <li className="nav-item">
                  <Link to="/search" className="nav-link color-white">Buscar</Link>
                </li>
                <li className="nav-item">
                  <Link to="/favorites" className="nav-link color-white">Favoritos</Link>
                </li>
                <li className="nav-item">
                  <Link to="/menu" className="nav-link color-white">Menú</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link color-white">Iniciar sesión</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link color-white">Registro</Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-link nav-link color-white">Cerrar sesión</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

    </>
  )
} */

export const NavBar = () => {

  const { user, logout, role } = useAuth();
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/')
    } catch (error) {
      throw error;
    }
  }
  return (
    <>
      <nav className="navbar navbar-light bg-green px-4 navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold color-white ff-grotesk" to="/">Planit</Link>

          <button
            className="navbar-toggler border-white color-white"
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
            <div className="offcanvas-header bg-green">
              <h5 className="offcanvas-title color-white" id="offcanvasNavbarLabel">Menú</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body bg-green">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 ">
                {
                  role !== 'admin' && (
                    <>
                      <li className="nav-item">
                        <Link to="/" className="nav-link color-white">Home</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/recipes" className="nav-link color-white">Recetas</Link>
                      </li>
                    </>
                  )
                }

                {user && role === 'user' && (
                  <>
                    <li className="nav-item">
                      <Link to="/search" className="nav-link color-white">Buscar</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/favorites" className="nav-link color-white">Favoritos</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/menu" className="nav-link color-white">Menú</Link>
                    </li>
                  </>
                )}

                {user && role === 'admin' && (
                  <>
                    <li className="nav-item">
                      <Link to="/dashboard" className="nav-link color-white">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/create/recipe" className="nav-link color-white">Crear receta</Link>
                    </li>
                    {/* etc. */}
                  </>
                )}

                {!user && (
                  <>
                    <li className="nav-item">
                      <Link to="/login" className="nav-link color-white">Iniciar sesión</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/signup" className="nav-link color-white">Registro</Link>
                    </li>
                  </>
                )}

                {user && (
                  <li className="nav-item">
                    <button onClick={handleLogout} className="btn btn-link nav-link color-white">Cerrar sesión</button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>

    </>
  )
}


