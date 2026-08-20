import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DestinationCard from "../components/DestinationCard";
import { useAuth } from "../contexts/AuthContext";

function Favorites() {
  const { token, isLoggedIn } = useAuth();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn || !token) {
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.detail || "Gagal mengambil destinasi tersimpan.",
          );
        }

        setFavorites(data.favorites || []);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [isLoggedIn, token]);

  return (
    <div>
      <Navbar />

      <main className="favorites-page">
        <div className="favorites-header">
          <p className="section-label">DESTINASI TERSIMPAN</p>

          <h1>Wisata Favoritmu</h1>

          <p>Destinasi yang kamu simpan akan muncul di halaman ini.</p>
        </div>

        {loading && (
          <div className="recommendation-loading">
            <div className="loading-spinner"></div>

            <p>Memuat destinasi tersimpan...</p>
          </div>
        )}

        {!loading && error && (
          <div className="no-result">
            <h3>Gagal memuat favorite</h3>

            <p>{error}</p>
          </div>
        )}

        {!loading && !error && favorites.length > 0 && (
          <div className="destination-grid">
            {favorites.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        )}

        {!loading && !error && favorites.length === 0 && (
          <div className="empty-favorites">
            <div className="empty-heart">♡</div>

            <h3>Belum ada destinasi tersimpan</h3>

            <p>
              Temukan destinasi yang menarik dan simpan untuk dikunjungi nanti.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Favorites;
