import * as React from "react";
import "../../App.css";
//import AdminDrawer from "../../components/AdminDrawer";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useAPI from "../../store/storeAPI";

export default function VideoCollection() {
  const {fetchData } = useAPI();
  const [interview, setInterview] = React.useState({});
  const [candidates, setCandidates] = React.useState([]);
  const [video, setVideo] = React.useState([]);
  const { id } = useParams();
  const nav = useNavigate();
  const goVideo = (e) => {
    const val = e.target.value
    nav(`/interviewvideo/${id}/${val}`);
  };
  const goBack = () => {
    nav(-1);
  };

  const getCandidates = async () => {
    if (id === undefined || id === "undefined") {
      nav(-1);
    }
    const data = await fetchData(`getinterviewbyid/${id}`, "GET");
    setInterview(data);
    if (data?.candidates && candidates !== 0) {
      var newList = [];
      var videosList = [];
      for (let i of data.candidates) {
        const candidateData = await fetchData(`getcandidatebyid/${i}`, "GET");
        newList.push(candidateData);
        var candidateID = candidateData._id;
        var candidateName = candidateData.name;
        var candidateSurname = candidateData.surname;
        candidateName += " " + candidateSurname;
        var candidateVideo = candidateData.video;
        var candidateStatus = candidateData.status;
        videosList.push({
          id: candidateID,
          name: candidateName,
          video: candidateVideo,
          watched : candidateStatus
        });
      }
      setVideo(videosList);
      setCandidates(newList);
    }
  };

  React.useEffect(() => {
    const getInter = async () => {
      await getCandidates();
    };
    getInter();
  }, []);

  const Card = ({ valid, name, video, watched }) => (
    <div className="card">
      <h5>{name}</h5>
      <h6>{watched}</h6>
      <video className="videocard" alt={name} src={video} value={valid} onClick={goVideo} />
      <button value={valid} onClick={goVideo} className="card-info-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
        Watch
      </button>
    </div>
  );
  return (
    <div>
 
      {/*<AdminDrawer />*/}
      <div /*className="adminDrawerOpen"*/ className="adminpage">
      <button className="back-button" onClick={goBack}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
          style={{ width: "24px", height: "24px",  marginLeft: "-230" }} // İkonun boyutunu burada ayarlayın
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 0 1 0 12h-3" />
        </svg>
      </button>
      <h2 style={{ marginTop: "-95px" }} >{interview.title_name}</h2>
        <div className="grid-container">
          {video !== null ? (
            video.map((v, index) => (
              <Card key={index} valid={v.id} name={v.name} video={v.video} watched={v.watched} />
            ))
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
