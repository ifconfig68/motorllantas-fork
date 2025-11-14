import { useState } from "react";
import { registerUser } from "../services/api";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await registerUser(form);
    console.log(res);
    alert(res.message);
  };

  return (
    <div className="main-content register-container">
      <h2 className="main-title">Registro</h2>

      <div className="register-box">
        <input
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          className="register-input"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="register-input"
        />

        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
          className="register-input"
        />

        <button onClick={handleSubmit} className="register-button">
          Registrar
        </button>
      </div>
    </div>
  );
};

export default Register;
