import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Email atau password salah.");
      }

      login(data.access_token, data.user);

      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* LEFT SIDE */}

        <div className="auth-intro">
          <Link to="/" className="auth-logo">
            JAKWIS
          </Link>

          <div className="auth-intro-content">
            <p className="auth-label">SELAMAT DATANG KEMBALI</p>

            <h1>
              Temukan perjalanan
              <br />
              wisata terbaikmu.
            </h1>

            <p>
              Masuk ke akun JAKWIS untuk menyimpan destinasi favorit dan
              mendapatkan rekomendasi wisata yang sesuai denganmu.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="auth-form-wrapper">
          <form className="auth-form" onSubmit={handleLogin}>
            <div className="auth-form-header">
              <h2>Masuk ke JAKWIS</h2>

              <p>Silakan masuk menggunakan akunmu.</p>
            </div>

            {/* EMAIL */}

            <div className="form-group">
              <label htmlFor="email">Email</label>

              <input
                id="email"
                type="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}

            <div className="form-group">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* ERROR */}

            {error && <div className="auth-error">{error}</div>}

            {/* BUTTON */}

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Memproses..." : "Masuk"}
            </button>

            {/* REGISTER */}

            <p className="auth-switch">
              Belum punya akun? <Link to="/register">Daftar sekarang</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
