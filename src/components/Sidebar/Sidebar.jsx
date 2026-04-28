import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);

  const menu = [
    { name: "HOME", path: "/home" },
    { name: "CUSTOMERS", path: "/customers" },
    { name: "PRODUCTS", path: "/products" },

    {
      name: "SALES",
      children: [
        { name: "Today Sale", path: "/sales/today" },
        { name: "Week Sale", path: "/sales/week" },
        { name: "Monthly Sale", path: "/sales/month" },
      ],
    },

    {
      name: "PAYMENT",
      children: [
        { name: "Cash", path: "/payment/cash" },
        { name: "Online", path: "/payment/online" },
        { name: "Pending", path: "/payment/pending" },
      ],
    },

    {
      name: "STOCKS",
      children: [
        { name: "Available", path: "/stocks/available" },
        { name: "Low Stock", path: "/stocks/low" },
        { name: "Out of Stock", path: "/stocks/out" },
      ],
    },

    { name: "GST", path: "/gst" },
    { name: "ANALYTICS", path: "/analytics" },
    { name: "OFFERS", path: "/offers" },
  ];

  return (
    <div className={styles.sidebar}>
      <ul className={styles.menu}>

        {menu.map((item, index) => (
          <div key={index}>

            {/* MAIN ITEM */}
            <li
              className={styles.item}
              onClick={() =>
                item.children
                  ? setOpenMenu(openMenu === index ? null : index)
                  : navigate(item.path)
              }
            >
              {item.name}
            </li>

    <div className={styles.divider}></div>

            {/* SUB MENU */}
            {item.children && openMenu === index && (
              <div className={styles.subMenu}>
                {item.children.map((sub, i) => (
                  <li
                    key={i}
                    className={styles.subItem}
                    onClick={() => navigate(sub.path)}
                  >
                    {sub.name}
                  </li>
                ))}
              </div>
            )}

          </div>
        ))}

      </ul>
    </div>
  );
}

export default Sidebar;