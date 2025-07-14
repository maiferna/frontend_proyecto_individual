import { useEffect } from 'react'
import { Link } from 'react-router'
import { GridCardsAdmin } from '../components/GridCardsAdmin';
import { useFetch } from '../../hooks/useFetch';
import { fetchCall } from '../../api/fetchCall';

export const Dashboard = () => {

  const urlBase = import.meta.env.VITE_API_URL_BASE;
  const token = localStorage.getItem("token");

  const { data, loading, error, fetchData } = useFetch(`${urlBase}recipes`, {
    method: 'GET'
  })

  useEffect(() => {
    fetchData();
  }, []);

  // Mirar esto bien por si se puede cambiar
  const handleDelete = async (id) => {
    await fetchCall(`${urlBase}admin/delete/${id}`, {
      method: 'DELETE',
      headers: { "Authorization": `Bearer ${token}`}
    })
    fetchData(); // Vuelve a cargar la lista actualizada de las recetas
  }
  console.log('RECETAS', data)

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
