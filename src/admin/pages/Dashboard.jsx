import { useEffect } from 'react'
import { Link } from 'react-router'
import { GridCardsAdmin } from '../components/GridCardsAdmin';
import { useFetch } from '../../hooks/useFetch';
import { fetchCall } from '../../api/fetchCall';

/**
 * Renderiza la página de gestion de recetas del administrador.
 * Recoge todas las recetas al montar el componente.
 * Al eliminar una receta, hace la llamada a la API y vuelve a cargar la lista actualizada de las recetas.
 */
export const Dashboard = () => {

  const urlBase = import.meta.env.VITE_API_URL_BASE;
  const token = localStorage.getItem("token");

  const { data, loading, error, fetchData } = useFetch(`${urlBase}recipes`, {
    method: 'GET'
  })

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await fetchCall(`${urlBase}admin/delete/${id}`, {
      method: 'DELETE',
      headers: { "Authorization": `Bearer ${token}`}
    })
    fetchData(); 
  }

  const recipes = data?.recipes || [];
  if (loading) return null

  return (
    <>
      <section className="d-flex flex-column justify-content-center align-items-center mt-5">
        <Link to="/create/recipe" className="btn btn-green">Crear receta</Link>
      </section>
      <GridCardsAdmin recipes={recipes} handleDelete={handleDelete}/>
    </>

  )
}
