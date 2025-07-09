
// import { useAuth } from '../../auth/context/AuthContext';
import { GridRecipes } from '../../components/GridRecipes'
import { useFetch } from '../../hooks/useFetch';


export const FavoriteRecipes = () => {
  const urlBase = import.meta.env.VITE_API_URL_BASE;
  // const {user} = useAuth();
  // const uid = user.uid;
  const uid = 'F9O6ofjRDNR5s9E3BFvxEdIdPXF3'

  const { data, loading, error } = useFetch(`${urlBase}favorite/user/${uid}`, {
    method: 'GET'
  })

  console.log('RECETAS', data)
  // Para no romper el componente cuando favoritos es undefined. Valor por defecto, hace map pero no renderiza nada
  const recipes = data.favorites || [];

  return (
    <GridRecipes recipes={recipes} />
  )
}
