
import { useAuth } from '../../auth/context/AuthContext';
import { useEffect } from 'react';
import { GridRecipes } from '../../components/GridRecipes'
import { useFetch } from '../../hooks/useFetch';


export const FavoriteRecipes = () => {
  const urlBase = import.meta.env.VITE_API_URL_BASE;
  const { user } = useAuth();
  console.log('USUARIO USEAUTH', user)
  const uid = user._id;

  const { data, loading, error, fetchData } = useFetch(`${urlBase}favorite/user/${uid}`, {
    method: 'GET'
  })

  useEffect(() => {
      fetchData();
  }, []);

  console.log('RECETAS', data)
  // Para no romper el componente cuando favoritos es undefined. Valor por defecto, hace map pero no renderiza nada
  const recipes = data.favorites || [];

  return (
    <>
      <GridRecipes recipes={recipes} initialFavorite={true} />
    </>
  )
}
