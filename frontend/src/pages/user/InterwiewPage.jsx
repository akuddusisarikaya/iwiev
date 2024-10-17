import * as React from "react";
import "../../App.css";
import PersonalInfoForm from "../../components/PersonalInfoForm";
import { useNavigate, useParams } from "react-router-dom";
import useAPI from "../../store/storeAPI";
import QuestionCardList from "../../components/QuestionCardList";
import VideoRecorder from "../../components/VideoRecorder";

export default function InterviewPage() {
  const nav = useNavigate();
  const { fetchData, setData } = useAPI();
  const [isStart, setIsStart] = React.useState(false);
  const [candidate, setCandidate] = React.useState("");
  const [candiOK, setCandiOK] = React.useState(false);
  const [inter, setInter] = React.useState({});
  const [videoURL, setVideoURL] = React.useState("");
  const [allQuestions, setAllQuestions] = React.useState([]);
  const [modalPen, setModalPen] = React.useState(true);
  const { id } = useParams();

  const handleCandidate = (e) => {
    setCandidate(e);
  };

  const handleStart = () => {
    setIsStart(true);
  };
  const handleVideoURL = (e) => {
    setVideoURL(e);
  };

  React.useEffect(() => {
    if (
      candidate &&
      candidate !== null &&
      candidate !== undefined &&
      candidate !== "undefined"
    ) {
      setCandiOK(true);
    } else if (
      candidate === null ||
      candidate === undefined ||
      candidate === "undefined"
    ) {
      setCandiOK(false);
    }
  }, [candidate]);

  const fetchQuestions = async () => {
    try {
      const interData = await fetchData(`getinterviewbyid/${id}`, "GET");
      setInter(interData);
      if (interData?.question?.length > 0) {
        var newList = [];
        for (let i of interData.question) {
          const questData = await fetchData(`getquestionbyid/${i}`, "GET");
          newList.push(questData);
        }
        setAllQuestions(newList);
      }
    } catch (err) {
      console.error("Sorular çekilirken hata oluştu", err.message);
    }
  };
  React.useEffect(() => {
    if (id === undefined || id === "undefined") {
    }
    fetchQuestions();
    if (!allQuestions || allQuestions.length <= 0) {
      console.error("hata");
    }
  }, [id]);

  const handleModelClose = () => {
    setModalPen(false);
  };
  return (
    <div className="interview-page">
      <PersonalInfoForm
        handleCandi={handleCandidate}
        isModalOpen={modalPen}
        onClose={handleModelClose}
        interid={id}
      />
      {candiOK ? (
        <div style={{ marginTop: "10%" }}>
          {isStart && (
            <QuestionCardList questions={allQuestions} canSkip={true} />
          )}
          <button onClick={handleStart} className="interview-button">
            {" "}
            Başla
          </button>
          <div style={{ marginLeft: "25%" }}>
            <VideoRecorder handleURL={handleVideoURL} />
          </div>
        </div>
      ) : (
        <div />
      )}
      <button className="interview-button"> Kaydı Bitir ve Gönder</button>
    </div>
  );
}
