const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (data: any) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data: any) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};


export const sendContact = async (form: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const res = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Error al enviar mensaje");

    return data;
  } catch (err) {
    console.error(err);
    return { error: true, message: "No se pudo enviar el mensaje" };
  }
};