import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function DetailWisata() {
  const { id } = useParams();

  const [wisata, setWisata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetailWisata = async () => {
      try {
        const response = await api.get(`/wisata/${id}`);
        setWisata(response.data);
      } catch (err) {
        console.error(err);
        setError("Gagal mengambil detail wisata.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetailWisata();
  }, [id]);

  if (loading) {
    return <p>Memuat detail wisata...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!wisata) {
    return <p>Destinasi wisata tidak ditemukan.</p>;
  }

  const imageUrl = wisata.gambar
    ? `${import.meta.env.VITE_API_URL}/uploads/wisata/${wisata.gambar}`
    : null;

  return (
    <main className="detail-page">
      <Link to="/wisata" className="detail-back">
        ← Kembali ke Destinasi
      </Link>

      <div className="detail-card">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={wisata.nama_wisata}
            className="detail-image"
          />
        )}

        <div className="detail-content">
          <p className="detail-category">{wisata.kategori}</p>

          <h1>{wisata.nama_wisata}</h1>

          <div className="detail-rating">★ {wisata.rating}</div>

          <p className="detail-location">📍 {wisata.wilayah}</p>

          <p className="detail-description">{wisata.deskripsi}</p>

          <div className="detail-info">
            <div>
              <span>Harga</span>
              <strong>
                {wisata.harga_min === wisata.harga_max
                  ? `Rp ${wisata.harga_min.toLocaleString("id-ID")}`
                  : `Rp ${wisata.harga_min.toLocaleString(
                      "id-ID",
                    )} - Rp ${wisata.harga_max.toLocaleString("id-ID")}`}
              </strong>
            </div>

            <div>
              <span>Durasi</span>
              <strong>{wisata.estimasi_durasi} menit</strong>
            </div>
          </div>

          <div className="detail-address">
            <span>Alamat</span>
            <p>{wisata.alamat}</p>
          </div>

          {wisata.link_maps && (
            <a
              href={wisata.link_maps}
              target="_blank"
              rel="noopener noreferrer"
              className="detail-map-button"
            >
              Lihat di Google Maps
            </a>
          )}
        </div>
      </div>
    </main>
  );
}

export default DetailWisata;
