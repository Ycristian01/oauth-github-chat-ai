import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
  
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

 // Runs whenever the 'code' variable changes (likely on authorization flow)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      navigate("/chat");
    } else if (code) {
      // If no token but 'code' is available (GitHub OAuth flow)
      setLoading(true);
      fetch("http://127.0.0.1:8000/api/auth/github/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        setLoading(false);
        navigate("/chat"); // go to chat view
      })
      .catch((err) => {
        console.error("Error:", err);
        navigate("/");
      });
    }
  }, [code]);


 // Function to redirect the user to the GitHub OAuth authorization page
  function redirectToGitHub() {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = authUrl;
  }
  
  if (loading) {
   return <h4>Loading...</h4>;
 }

 return (
   <>
     <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Login with GitHub</h1>
      <button onClick={redirectToGitHub} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Sign in with GitHub
      </button>
    </div>
   </>
 );
  
};

export default Login;