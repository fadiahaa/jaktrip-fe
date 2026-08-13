import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get("/planner/history");
        const sortedHistory = [...response.data].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );

        setHistory(sortedHistory);
      } catch (err) {
        console.error(err);

        const detail = err.response?.data?.detail;

        setError(
          Array.isArray(detail)
            ? detail[0]?.msg
            : detail || "Gagal mengambil riwayat perjalanan.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);
  const handleDelete = async (plannerId) => {
    const confirmDelete = window.confirm(
      "Apakah kamu yakin ingin menghapus itinerary ini?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/planner/${plannerId}`);

      setHistory((prev) =>
        prev.filter((item) => item.id_planner !== plannerId),
      );
    } catch (err) {
      console.error(err);

      const detail = err.response?.data?.detail;

      alert(
        Array.isArray(detail)
          ? detail[0]?.msg
          : detail || "Gagal menghapus itinerary.",
      );
    }
  };
  if (loading) {
    return (
      <main className="history-page">
        <p>Memuat riwayat perjalanan...</p>
      </main>
    );
  }

  return (
    <main className="history-page">
      <div className="history-header">
        <p>PERJALANANMU</p>
        <h1>Riwayat Perjalanan</h1>
        <span>Lihat kembali itinerary yang pernah kamu simpan.</span>
      </div>

      {error && <div className="history-error">{error}</div>}

      {!error && history.length === 0 && (
        <div className="history-empty">
          <h2>Belum ada perjalanan</h2>
          <p>Kamu belum menyimpan itinerary perjalanan.</p>

          <Link to="/planner" className="history-button">
            Buat Itinerary
          </Link>
        </div>
      )}

      {history.length > 0 && (
        <div className="history-list">
          {history.map((item) => (
            <div className="history-card" key={item.id_planner}>
              <div className="history-card-top">
                <div>
                  <p className="history-label">ITINERARY</p>

                  <h2>Perjalanan {item.preferensi}</h2>
                </div>

                <span className="history-date">
                  {new Date(item.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="history-preference">
                <span>Preferensi</span>
                <strong>{item.preferensi}</strong>
              </div>

              <div className="history-info">
                <div>
                  <span>Budget</span>
                  <strong>Rp {item.budget.toLocaleString("id-ID")}</strong>
                </div>

                <div>
                  <span>Orang</span>
                  <strong>{item.jumlah_orang}</strong>
                </div>

                <div>
                  <span>Durasi</span>
                  <strong>{item.durasi_jam} jam</strong>
                </div>

                <div>
                  <span>Destinasi</span>
                  <strong>{item.jumlah_destinasi}</strong>
                </div>
              </div>

              <div className="history-summary">
                <div>
                  <span>Total biaya</span>
                  <strong>Rp {item.total_biaya.toLocaleString("id-ID")}</strong>
                </div>

                <div>
                  <span>Sisa budget</span>
                  <strong>Rp {item.sisa_budget.toLocaleString("id-ID")}</strong>
                </div>

                <div>
                  <span>Total durasi</span>
                  <strong>{item.total_durasi} menit</strong>
                </div>

                <div>
                  <span>Total jarak</span>
                  <strong>{item.total_jarak} km</strong>
                </div>
              </div>

              <div className="history-card-actions">
                <Link
                  to={`/history/${item.id_planner}`}
                  className="history-detail-button"
                >
                  Lihat Itinerary →
                </Link>

                <button
                  className="history-delete-button"
                  onClick={() => handleDelete(item.id_planner)}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default History;
