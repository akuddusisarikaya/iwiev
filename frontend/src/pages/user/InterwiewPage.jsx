import * as React from "react";
import "../../App.css";
import PersonalInfoForm from "../../components/PersonalInfoForm";
import { useParams } from "react-router-dom";
import useAPI from "../../store/storeAPI";
import CountdownTimer from "../../components/CountdownTimer";

export default function InterviewPage() {
  const { error, loading, fetchData, setData } = useAPI();
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
  const [startInterview, setStarInterview] = React.useState(false);
  const [totalTime, setTotalTime] = React.useState(0);
  const [quesetTime, setQuestTime] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const [modalPen, setModalPen] = React.useState(true);
  const { id } = useParams();

  const fecthQuestions = async () => {
    const data = await fetchData(`getinterviewbyid/${id}`, "GET");
    if (data.package === null && data.package.length <= 0) {
      return;
    }
    const packData = await fetchData(`getpackagebyid/${data.package}`, "GET");
    if (!packData?.questions && packData.questions === null) {
      return;
    }
    const packQuests = packData.question;
    if (!data.question && data.question.length <= 0) {
      return;
    }
    const interQuests = data.question;
    const mergedQuest = [...packQuests, ...interQuests];
    if (mergedQuest !== null && mergedQuest.length > 0) {
      var newList = [];
      for (let i of mergedQuest) {
        const quest = await fetchData(`getquestionbyid/${i}`, "GET");
        newList.push(quest);
      }
      setQuestions(newList);
    }
  };

  React.useEffect(() => {
    if (id === undefined || id === "undefined") {
      return;
    }
    fecthQuestions();
    var time = 0;
    for (let i of questions) {
      time += Number(i.timer);
    }
    setTotalTime(time);
    for (let j of questions) {
      const qid = j._id;
      const timer = j.timer;

      setQuestTime((prevTime) => {
        return [...prevTime, { [qid]: timer }];
      });
    }
  }, [id]);

  const handleModelClose = () => {
    setModalPen(false);
  };

  return (
    <div className="interview-page">
      <PersonalInfoForm isModalOpen={modalPen} onClose={handleModelClose} />
      <div className="h5container">
        <h5 className="interview-question-numb">Soru Numarası: 2 / 10</h5>{" "}
        <h5 className="interview-question-numb">Kalan Süre: 15 dak </h5>
      </div>

      <textarea
        disabled
        placeholder="What is Big-O notation?"
        className="interview-text-area"
      ></textarea>
      <video className="interview-video" controls>
        <source src="path_to_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button className="interview-button"> Kaydı Bitir ve Gönder</button>
    </div>
  );
}
