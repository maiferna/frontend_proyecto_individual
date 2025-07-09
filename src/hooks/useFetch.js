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

  useEffect(() => {
    fetchData()
  }, [])

  return {
    data,
    loading,
    error
  }
}

