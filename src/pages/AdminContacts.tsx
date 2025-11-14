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

const ITEMS_PER_PAGE = 10;

const AdminContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const token = localStorage.getItem("token");

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const totalPages = Math.ceil(contacts.length / ITEMS_PER_PAGE);
  const paginatedContacts = contacts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h2>Mensajes de Contacto</h2>

      {loading ? (
        <p>🔄 Cargando contactos...</p>
      ) : (
        <>
          <table
            border={1}
            cellPadding={5}
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead style={{ backgroundColor: "#000000ff", color: "#fff" }}>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Asunto</th>
                <th>Mensaje</th>
                <th>Creado</th>
              </tr>
            </thead>
            <tbody>
              {paginatedContacts.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.subject || "-"}</td>
                  <td>{c.message}</td>
                  <td>{new Date(c.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              ◀️ Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Siguiente ▶️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminContacts;
