import { useEffect } from 'react'
import { useParams } from 'react-router'
import { EditForm } from '../components/EditForm';
import { useFetch } from '../../hooks/useFetch';

/**
 * Página para el formulario de editar receta.
 * Recoge los datos de la receta y su id.
 */
export const EditRecipe = () => {
  const { id } = useParams();
    const urlBase = import.meta.env.VITE_API_URL_BASE;
    const {data, loading, fetchData} = useFetch(`${urlBase}recipe/${id}`, {
        method: 'GET'
    })

    useEffect(() => {
      fetchData()
    }, [])

    if (loading) return null;

    const recipe = data.recipe;
  
  return (
    <EditForm recipe={recipe} id={id} />
  )
}
