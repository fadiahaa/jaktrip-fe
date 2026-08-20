import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DestinationCard from "../components/DestinationCard";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/destinations")
      .then((response) => response.json())
      .then((data) => {
        setDestinations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <p className="hero-small">JELAJAHI JAKARTA</p>

          <h1>
            Temukan destinasi
            <br />
            yang cocok untukmu.
          </h1>

          <p>
            Masukkan preferensi wisatamu dan temukan rekomendasi destinasi
            Jakarta yang sesuai.
          </p>

          <button onClick={() => navigate("/recommendation")}>
            Cari Rekomendasi
          </button>
        </div>
      </section>

      <section className="destinations-section">
        <div className="section-header">
          <div>
            <p className="section-label">DESTINASI JAKARTA</p>

            <h2>Jelajahi berbagai destinasi</h2>
          </div>
        </div>

        {loading ? (
          <p>Memuat destinasi...</p>
        ) : (
          <div className="destination-grid">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
