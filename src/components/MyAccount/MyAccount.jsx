import styles from "./MyAccount.module.css";
import { useNavigate } from "react-router-dom";
import Cashier from "../Cashier";

function MyAccount({ onClose }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>

         <div className={styles.topSpace}>
  <div className={styles.userRow}>

    <div className={styles.avatar}>
      {user?.name?.charAt(0).toUpperCase()}
    </div>

    <div className={styles.userInfo}>
      <p className={styles.name}>{user?.name || "Admin"}</p>
      <p className={styles.email}>{user?.email || "admin@gmail.com"}</p>
    </div>

  </div>
</div>

<div className={styles.thickDivider}></div>
        <div className={styles.divider} />
        <div className={styles.cardContainer}>
  <div className={styles.card}>MY ACCOUNT</div>
  <div className={styles.card} onClick={() => navigate("/cashier")}>
  CASHIER
</div>
</div>

        <div className={styles.bottomActions}>

    <button className={styles.logoutBtn} onClick={handleLogout}>
      Logout
    </button>
  </div>
      </div>
    </div>
  );
}

export default MyAccount;