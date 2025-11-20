import { useState } from "react";
import { loginUser } from "../services/api";
import './Login.css'
const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await loginUser(form);

    if (res.token) {
      localStorage.setItem("token", res.token);
      alert("Login exitoso");
    } else {
      alert("Credenciales incorrectas");
    }
  };

   return (
    <div className="login-container">
      <div className="login-card">
        <h3 className="main">Iniciar sesión</h3>

        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />

        <button onClick={handleSubmit}>Entrar</button>
      </div>
    </div>
  );
};
export default Login;
