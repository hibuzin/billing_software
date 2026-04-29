import AppBar from "./components/AppBar/AppBar";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/MyAccount/Login";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Payment from "./pages/Payment";
import Stocks from "./pages/Stocks";
import GST from "./pages/GST";
import Analytics from "./pages/Analytics";
import Offers from "./pages/Offers";
import Home from "./pages/Home";
import CreateUser from "./components/MyAccount/CreateUser";
import Cashier from "./components/Cashier";
import MyAccount from "./components/MyAccount/MyAccount";
import Toast from "./components/Toast";

function MainLayout() {
  return (
    <>
      <AppBar />
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Customers />} />
          <Route path="/home" element={<Home />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/gst" element={<GST />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/cashier" element={<Cashier />} />
        </Routes>
        
      </div>
    </>
  );
}

function AppRoutes() {
  const location = useLocation();

  if (location.pathname === "/login") {
    return <Login />;
  }

  if (location.pathname === "/create-user") {
    return <CreateUser />;
  }

  if (location.pathname === "/cashier") {
    return <Cashier />;
  }

  return <MainLayout />; 
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;