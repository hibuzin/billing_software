import styles from "./CreateUser.module.css";
import Toast from "../Toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("cashier");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //ui state
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  
useEffect(() => {
  if (message) {
    const t = setTimeout(() => setMessage(""), 2500);
    return () => clearTimeout(t);
  }
}, [message]);

const handleCreateUser = async () => {
  if (!name || !email || !password || !role) {
    setMessage("Please fill all fields");
    setMessageType("error");
    return;
  }

  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://192.168.31.181:5000/api/auth/create-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
  setMessage("User created successfully");
  setMessageType("success");

  setName("");
  setEmail("");
  setPassword("");
  setRole("cashier");

  // navigate after small delay (toast show aagum)
  setTimeout(() => {
    navigate("/cashier");   
  }, 1200);
} else {
      setMessage(data.message || "Failed to create user");
      setMessageType("error");
    }
  } catch (error) {
    setMessage("Server error");
    setMessageType("error");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={styles.container}>
      <Toast message={message} type={messageType} />
      <div className={styles.formBox}>
        <h1>CREATE CASHIER</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        

        <button onClick={handleCreateUser} disabled={loading}>
          {loading ? "Creating..." : "CREATE CASHIER"}
        </button>
      </div>
    </div>
  );
}

export default CreateUser;