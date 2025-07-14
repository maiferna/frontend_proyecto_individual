import { Link } from "react-router"


export const LandingPage = () => {

  return (
    <header>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="text-center mb-4 ff-grotesk display-1">¿Qué comemos hoy?</h1>
        <Link to="/search" className="btn btn-green">Busca recetas</Link>
      </div>
    </header>
  )
}
