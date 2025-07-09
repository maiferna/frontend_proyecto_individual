
export const fetchCall = async (url, method = "GET", body = {}, header = {}) => {
  let option;

  if (method === "POST" || method === "PUT") {
    option = {
      method: method,
      body,
      headers: {
        ...header,
        "Content-Type": "application/json",
      }
    };
  } else if (method === "DELETE" || method === "GET") {
    option = {
      method: method,
      headers: {
        ...header,
        "Content-Type": "application/json",
      }
    };
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
