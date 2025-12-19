// const API_BASE = "http://localhost:4800/api";

// const request = async (path, options = {}) => {
//   const res = await fetch(`${API_BASE}${path}`, {
//     headers: {
//       "Content-Type": "application/json",
//       ...(options.headers || {}),
//     },
//     ...options,
//   });

//   if (!res.ok) {
//     const text = await res.text();
//     throw new Error(text || "Request failed");
//   }
//   return res.json();
// };

// export default request;

const API_BASE = "http://localhost:4800/api";

const request = async (path, options = {}) => {
  const token = localStorage.getItem("token"); 

  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), 
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }

  return res.json();
};

export default request;
