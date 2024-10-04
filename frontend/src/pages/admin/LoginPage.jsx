import * as React from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [error, setError] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const nav = useNavigate()

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error("Hatalı giriş");
      const data = await response.json();
      sessionStorage.setItem("token", data);
      if(response.ok) nav("/adminhomepage");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div>
        {error && <h3>{error}</h3>}
        <textarea
          key="email"
          label="Email"
          onChange={handleEmail}
          value={email}
        ></textarea>
        <textarea
          key="password"
          label="Password"
          onChange={handlePassword}
          value={password}
        ></textarea>
        <button onClick={handleLogin}> Giriş Yap </button>
      </div>
    </>
  );
}
