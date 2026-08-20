import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/destination-detail.css";

function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/destinations/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Destinasi tidak ditemukan");
        }

        return response.json();
      })
      .then((data) => {
        setDestination(data.destination);
      })
      .catch((error) => {
        console.error("Gagal mengambil detail:", error);
        setError("Destinasi tidak ditemukan.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="detail-state">
        <p>Memuat detail destinasi...</p>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="detail-state">
        <p>{error || "Destinasi tidak ditemukan."}</p>

        <button onClick={() => navigate("/")}>Kembali ke Beranda</button>
      </div>
    );
  }

  const imageUrl = `${import.meta.env.VITE_API_URL}${destination.image}`;

  return (
    <main className="destination-detail-page">
      <div className="detail-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Kembali
        </button>

        <div className="detail-card">
          <div className="detail-image-wrapper">
            <img
              src={imageUrl}
              alt={destination.place_name}
              className="detail-image"
            />
          </div>

          <div className="detail-content">
            <span className="detail-category">{destination.category}</span>

            <h1>{destination.place_name}</h1>

            <div className="detail-info">
              <span>📍 {destination.city}</span>

              <span>
                ⭐{" "}
                {destination.rating !== null
                  ? destination.rating.toFixed(1)
                  : "-"}
              </span>

              <span>
                💰{" "}
                {destination.price === 0
                  ? "Gratis"
                  : `Rp ${destination.price.toLocaleString("id-ID")}`}
              </span>
            </div>

            <div className="detail-description">
              <h2>Tentang Destinasi</h2>

              <p>{destination.description}</p>
            </div>

            {isLoggedIn && (
              <button
                className="detail-favorite-button"
                onClick={() => {
                  // nanti kita sambungkan ke endpoint favorite
                }}
              >
                ♡ Simpan Destinasi
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default DestinationDetail;
