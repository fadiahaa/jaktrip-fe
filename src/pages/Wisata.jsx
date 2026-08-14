import { useEffect, useState } from "react";
import api from "../services/api";
import WisataCard from "../components/WisataCard";

function Wisata() {
  const [wisata, setWisata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchWisata = async () => {
      try {
        const response = await api.get("/wisata");

        console.log("DATA DARI API:", response.data);

        setWisata(response.data);
      } catch (err) {
        console.error(err);
        setError("Gagal mengambil data wisata.");
      } finally {
        setLoading(false);
      }
    };

    fetchWisata();
  }, []);

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(wisata.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentWisata = wisata.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <main className="wisata-loading-page">
        <div className="wisata-loader">
          <div className="loader-spinner"></div>

          <h3>Memuat destinasi wisata</h3>

          <p>Mohon tunggu sebentar...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="wisata-page">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="wisata-page">
      <div className="wisata-header">
        <div>
          <h1>Destinasi Wisata Jakarta</h1>

          <p>Temukan berbagai destinasi wisata menarik di Jakarta.</p>
        </div>

        <div className="wisata-count">
          <strong>{wisata.length}</strong>
          <span>Destinasi</span>
        </div>
      </div>

      {wisata.length === 0 ? (
        <div className="wisata-empty">
          <p>Belum ada data wisata.</p>
        </div>
      ) : (
        <>
          <div className="wisata-grid">
            {currentWisata.map((item) => (
              <WisataCard key={item.id_wisata} wisata={item} />
            ))}
          </div>

          {/* INFO */}

          <div className="pagination-info">
            Menampilkan <strong>{startIndex + 1}</strong>
            {" – "}
            <strong>
              {Math.min(startIndex + itemsPerPage, wisata.length)}
            </strong>{" "}
            dari <strong>{wisata.length}</strong> destinasi
          </div>

          {/* PAGINATION */}

          <div className="pagination">
            <button
              className="pagination-arrow"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  className={`pagination-number ${
                    currentPage === page ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ),
            )}

            <button
              className="pagination-arrow"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              →
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Wisata;
