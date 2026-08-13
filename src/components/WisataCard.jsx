import { Link } from "react-router-dom";

function WisataCard({ wisata }) {
  const imageUrl = wisata.gambar
    ? `http://127.0.0.1:8000/uploads/wisata/${wisata.gambar}`
    : null;

  return (
    <div className="wisata-card">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={wisata.nama_wisata}
          className="wisata-card-image"
        />
      ) : (
        <div className="wisata-card-no-image">Tidak ada gambar</div>
      )}

      <div className="wisata-card-content">
        <p className="wisata-card-category">{wisata.kategori}</p>

        <h2>{wisata.nama_wisata}</h2>

        <p className="wisata-card-location">{wisata.wilayah}</p>

        <p className="wisata-card-rating">
          ⭐{" "}
          {Number(wisata.rating) === 0 || wisata.rating == null
            ? "Belum diketahui"
            : wisata.rating}
        </p>

        <p className="wisata-card-description">{wisata.deskripsi}</p>

        <div className="wisata-card-info">
          <span>⏱ {wisata.estimasi_durasi} menit</span>

          <span>
            {Number(wisata.harga_min) === 0 && Number(wisata.harga_max) === 0
              ? "Gratis"
              : `Rp ${Number(wisata.harga_min).toLocaleString("id-ID")} - Rp ${Number(
                  wisata.harga_max,
                ).toLocaleString("id-ID")}`}
          </span>
        </div>

        <Link to={`/wisata/${wisata.id_wisata}`} className="wisata-card-button">
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}

export default WisataCard;
