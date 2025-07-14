import { useState } from "react";
import { fetchCall } from "../api/fetchCall";

/**
 * Hook personalizado para realizar llamadas a la API con fetch.
 * @param {String} initialUrl Url inicial de la llamada.
 * @param {Object} initialOptions Opciones iniciales de la llamada.
 * @returns DEvuelve los datos obtenidos de la llamada al fetch, el estado de carga y los errores ocurridos.
 */
export const useFetch = (initialUrl, initialOptions) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  const fetchData = async (url = initialUrl, options = initialOptions) => {
    try {
        const data = await fetchCall(url, {...options})
        setData(data);
        setLoading(false);
        setError(null);
    } catch (error) {
      setData(error)
        setError(error);
        setLoading(false);
    }
  }

  return {
    data,
    loading,
    error,
    fetchData
  }
}

