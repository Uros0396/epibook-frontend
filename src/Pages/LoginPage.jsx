import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        onLogin();
        navigate("/Home");
      } else {
        alert(data.message || "Login fallito");
      }
    } catch (error) {
      console.error(error);
      alert("Si è verificato un errore durante la connessione al server.");
    }
  };

  return (
    <div className="login-container">
      <form
        onSubmit={onSubmit}
        className="d-flex flex-column justify-content-center align-content-center"
      >
        <input
          onChange={handleInput}
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
        />
        <input
          onChange={handleInput}
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
