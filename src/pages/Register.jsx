import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await api.post("/auth/register", {
        nama,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      console.error(err);

      const detail = err.response?.data?.detail;

      setError(
        Array.isArray(detail) ? detail[0]?.msg : detail || "Registrasi gagal.",
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
            <p className="auth-eyebrow">START YOUR JOURNEY</p>

            <h1>
              Plan less,
              <br />
              explore more.
            </h1>

            <p>
              Buat akun JakTrip dan mulai susun perjalanan wisata Jakarta sesuai
              kebutuhanmu.
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
            <p>CREATE ACCOUNT</p>
            <h2>Buat akun JakTrip</h2>
            <span>
              Daftar untuk menyimpan itinerary perjalanan dan mengakses riwayat
              perjalananmu.
            </span>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="auth-error">{error}</div>}

            <div className="form-group">
              <label htmlFor="nama">Nama</label>

              <input
                id="nama"
                type="text"
                placeholder="Nama lengkap"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </div>

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
                placeholder="Buat password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Membuat akun..." : "Daftar"}
            </button>
          </form>

          <p className="auth-switch">
            Sudah punya akun? <Link to="/login">Masuk sekarang</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;
