import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Planner() {
  const navigate = useNavigate();

  const [preferensi, setPreferensi] = useState("");
  const [budget, setBudget] = useState("");
  const [jumlahOrang, setJumlahOrang] = useState("");
  const [jumlahDestinasi, setJumlahDestinasi] = useState("");

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [lokasiAktif, setLokasiAktif] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLocation = () => {
    if (!navigator.geolocation) {
      setError("Browser tidak mendukung fitur lokasi.");
      return;
    }

    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLokasiAktif(true);
      },
      () => {
        setLatitude(0);
        setLongitude(0);
        setLokasiAktif(false);
        setError("Lokasi tidak dapat diakses. Pastikan izin lokasi diberikan.");
      },
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/recommend", {
        preferensi,
        budget: Number(budget),
        jumlah_orang: Number(jumlahOrang),
        jumlah_destinasi: Number(jumlahDestinasi),
        latitude,
        longitude,
      });

      sessionStorage.setItem("plannerResult", JSON.stringify(response.data));
      sessionStorage.setItem(
        "plannerInput",
        JSON.stringify({
          preferensi,
          budget: Number(budget),
          jumlah_orang: Number(jumlahOrang),
          jumlah_destinasi: Number(jumlahDestinasi),
          latitude,
          longitude,
        }),
      );
      navigate("/planner/hasil");
    } catch (err) {
      console.error(err);

      const detail = err.response?.data?.detail;

      if (Array.isArray(detail)) {
        setError(detail[0]?.msg || "Data yang dimasukkan tidak valid.");
      } else {
        setError(detail || "Gagal mendapatkan rekomendasi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="planner-page">
      <div className="planner-header">
        <h1>Travel Planner</h1>

        <p>
          Tentukan preferensi perjalananmu dan buat itinerary wisata di Jakarta.
        </p>
      </div>

      <form className="planner-form" onSubmit={handleSubmit}>
        {/* Preferensi */}
        <div className="form-group">
          <label htmlFor="preferensi">Ceritakan Keinginan Perjalananmu</label>

          <textarea
            id="preferensi"
            value={preferensi}
            onChange={(e) => setPreferensi(e.target.value)}
            placeholder="Contoh: Saya ingin jalan-jalan santai, mencoba makanan enak, dan mengunjungi tempat yang bagus untuk berfoto."
            rows="4"
            required
          />
        </div>

        {/* Budget */}
        <div className="form-group">
          <label htmlFor="budget">Budget Perjalanan</label>

          <input
            id="budget"
            type="number"
            min="0"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Contoh: 200000"
            required
          />
        </div>

        {/* Jumlah orang */}
        <div className="form-group">
          <label htmlFor="jumlahOrang">Jumlah Orang</label>

          <input
            id="jumlahOrang"
            type="number"
            min="1"
            value={jumlahOrang}
            onChange={(e) => setJumlahOrang(e.target.value)}
            placeholder="Contoh: 2"
            required
          />
        </div>

        {/* Jumlah destinasi */}
        <div className="form-group">
          <label htmlFor="jumlahDestinasi">Jumlah Destinasi</label>

          <input
            id="jumlahDestinasi"
            type="number"
            min="1"
            max="10"
            value={jumlahDestinasi}
            onChange={(e) => setJumlahDestinasi(e.target.value)}
            placeholder="Contoh: 3"
            required
          />
        </div>

        {/* Lokasi */}
        <div className="location-section">
          <label>Lokasi Saat Ini</label>

          <button
            type="button"
            className="location-button"
            onClick={handleLocation}
          >
            {lokasiAktif
              ? "✓ Lokasi Berhasil Didapatkan"
              : "Gunakan Lokasi Saya"}
          </button>

          {lokasiAktif && (
            <p className="location-status">
              Lokasi digunakan untuk membantu menentukan rekomendasi destinasi.
            </p>
          )}
        </div>

        {/* Error */}
        {error && <p className="planner-error">{error}</p>}

        {/* Submit */}
        <button type="submit" className="planner-button" disabled={loading}>
          {loading ? "Menyusun Itinerary..." : "Buat Itinerary"}
        </button>
      </form>
    </main>
  );
}

export default Planner;
