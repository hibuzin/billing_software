import styles from "./AppBar.module.css";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";   
import MyAccount from "../MyAccount/MyAccount";

function AppBar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <>
    <div className={styles.appbar}>
      <div className={styles.left}>
      <h2>Admin Account</h2>  
      </div>


      <div className={styles.right}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.search}
        />

        <FiUser
  className={styles.icon}
  onClick={() => setOpen(prev => !prev)}
/>
      </div>
    </div>
    {open && <MyAccount onClose={() => setOpen(false)} />}
    </>
  );
}

export default AppBar;