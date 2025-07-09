import { useEffect, useState } from "react";
import { fetchCall } from "../api/fetchCall";


export const useFetch = (url, options) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
        const data = await fetchCall(url, {...options})
        setData(data);
        setLoading(false);
        setError(null); // Por seguridad
    } catch (error) {
        setError(error);
        setLoading(false);
    }
  }

  // Si ejecutaramos una función directamente en el componente, se volverá a ejecutar cada vez que haya un cambio en el estado esto podría provocar bucles infinitos.
  // Para que se ejecute sólo cuando sucede un cambio concreto como cuando cambie un estado del componente, o cuando se carge por primera vez el componente ello utilizamos un useEffect()
  useEffect(() => {
    fetchData()
  }, [])

  return {
    data,
    loading,
    error
  }
}

