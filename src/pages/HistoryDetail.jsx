import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function HistoryDetail() {
  const { id } = useParams();

  const [planner, setPlanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlannerDetail = async () => {
      try {
        const response = await api.get(`/planner/${id}`);
        setPlanner(response.data);
      } catch (err) {
        console.error(err);

        const detail = err.response?.data?.detail;

        setError(
          Array.isArray(detail)
            ? detail[0]?.msg
            : detail || "Gagal mengambil detail perjalanan.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlannerDetail();
  }, [id]);

  if (loading) {
    return (
      <main className="history-page">
        <p>Memuat detail perjalanan...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="history-page">
        <div className="history-error">{error}</div>

        <Link to="/history" className="history-button">
          Kembali ke Riwayat
        </Link>
      </main>
    );
  }

  if (!planner) {
    return null;
  }

  const { summary, itinerary } = planner;

  return (
    <main className="history-detail-page">
      <Link to="/history" className="history-back">
        ← Kembali ke Riwayat
      </Link>

      <div className="history-detail-header">
        <p>DETAIL PERJALANAN</p>

        <h1>Itinerary Perjalanan</h1>

        <span>
          Preferensi: <strong>{summary.preferensi}</strong>
        </span>
      </div>

      {/* SUMMARY */}

      <section className="detail-summary">
        <div>
          <span>Budget</span>
          <strong>Rp {summary.budget.toLocaleString("id-ID")}</strong>
        </div>

        <div>
          <span>Jumlah Orang</span>
          <strong>{summary.jumlah_orang} orang</strong>
        </div>

        <div>
          <span>Durasi Perjalanan</span>
          <strong>{summary.durasi_jam} jam</strong>
        </div>

        <div>
          <span>Jumlah Destinasi</span>
          <strong>{summary.jumlah_destinasi}</strong>
        </div>

        <div>
          <span>Total Biaya</span>
          <strong>Rp {summary.total_biaya.toLocaleString("id-ID")}</strong>
        </div>

        <div>
          <span>Sisa Budget</span>
          <strong>Rp {summary.sisa_budget.toLocaleString("id-ID")}</strong>
        </div>

        <div>
          <span>Total Durasi</span>
          <strong>{summary.total_durasi} menit</strong>
        </div>

        <div>
          <span>Total Jarak</span>
          <strong>{summary.total_jarak} km</strong>
        </div>
      </section>

      {/* ITINERARY */}

      <section className="saved-itinerary">
        <h2>Itinerary</h2>

        <div className="saved-itinerary-list">
          {itinerary.map((item) => (
            <div className="saved-itinerary-card" key={item.id_wisata}>
              <div className="saved-number">{item.urutan}</div>

              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/wisata/${item.gambar}`}
                alt={item.nama_wisata}
              />

              <div className="saved-content">
                <p>{item.kategori}</p>

                <h3>{item.nama_wisata}</h3>

                <div className="saved-info">
                  <span>
                    {item.harga_min === 0
                      ? "💰 Gratis"
                      : `💰 Rp ${item.harga_min.toLocaleString("id-ID")}`}
                  </span>

                  <span>⏱ {item.estimasi_durasi} menit</span>

                  <span>
                    {item.rating > 0
                      ? `⭐ ${item.rating}`
                      : "⭐ Belum diketahui"}
                  </span>
                </div>

                <p className="saved-address">📍 {item.alamat}</p>

                <Link
                  to={`/wisata/${item.id_wisata}`}
                  className="saved-detail-link"
                >
                  Lihat Detail Wisata →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default HistoryDetail;