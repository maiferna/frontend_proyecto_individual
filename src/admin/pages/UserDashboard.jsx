// Panel de administración de roles

// Mostramos una lista de todos los usuarios y permitimos que el administrador seleccione un nuevo rol para asignarles
// Actualiza el rol en la colección users de Firestore

import { useState, useEffect } from 'react';
import { db } from '../../auth/firebaseConfig'; // Referencia a la base de datos de Firestore

// collection: acceder a una colección
// getDocs: traer todos los documentos
// doc: crear una referencia a un documento
// updateDoc: actualizar un documento
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';


export const AdminPanel = () => {
    // lista de todos los usuarios
    // cambiar porque no querré un select
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [newRole, setNewRole] = useState('');

  // Obtener los usuarios al cargar el componente
  useEffect(() => {
    const fetchUsers = async () => {
        // Trae todos los documentos (usuarios) de la colección users que hemos creado en Firebase
      const querySnapshot = await getDocs(collection(db, 'users'));
      const userList = [];
      // Recorre cada documento de la colección, extrae su id y data y los combina en un nuevo objeto. Luego lo agrega al array userList
      // .id --> el ID único del documento
      // .data --> objeto con los datos reales guardados (role, email..)
      querySnapshot.forEach((doc) => {
        userList.push({ id: doc.id, ...doc.data() });
      });
      // Guarda la lista completa de usuarios en el estado users
      setUsers(userList);
    };
    fetchUsers();
  }, []);

  // Función para cambiar el rol
  const handleRoleChange = async () => {
    // Verifica que se haya seleccionado un usuario y un nuevo rol
    if (selectedUser && newRole) {
        // Crea una referencia al documento del usuario
      const userRef = doc(db, 'users', selectedUser);
      // modifica el campo del rol de ese documento
      await updateDoc(userRef, { role: newRole });
      console.log('Rol actualizado con éxito');
    } else {
      console.log('Debe seleccionar un usuario y un nuevo rol');
    }
  };

  return (
    <div>
      <h2>Panel de Administración</h2>
      <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
        <option value="">Seleccionar Usuario</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.id} - {user.email}
          </option>
        ))}
      </select>
      <select onChange={(e) => setNewRole(e.target.value)} value={newRole}>
        <option value="">Seleccionar Rol</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
      <button onClick={handleRoleChange}>Cambiar Rol</button>
    </div>
  );
}
