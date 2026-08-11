import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav>
      <h2>StockHQ</h2>
      <Link to="/products">Products</Link>
      {" | "}
      <Link to="/categories">Categories</Link>
      {" | "}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
