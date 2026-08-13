import { useState } from "react";
import api from "../services/api";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Halo! 👋 Saya JakTrip AI. Ceritakan rencana perjalanan yang kamu inginkan.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await api.post("/chat/", {
        message: userMessage,

        budget: 500000,
        jumlah_orang: 2,
        jumlah_destinasi: 4,

        latitude: null,
        longitude: null,
      });

      const data = response.data;

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply,
          recommendations: data.recommendations || [],
          summary: data.summary || null,
        },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Maaf, terjadi kesalahan saat menghubungi JakTrip AI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {/* FLOATING BUTTON */}

      <button className="chatbot-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "×" : "💬"}
      </button>

      {/* CHAT WINDOW */}

      {isOpen && (
        <div className="chatbot-window">
          {/* HEADER */}

          <div className="chatbot-header">
            <div>
              <h3>JakTrip AI</h3>
              <span>Asisten perjalanan Jakarta</span>
            </div>

            <button onClick={() => setIsOpen(false)} className="chatbot-close">
              ×
            </button>
          </div>

          {/* MESSAGES */}

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                <div className="chat-bubble">{msg.text}</div>

                {/* RECOMMENDATIONS */}

                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="chat-recommendations">
                    {msg.recommendations.map((item) => (
                      <div
                        className="chat-recommendation-card"
                        key={item.id_wisata}
                      >
                        <div>
                          <h4>{item.nama_wisata}</h4>

                          <span>{item.kategori}</span>
                        </div>

                        <p>{item.estimasi_durasi} menit</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* SUMMARY */}

                {msg.summary && (
                  <div className="chat-summary">
                    <div>
                      <span>Destinasi</span>
                      <strong>{msg.summary.jumlah_destinasi}</strong>
                    </div>

                    <div>
                      <span>Biaya</span>
                      <strong>
                        Rp
                        {Number(msg.summary.total_biaya).toLocaleString(
                          "id-ID",
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>Jarak</span>
                      <strong>{msg.summary.total_jarak_km} km</strong>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* LOADING */}

            {loading && (
              <div className="chat-message bot">
                <div className="chat-bubble typing">
                  JakTrip AI sedang berpikir...
                </div>
              </div>
            )}
          </div>

          {/* INPUT */}

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ceritakan rencana perjalananmu..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button onClick={sendMessage} disabled={loading || !message.trim()}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
