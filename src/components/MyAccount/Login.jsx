import styles from "./Login.module.css";
import { useState, useRef } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);
const passwordRef = useRef(null);

useState(() => {
  emailRef.current?.focus();
}, []);

const handleKeyDownEmail = (e) => {
  if (e.key === "Enter") {
    passwordRef.current.focus();
  }
};

const handleKeyDownPassword = (e) => {
  if (e.key === "Enter") {
    handleLogin();
  }
};

 const handleLogin = async () => {
  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch(
      "http://192.168.31.181:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // SAVE TOKEN
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    // SAVE USER
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login success");

    window.location.href = "/";
  } catch (error) {
    console.error(error);
    alert("Server error");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h1>Login</h1>

        <input
  type="email"
  placeholder="Email"
  value={email}
  ref={emailRef}
  onChange={(e) => setEmail(e.target.value)}
  onKeyDown={handleKeyDownEmail}
/>

        <input
  type="password"
  placeholder="Password"
  value={password}
  ref={passwordRef}
  onChange={(e) => setPassword(e.target.value)}
  onKeyDown={handleKeyDownPassword}
/>

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;