import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  function handleLogout() {
    localStorage.removeItem("token");
  }
  return (
    <BrowserRouter>
      <nav>
        <Link to="/login">Login</Link>
        {" | "}
        <Link to="/products">Products</Link>
        {" | "}
        <Link to="/categories">Categories</Link>
        {" | "}
        <button onClick={handleLogout}>Logout</button>
      </nav>

      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
