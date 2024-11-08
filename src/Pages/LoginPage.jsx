import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
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
      if (response.ok) {
        localStorage.setItem("Authorized", JSON.stringify(data));
        navigate("/Home");
      } else {
        alert(data.message || "Login fallito");
      }
    } catch (error) {
      console.error(error);
      alert("Server error connecting");
    }
  };

  const redirectToGoogle = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/auth/google`;
  };

  return (
    <div className="login-container">
      <form onSubmit={onSubmit}>
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
      <button onClick={redirectToGoogle}>Sign with google</button>
    </div>
  );
};

export default LoginPage;
