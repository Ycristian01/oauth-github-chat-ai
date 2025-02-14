import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log('CODE', code)

    if (code) {
      fetch("http://127.0.0.1:8000/api/auth/github/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("avatar", data.user.avatar_url);
          navigate("/chat"); // Redirigir automáticamente al chat
        })
        .catch((err) => {
          console.error("error:", err);
          navigate("/"); // Si hay error, volver a login
        });
    } else {
      navigate("/"); // Si no hay código, volver a login
    }
  }, [navigate]);

  return <p>Processing login...</p>; // No se renderiza, solo maneja la lógica
};

export default Callback;