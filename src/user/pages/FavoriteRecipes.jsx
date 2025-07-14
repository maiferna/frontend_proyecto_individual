
import { useEffect } from 'react';
import { GridRecipes } from '../../components/GridRecipes'
import { useFetch } from '../../hooks/useFetch';
import { useAuth } from '../../context/AuthContext';

/**
 * Página para renderizar las recetas favoritas.
 * Obtiene todas las recetas al montar le componente.
 */
export const FavoriteRecipes = () => {
  const urlBase = import.meta.env.VITE_API_URL_BASE;
  const { user } = useAuth();
  const uid = user._id;

  const { data, fetchData } = useFetch(`${urlBase}favorite/user/${uid}`, {
    method: 'GET'
  })

  useEffect(() => {
    fetchData();
  }, []);

  const recipes = data.favorites || [];

  return (
    <>
      <GridRecipes recipes={recipes} initialFavorite={true}/>
    </>
  )
}
