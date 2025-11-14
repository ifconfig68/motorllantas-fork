// src/components/ContactList.tsx
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

interface Contact {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created_at: string;
}

const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token"); // Token admin

  // Obtener contactos
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/contact`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401 || res.status === 403) {
        alert("No tienes permisos para ver esta sección");
        return;
      }

      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error("Error al obtener contactos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar contacto
  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este contacto?")) return;

    try {
      const res = await fetch(`${API_URL}/contact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setContacts((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert("No se pudo eliminar el contacto");
      }
    } catch (err) {
      console.error("Error al eliminar contacto:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h2>📬 Contactos</h2>

      {loading ? (
        <p>🔄 Cargando contactos...</p>
      ) : contacts.length === 0 ? (
        <p>No hay contactos disponibles.</p>
      ) : (
        <table
          border={1}
          cellPadding={5}
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead style={{ backgroundColor: "#000000ff", color: "#fff" }}>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Asunto</th>
              <th>Mensaje</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.subject || "-"}</td>
                <td>{c.message}</td>
                <td>{new Date(c.created_at).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => handleDelete(c.id)}
                    style={{
                      backgroundColor: "#f55",
                      color: "#fff",
                      border: "none",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContactList;
