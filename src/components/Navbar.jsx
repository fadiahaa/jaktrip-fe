import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { isLoggedIn, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    setMenuOpen(false);

    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
        JAKWIS
      </Link>

      {/* MOBILE MENU BUTTON */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      {/* NAVIGATION */}
      <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Beranda
        </Link>

        <Link to="/recommendation" onClick={() => setMenuOpen(false)}>
          Rekomendasi
        </Link>

        {/* HANYA MUNCUL JIKA SUDAH LOGIN */}
        {isLoggedIn && (
          <Link to="/favorites" onClick={() => setMenuOpen(false)}>
            ♡ Tersimpan
          </Link>
        )}

        {/* LOGIN / LOGOUT */}
        {isLoggedIn ? (
          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link
            className="login-button"
            to="/login"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
