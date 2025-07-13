/* import { useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { GridUserCards } from '../components/GridUserCards';
import { fetchCall } from '../../api/fetchCall';

export const ManageUsers = () => {
  const urlBase = import.meta.env.VITE_API_URL_BASE;
  const { data, fetchData } = useFetch(`${urlBase}admin/users`, {
    method: 'GET'
  })

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    await fetchCall(`${urlBase}admin/user/delete/${id}`, {
      method: 'DELETE'
    })
    fetchData(); // Vuelve a cargar la lista actualizada de los usuarios
  }

  const handleRoleChange = async (id, newRole) => {
    try {
      await fetchCall(`${urlBase}admin/user/edit/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ role: newRole })
      });
      fetchData(); // Refresca usuarios
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  // console.log('DATA USUARIOS', data.users)
  const users = data?.users || [];

  return (
    <>
      <h2>Usuarios</h2>
      <GridUserCards users={users} handleDelete={handleDelete} handleRoleChange={handleRoleChange}/>
    </>

  )
}
 */