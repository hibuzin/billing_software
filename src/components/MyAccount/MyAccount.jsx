import styles from "./MyAccount.module.css";
import { useNavigate } from "react-router-dom";

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

         <div className={styles.topSpace}></div>
    <div className={styles.userRow}></div>
      <div className={styles.thickDivider}></div>
      <div className={styles.avatar}>
        {user?.name?.charAt(0).toUpperCase()}
      </div> 

       

       

        <div className={styles.divider} />

        <div className={styles.cardContainer}>
  <div className={styles.card}>MY ACCOUNT</div>
  <div className={styles.card}>CASHIER</div>
</div>

        <div className={styles.bottomActions}>
    <button className={styles.createBtn} onClick={() => navigate("/create-user")}>
      Create User
    </button>

    <button className={styles.logoutBtn} onClick={handleLogout}>
      Logout
    </button>
  </div>

      </div>
    </div>
  );
}

export default MyAccount;