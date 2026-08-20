import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!username || !email || !password || !confirmPassword) {
      setError("Semua field wajib diisi.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak sesuai.");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Registrasi gagal.");
      }

      setSuccess("Registrasi berhasil. Silakan login.");

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
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
        {/* LEFT */}

        <div className="auth-intro">
          <Link to="/" className="auth-logo">
            JAKWIS
          </Link>

          <div className="auth-intro-content">
            <p className="auth-label">MULAI PERJALANANMU</p>

            <h1>
              Jelajahi Jakarta
              <br />
              dengan caramu.
            </h1>

            <p>
              Buat akun JAKWIS untuk mendapatkan rekomendasi wisata dan
              menyimpan destinasi yang ingin kamu kunjungi.
            </p>
          </div>
        </div>

        {/* RIGHT */}

        <div className="auth-form-wrapper">
          <form className="auth-form" onSubmit={handleRegister}>
            <div className="auth-form-header">
              <h2>Buat Akun</h2>

              <p>Daftar untuk mulai menggunakan JAKWIS.</p>
            </div>

            {/* USERNAME */}

            <div className="form-group">
              <label htmlFor="username">Username</label>

              <input
                id="username"
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* EMAIL */}

            <div className="form-group">
              <label htmlFor="register-email">Email</label>

              <input
                id="register-email"
                type="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}

            <div className="form-group">
              <label htmlFor="register-password">Password</label>

              <input
                id="register-password"
                type="password"
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* CONFIRM PASSWORD */}

            <div className="form-group">
              <label htmlFor="confirm-password">Konfirmasi Password</label>

              <input
                id="confirm-password"
                type="password"
                placeholder="Masukkan ulang password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* ERROR */}

            {error && <div className="auth-error">{error}</div>}

            {/* SUCCESS */}

            {success && <div className="auth-success">{success}</div>}

            {/* BUTTON */}

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Mendaftarkan..." : "Daftar"}
            </button>

            {/* LOGIN */}

            <p className="auth-switch">
              Sudah punya akun? <Link to="/login">Masuk sekarang</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
