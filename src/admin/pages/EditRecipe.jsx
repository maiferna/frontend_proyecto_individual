import { useEffect } from 'react'
import { useParams } from 'react-router'
import { EditForm } from '../components/EditForm';
import { useFetch } from '../../hooks/useFetch';

export const EditRecipe = () => {
  const { id } = useParams();
    const urlBase = import.meta.env.VITE_API_URL_BASE;
    const {data, loading, error, fetchData} = useFetch(`${urlBase}recipe/${id}`, {
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
