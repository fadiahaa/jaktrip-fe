import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
function HasilPlanner() {
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const savedResult = sessionStorage.getItem("plannerResult");

    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }
  }, []);
  const handleSavePlanner = async () => {
    try {
      setSaving(true);
      setSaveMessage("");

      const savedInput = sessionStorage.getItem("plannerInput");

      if (!savedInput) {
        setSaveMessage("Data planner tidak ditemukan.");
        return;
      }

      const plannerInput = JSON.parse(savedInput);

      await api.post("/planner/save", plannerInput);

      setSaveMessage("Itinerary berhasil disimpan!");
    } catch (err) {
      console.error(err);

      const detail = err.response?.data?.detail;

      if (Array.isArray(detail)) {
        setSaveMessage(detail[0]?.msg || "Gagal menyimpan itinerary.");
      } else {
        setSaveMessage(detail || "Gagal menyimpan itinerary.");
      }
    } finally {
      setSaving(false);
    }
  };
  if (!result) {
    return (
      <main className="planner-result-page">
        <h1>Hasil Itinerary</h1>
        <p>Belum ada itinerary yang dibuat.</p>

        <Link to="/planner" className="planner-button-link">
          Buat Itinerary
        </Link>
      </main>
    );
  }

  const { summary, itinerary } = result;

  return (
    <main className="planner-result-page">
      <div className="result-header">
        <h1>Itinerary Kamu</h1>
        <p>
          Berikut rekomendasi destinasi berdasarkan preferensi dan budget
          perjalananmu.
        </p>
      </div>

      {/* SUMMARY */}
      <section className="result-summary">
        <div className="summary-card">
          <span>Destinasi</span>
          <strong>{summary.jumlah_destinasi}</strong>
        </div>

        <div className="summary-card">
          <span>Estimasi Total Biaya</span>
          <strong>Rp {summary.total_biaya.toLocaleString("id-ID")}</strong>
        </div>

        <div className="summary-card">
          <span>Estimasi Total Durasi</span>
          <strong>{summary.total_durasi} menit</strong>
        </div>

        <div className="summary-card">
          <span>Estimasi Total Jarak</span>
          <strong>{summary.total_jarak_km} km</strong>
        </div>
      </section>

      {/* ITINERARY */}
      <section className="itinerary-section">
        <h2>Destinasi yang Direkomendasikan</h2>

        {itinerary.length === 0 ? (
          <p>
            Tidak ditemukan destinasi yang sesuai dengan preferensi dan budget.
          </p>
        ) : (
          <div className="itinerary-list">
            {itinerary.map((item, index) => {
              const imageUrl = `http://127.0.0.1:8000/uploads/wisata/${getImageName(
                item.id_wisata,
              )}`;

              return (
                <div className="itinerary-card" key={item.id_wisata}>
                  <div className="itinerary-number">{index + 1}</div>

                  <img
                    src={imageUrl}
                    alt={item.nama_wisata}
                    className="itinerary-image"
                  />

                  <div className="itinerary-content">
                    <p className="itinerary-category">{item.kategori}</p>

                    <h3>{item.nama_wisata}</h3>

                    <div className="itinerary-details">
                      <span>
                        💰 Rp {item.harga_min.toLocaleString("id-ID")}
                      </span>

                      <span>⏱ {item.estimasi_durasi} menit</span>

                      <span>⭐ {(item.similarity * 100).toFixed(1)}%</span>
                    </div>

                    <Link
                      to={`/wisata/${item.id_wisata}`}
                      className="detail-link"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <div className="result-actions">
        <button
          className="save-planner-button"
          onClick={handleSavePlanner}
          disabled={saving}
        >
          {saving ? "Menyimpan..." : "Simpan Itinerary"}
        </button>

        <Link to="/planner" className="secondary-button">
          Buat Ulang
        </Link>

        <Link to="/wisata" className="secondary-button">
          Lihat Semua Destinasi
        </Link>
      </div>

      {saveMessage && <p className="save-message">{saveMessage}</p>}
    </main>
  );
}

function getImageName(id) {
  const images = {
    1: "monumen-selamat-datang.jpg",
    2: "taman-fatahillah.jpg",
    3: "museum-sejarah-jakarta.jpg",
    4: "taman-proklamator.jpg",
    5: "kota-tua-jakarta.jpg",
    6: "museum-taman-prasasti.jpg",
    7: "monumen-nasiaonal.jpg",
    8: "tugu-tani.jpg",
    9: "museum-sumpah-pemuda.jpg",
    10: "museum-nasional-indonesia.jpg",
    11: "bundaran-hi.jpg",
    12: "cagar-budaya-galian-abadi-cikini.jpg",
    13: "lapangan-banteng.jpg",
    14: "tugu -harmoni- jakarta.jpg",
    15: "taman-wisata-alam-angke.jpg",
    16: "taman-mini-indonesia-indah.jpg",
    17: "taman-suropati.jfif",
    18: "suaka-margasatwa-muara-angke.jpg",
    19: "taman-anggrek-indonesia-permai.jpg",
    20: "ancol-taman-impian.jpg",
    21: "taman-menteng.jpeg",
    22: "taman-kota-cattleya.jpg",
    23: "jakarta-bird-land.jpg",
    24: "taman-mataram.jpg",
    25: "tebet-eco-park.jpeg",
    26: "taman-hutan-kota-penjaringan.jpg",
    27: "Habitat_Park.jpeg",
    28: "jakarta-aquarium-safari.jpg",
    29: "archipelago-conversation-park.jpeg",
    30: "allianz-eco-park.jpeg",
    31: "Taman-Margasatwa-Ragunan.jpg",
    32: "taman-hutan-kota-tebet.jpeg",
    33: "hause-rooftop-setiabudi.jpg",
    34: "dancing-fountain-show-grand-indonesia.jpg",
    35: "jtown-food-and-entertaiment-center.jpg",
    36: "kidzania-jakarta.jpg",
    37: "galeri-indonesia-kaya.jpeg",
    38: "eden-bar-jakarta.jpeg",
    39: "the-awan-lounge.jpg",
    40: "cove-batavia-pik.jpg",
    41: "cosmo-pony.jpg",
    42: "dufan-ancol.jpeg",
    43: "creative-zone-riverview-by-jxb.jpg",
    44: "mo-bar.jpg",
    45: "henshin.jpg",
    46: "social-house-grand-indonesia.jpg",
    47: "sem aja-menteng.jpg",
    48: "cloud-lounge-jakarta-rofftop.jpg",
    49: "bel-etage.jpg",
    50: "plantaran-menteng.jpg",
    51: "the-nineteen-jakarta.jpg",
    52: "bastian-jakarta.jpg",
    53: "social-garden.jpg",
    54: "yialos-taverna-menteng.jpg",
    55: "the-royal-kitchen-signature.jpg",
    56: "casa-cuomo-ristorante-lounge.jpg",
    57: "bluegrass-bar-grill.jpg",
    58: "august-jakarta.jpeg",
    59: "casa-alba-ristorante.jpg",
    60: "kaum-jakarta.jpg",
    61: "erre-urrechu-jakarta.jpg",
    62: "signatures-restaurant.jpg",
    63: "east-quarter-grand-indonesia.jpg",
    64: "holeo-golf-museum.jpg",
    65: "museum-macan.jpg",
    66: "magic-art-3D-museum-jakarta.jpg",
    67: "moja-museum.jpg",
    68: "galeri-nasional-indonesia.jpg",
    69: "museum-satria-mandala.jpg",
    70: "museum-mandiri.jpg",
    71: "museum-perjuangan-indonesia-lippo-mall-nusantara.jpeg",
    72: "museum-wayang.jpg",
    73: "museum-basoeki-abdullah.jpg",
    74: "art1-new-museum.jpg",
    75: "museum-di-tengah-kebun.jpg",
    76: "museum-tekstil.jpg",
    77: "museum-bank-indonesia.jpg",
    78: "museum-kebangkitan-nasional.jpg",
    79: "museum-bahari-jakarta.jpg",
    80: "gedung-arsip-nasional-republik-indonesia.jpeg",
    81: "perkampungan-budaya-betawi-setu-babakan.jpg",
    82: "gedung-kesenian-jakarta.jpg",
    83: "rumah-si-pitung.jpg",
    84: "pusat-perfilman-H.Usmar Ismail.jpg",
    85: "bentara-budaya-jakarta.jpg",
    86: "taman-benyamin-suaeb.jpg",
    87: "balai-budaya-jakarta.jpg",
    88: "pasar-seni-ancol.jpg",
    89: "masjid-istiqlal.jpg",
    90: "gereja-katedral-jakarta.jpg",
    91: "masjid-ramlie-musofa.jpg",
    92: "masjid-luar-batang.jpg",
    93: "gereja-sion.jpg",
    94: "vihara-dharma-bhakti-(kim tek le).jpg",
    95: "klenteng-toa-se-bio.jpg",
    96: "masjid-agung-al-azhar.jpg",
    97: "gpib-immanuel-jakarta.jpg",
    98: "gereja-santa-theresia-menteng.jpg",
  };

  return images[id];
}

export default HasilPlanner;
