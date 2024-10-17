import * as React from "react";
import "../App.css";

// Her bir Card bileşeni
const Card = ({ question, time, onNextQuestion, canSkip }) => {
  const numberTime =parseInt(time)
  const formedTime = 60*numberTime;
  const [remainingTime, setRemainingTime] = React.useState(formedTime);

  // Zamanlayıcı
  React.useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);

    if (remainingTime <= 0) {
      clearInterval(timer);
      onNextQuestion();
    }

    return () => clearInterval(timer); // Temizlik için
  }, [remainingTime, onNextQuestion]);

  return (
    <div className="questionCard">
      <h3>{question}</h3>
      <p>Kalan Süre: {remainingTime} saniye</p>
      {canSkip && <button className="card-button" onClick={onNextQuestion}>Bu Soruyu Geç</button>}
    </div>
  );
};

// CardList bileşeni
export default function QuestionCardList({ questions, canSkip }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
    }
  };

  // Eğer questions dizisi boş veya undefined ise hata oluşmasını engelle
  if (!questions || questions.length === 0) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div>
      <Card
        className="questionCard"
        question={questions[currentIndex].question}
        time={questions[currentIndex].timer}
        onNextQuestion={handleNextQuestion}
        canSkip={canSkip}
      />
    </div>
  );
}
