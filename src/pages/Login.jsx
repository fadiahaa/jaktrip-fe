import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await login(email, password);

      navigate("/");
    } catch (err) {
      console.error(err);

      const detail = err.response?.data?.detail;

      setError(
        Array.isArray(detail)
          ? detail[0]?.msg
          : detail || "Email atau password salah.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-brand">
        <div className="auth-brand-content">
          <Link to="/" className="auth-logo">
            JakTrip
          </Link>

          <div>
            <p className="auth-eyebrow">TRAVEL PLANNER</p>

            <h1>
              Your journey,
              <br />
              your way.
            </h1>

            <p>
              Temukan destinasi menarik di Jakarta dan buat perjalanan yang
              sesuai dengan preferensimu.
            </p>
          </div>

          <div className="auth-decoration">
            <span>✦</span>
            <span>✦</span>
            <span>✦</span>
          </div>
        </div>
      </section>

      <section className="auth-form-section">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <p>WELCOME BACK</p>
            <h2>Masuk ke JakTrip</h2>
            <span>
              Masuk untuk menyimpan dan mengelola itinerary perjalananmu.
            </span>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="auth-error">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Email</label>

              <input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <p className="auth-switch">
            Belum punya akun? <Link to="/register">Daftar sekarang</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
