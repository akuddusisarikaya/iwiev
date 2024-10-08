import React, { useState, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function QuestionList({ isModalOpen, onClose }) {
  const [questions, setQuestions] = useState([]); // Dinamik veriler için state
  const [loading, setLoading] = useState(true); // Yüklenme durumunu kontrol ediyoruz
  const [error, setError] = useState(null); // Hata yönetimi için state

  const nav = useNavigate();

  // Veri çekme işlemi için useEffect kullanıyoruz
  useEffect(() => {
    // Backend API'den question listesini almak için fetch kullanıyoruz
    fetch("http://localhost:3000/api/questions") // Backend API URL'nizi buraya ekleyin
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // JSON formatına çeviriyoruz
      })
      .then((data) => {
        setQuestions(data); // Gelen veriyi state'e set ediyoruz
        setLoading(false); // Yükleme işlemi tamamlandı
      })
      .catch((error) => {
        console.error("Veri çekilirken hata oluştu:", error);
        setError(error.message);
        setLoading(false); // Yükleme tamamlandı ama hata ile karşılaşıldı
      });
  }, []); // Bileşen yüklendiğinde bir kez çalışır

  const goEdit = () => {
    nav("/packagequestions");
  };

  // Eğer veriler yükleniyorsa, bir yükleme mesajı göster
  if (loading) {
    return <div>Loading...</div>;
  }

  // Eğer hata varsa hata mesajı göster
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {isModalOpen && (
        <div className="modal" onClick={onClose}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Modal dışına tıklanınca kapanır
          >
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <div className="table-container">
              <h2 className="table-title">Question List</h2>
              <table className="question-table">
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((item) => (
                    <tr key={item._id}> {/* Backend'den gelen ObjectId'yi kullan */}
                      <td>{item.question}</td>
                      <td>{item.timer} min</td> {/* Timer alanını backend'e göre düzenle */}
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={goEdit}
                style={{ marginLeft: "75%", borderRadius: "2cap" }}
                className="add-button2"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
