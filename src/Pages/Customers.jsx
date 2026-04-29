import { useEffect, useState } from "react";
import styles from "./Customers.module.css";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://192.168.31.181:5000/api/customer/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          setCustomers(data.customers || []);
        } catch (e) {
          console.error("JSON PARSE ERROR:", e);
        }
      })
      .catch((err) => console.error("FETCH ERROR:", err));
  }, []);

  const maxPts = Math.max(...customers.map((c) => c.points || 0), 1);

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Directory</p>
            <h1 className={styles.title}>Customers</h1>
          </div>
          <span className={styles.countBadge}>{customers.length} members</span>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th style={{ textAlign: "right" }}>Points</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c._id} onClick={() => setSelected(c)}>
                <td className={styles.idCell}>{c._id}</td>
                <td className={styles.nameCell}>{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.email}</td>
                <td className={styles.ptsCell}>
                  {(c.points || 0).toLocaleString()}
                  <span
                    className={styles.ptsBar}
                    style={{ width: `${Math.round((c.points / maxPts) * 40)}px` }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && setSelected(null)}>
          <div className={styles.dialog}>
            <div className={styles.dialogHeader}>
              <div>
                <div className={styles.dialogName}>{selected.name}</div>
                <div className={styles.dialogId}>{selected._id}</div>
              </div>
              <button className={styles.closeBtn} onClick={() => setSelected(null)}>✕</button>
            </div>
            <hr className={styles.divider} />
            <div className={styles.dialogGrid}>
  {Object.entries(selected).map(([key, value]) => {
    if (key === "__v") return null; 

    return (
      <div key={key} className={styles.field}>
        <label>{key}</label>
        <p>
          {value === null || value === undefined || value === ""
            ? "—"
            : typeof value === "object"
            ? JSON.stringify(value)
            : value.toString()}
        </p>
      </div>
    );
  })}
</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Customers;