
export const fetchCall = async (url, options = {}) => {
  const { method = "GET", body = null, headers = {} } = options;
  const option = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (method === "POST" || method === "PUT" || method === 'DELETE') {
    option.body = body;
  }

  try {
    const answer = await fetch(url, option);
    const data = await answer.json();
    if (!answer.ok) {
      throw {
        ok: false,
        status: answer.status,
        msg: data.msg,
      };
    }
    return data;
  } catch (error) {
    console.log(error);
    if (error.msg) {
      throw error;
    }
    throw {
      ok: false,
      msg: "Error en la consulta.",
    };
  }
}
