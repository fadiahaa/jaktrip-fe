import { Link } from "react-router-dom";
import Chatbot from "../components/Chatbot";
function Home() {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-label">JAKTRIP TRAVEL PLANNER</p>

          <h1>
            Rencanakan Perjalananmu
            <br />
            di Jakarta
          </h1>

          <p className="hero-description">
            Temukan destinasi wisata yang sesuai dengan preferensimu dan susun
            itinerary perjalanan dengan lebih mudah.
          </p>

          <div className="hero-actions">
            <Link to="/planner" className="hero-button">
              Buat Itinerary
            </Link>

            <Link to="/wisata" className="hero-button-secondary">
              Jelajahi Destinasi
            </Link>
          </div>
        </div>

        <div className="hero-decoration">
          <div className="hero-circle">
            <span>JKT</span>
          </div>
        </div>
      </section>

      <section className="home-features">
        <div className="home-section-header">
          <p>FITUR JAKTRIP</p>
          <h2>Perjalanan lebih mudah</h2>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">01</div>
            <h3>Rekomendasi Wisata</h3>
            <p>
              Dapatkan rekomendasi destinasi berdasarkan preferensi
              perjalananmu.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">02</div>
            <h3>Travel Planner</h3>
            <p>
              Susun rencana perjalanan berdasarkan budget, durasi, dan jumlah
              destinasi.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">03</div>
            <h3>AI Travel Assistant</h3>
            <p>
              Dapatkan bantuan informasi wisata melalui asisten perjalanan
              berbasis AI.
            </p>
          </div>
        </div>
      </section>
      <Chatbot />
    </main>
  );
}

export default Home;
