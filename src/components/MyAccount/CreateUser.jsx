import { useState } from "react";
import styles from "./CreateUser.module.css";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("cashier");
  const [loading, setLoading] = useState(false);
  

const handleCreateUser = async () => {
  if (!name || !email || !password || !role) {
    alert("Please fill all fields");
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
      alert("User created successfully");

      setName("");
      setEmail("");
      setPassword("");
      setRole("cashier");
    } else {
      alert(data.message || "Failed to create user");
    }
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
        <h1>Create User</h1>

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

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="cashier">Cashier</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={handleCreateUser} disabled={loading}>
          {loading ? "Creating..." : "Create User"}
        </button>
      </div>
    </div>
  );
}

export default CreateUser;