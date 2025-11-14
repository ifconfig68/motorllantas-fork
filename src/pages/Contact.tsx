import './Contact.css';
import { useState } from 'react';
import { FaPhone, FaClock, FaGlobe, FaEnvelope, FaFacebook, FaInstagram, FaYoutube, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL; // ejemplo: http://localhost:3000/api

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  // Maneja cambios en los inputs
  // @ts-ignore
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Maneja el envío del formulario
  // @ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Enviando...');

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('¡Mensaje enviado correctamente!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus(`Error: ${data.message || data.details}`);
      }
    } catch (error) {
      console.error("Error enviando formulario:", error);
      setStatus('Error al enviar el mensaje');
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-info">
        <h2>Ponte en contacto</h2>
        <p>Especialistas en llantas para todo tipo de vehículos.</p>
        <p className="address-info"><FaMapMarkerAlt /> Cll. 33 #64 – 198 Conquistadores</p>
        <div className="contact-details">
          <p><FaPhone /> +57 312 299 10 84</p>
          <p><FaClock /> Lunes – Viernes 8:00 am a 5:00 pm</p>
          <p>Sábado 8:00 am a 1:00 pm</p>
          <p><FaGlobe /> www.motorllantas.com</p>
          <p><FaEnvelope /> info@motorllantas.com</p>
        </div>
        <div className="social-icons">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaYoutube /></a>
          <a href="#"><FaWhatsapp /></a>
        </div>
      </div>

      <div className="contact-form-container">
        <h2>Escríbenos</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Su Nombre: </label>
            <input type="text" id="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Su E-mail: </label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Asunto: </label>
            <input type="text" id="subject" value={formData.subject} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="message">Su Mensaje: </label>
            <textarea id="message" rows={5} value={formData.message} onChange={handleChange} required></textarea>
          </div>
          <button type="submit" className="submit-btn">Enviar</button>
        </form>
        {status && <p className="status-message">{status}</p>}
      </div>
    </div>
  );
};

export default Contact;
