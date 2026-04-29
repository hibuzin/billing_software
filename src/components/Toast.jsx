function Toast({ message, type }) {
  if (!message) return null;

  const style = {
    position: "fixed",
    top: "20px",
left: "50%",
transform: "translateX(-50%)",
    padding: "12px 18px",
    borderRadius: "8px",
    color: "white",
    fontSize: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    backgroundColor: type === "success" ? "#16a34a" : "#ef4444",
    animation: "fadeIn 0.3s ease",
  };

  return <div style={style}>{message}</div>;
}

export default Toast;