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
      <div className="nav-links">
        <Link className="nav-link" to="/products">
          Products
        </Link>
        <Link className="nav-link" to="/categories">
          Categories
        </Link>
        <button className="nav-link" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
