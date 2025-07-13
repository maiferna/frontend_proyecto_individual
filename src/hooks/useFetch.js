import { useState } from "react";
import { fetchCall } from "../api/fetchCall";


export const useFetch = (initialUrl, initialOptions) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  const fetchData = async (url = initialUrl, options = initialOptions) => {
    try {
        const data = await fetchCall(url, {...options})
        setData(data);
        setLoading(false);
        setError(null); // Por seguridad
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

