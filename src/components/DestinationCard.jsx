import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function DestinationCard({ destination }) {
  const { isLoggedIn, token } = useAuth();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const baseUrl = import.meta.env.VITE_API_URL;

  const imageUrl = destination.image?.startsWith("/")
    ? `${baseUrl}${destination.image}`
    : `${baseUrl}/images/${destination.image}`;

  // Cek apakah destinasi sudah tersimpan
  useEffect(() => {
    if (!isLoggedIn || !token) {
      setSaved(false);
      return;
    }

    const checkFavorite = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/favorites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        const exists = (data.favorites || []).some(
          (favorite) => favorite.id === destination.id,
        );

        setSaved(exists);
      } catch (error) {
        console.error("Gagal mengecek favorite:", error);
      }
    };

    checkFavorite();
  }, [isLoggedIn, token, destination.id]);

  // Simpan / hapus favorite
  const handleFavorite = async () => {
    if (!isLoggedIn) {
      alert("Silakan login terlebih dahulu.");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      // =========================
      // HAPUS FAVORITE
      // =========================

      if (saved) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/favorites/${destination.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Gagal menghapus destinasi.");
        }

        setSaved(false);
      }

      // =========================
      // TAMBAH FAVORITE
      // =========================
      else {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/favorites`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              destination_id: destination.id,
            }),
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Gagal menyimpan destinasi.");
        }

        setSaved(true);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="destination-card">
      <div className="destination-image-wrapper">
        <img
          src={imageUrl}
          alt={destination.place_name}
          className="destination-image"
        />

        {isLoggedIn && (
          <button
            type="button"
            className={`favorite-button ${saved ? "saved" : ""}`}
            onClick={handleFavorite}
            disabled={loading}
            aria-label={saved ? "Hapus dari favorit" : "Simpan destinasi"}
          >
            {saved ? "♥" : "♡"}
          </button>
        )}
      </div>

      <div className="destination-content">
        <span className="destination-category">{destination.category}</span>

        <h3>{destination.place_name}</h3>

        <p className="destination-description">{destination.description}</p>

        <div className="destination-info">
          <span>⭐ {destination.rating}</span>

          <span>
            {destination.price === 0
              ? "Gratis"
              : `Rp ${Number(destination.price).toLocaleString("id-ID")}`}
          </span>
        </div>

        <button
          type="button"
          className="detail-button"
          onClick={() => navigate(`/destinations/${destination.id}`)}
        >
          Lihat Detail
          <span>→</span>
        </button>
      </div>
    </div>
  );
}

export default DestinationCard;
