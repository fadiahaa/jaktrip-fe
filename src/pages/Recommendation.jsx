import { useState } from "react";
import Navbar from "../components/Navbar";
import DestinationCard from "../components/DestinationCard";

function Recommendation() {
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleRecommend = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Silakan masukkan preferensi wisata terlebih dahulu.");
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal mendapatkan rekomendasi.");
      }

      const data = await response.json();

      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error(error);

      setError("Terjadi kesalahan saat mengambil rekomendasi.");

      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recommendation-page">
      <Navbar />

      {/* =========================
          HEADER
      ========================= */}

      <section className="recommendation-hero">
        <div className="recommendation-hero-content">
          <p className="hero-small">JAKWIS RECOMMENDATION</p>

          <h1>
            Temukan wisata
            <br />
            yang sesuai denganmu.
          </h1>

          <p>
            Ceritakan wisata seperti apa yang kamu inginkan. JAKWIS akan
            memberikan rekomendasi destinasi yang paling sesuai dengan
            preferensimu.
          </p>
        </div>
      </section>

      {/* =========================
          SEARCH
      ========================= */}

      <section className="recommendation-section">
        <div className="recommendation-box">
          <form onSubmit={handleRecommend}>
            <label htmlFor="query">Kamu ingin wisata seperti apa?</label>

            <div className="recommendation-input-wrapper">
              <input
                id="query"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Contoh: "wisata air untuk berenang"'
              />

              <button type="submit">
                {loading ? "Mencari..." : "Cari Rekomendasi"}
              </button>
            </div>

            {error && <p className="recommendation-error">{error}</p>}
          </form>

          <div className="recommendation-examples">
            <span>Coba:</span>

            <button
              type="button"
              onClick={() => setQuery("wisata air untuk berenang")}
            >
              Wisata air
            </button>

            <button
              type="button"
              onClick={() => setQuery("wisata budaya dan sejarah")}
            >
              Budaya & sejarah
            </button>

            <button
              type="button"
              onClick={() => setQuery("tempat wisata untuk keluarga")}
            >
              Wisata keluarga
            </button>

            <button
              type="button"
              onClick={() => setQuery("tempat untuk belanja")}
            >
              Belanja
            </button>
          </div>
        </div>

        {/* =========================
            RESULTS
        ========================= */}

        {loading && (
          <div className="recommendation-loading">
            <div className="loading-spinner"></div>
            <p>Sedang mencari destinasi yang cocok...</p>
          </div>
        )}

        {!loading && searched && recommendations.length > 0 && (
          <div className="recommendation-results">
            <div className="results-header">
              <div>
                <p className="section-label">HASIL REKOMENDASI</p>

                <h2>Destinasi yang cocok untukmu</h2>
              </div>

              <span className="result-count">
                {recommendations.length} destinasi
              </span>
            </div>

            <div className="destination-grid">
              {recommendations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && searched && recommendations.length === 0 && !error && (
          <div className="no-result">
            <h3>Belum menemukan rekomendasi</h3>

            <p>
              Coba gunakan kata-kata lain untuk menjelaskan wisata yang kamu
              inginkan.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Recommendation;
