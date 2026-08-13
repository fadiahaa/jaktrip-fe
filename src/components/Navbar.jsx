import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          JakTrip
        </Link>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/wisata" onClick={closeMenu}>
            Destinasi
          </Link>

          <Link to="/planner" onClick={closeMenu}>
            Travel Planner
          </Link>

          {user && (
            <Link to="/history" onClick={closeMenu}>
              Riwayat
            </Link>
          )}

          {user ? (
            <div className="navbar-user">
              <span>{user.nama || user.email}</span>

              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" onClick={closeMenu}>
                Login
              </Link>

              <Link
                to="/register"
                className="navbar-register"
                onClick={closeMenu}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
