import * as React from "react";
import "../../App.css";
//import AdminDrawer from "../../components/AdminDrawer";
import ToggleSwitch from "../../components/ToggleSwitch";
import { useNavigate, useParams } from "react-router-dom";
import useAPI from "../../store/storeAPI";

export default function InterviewVideo() {
  const { id, val } = useParams();
  const nav = useNavigate();
  const interID = id;
  const candidateID = val;
  const { fetchData, setData } = useAPI();
  const [interview, setInterview] = React.useState({});
  const [candidate, setCandidate] = React.useState({});
  const [video, setVideo] = React.useState("");
  const [savedNote, setNote] = React.useState("");
  const [watched, setWatched] = React.useState(false);
  const [approve, setApprove] = React.useState(false);
  const [reject, setReject] = React.useState(false);
  const [recWatch, setRecWatch] = React.useState("");
  const [candidateStat, setCandidateStat] = React.useState("");

  const handleNote = (e) => {
    setNote(e.target.value);
  };
  const handleApprove = (value) => {
    setApprove(value);
    setReject(!value);
  };
  const handleReject = (value) => {
    setApprove(!value);
    setReject(value);
  };

  const handleWatched = () => {
    setWatched(true);
  };
  function capitalize(str) {
    if (!str) return ""; // Eğer boş bir string geldiyse, boş döner
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  React.useEffect(() => {
    if (candidate?.status && candidate.status.length > 3) {
      if (candidate.status === "rejected" || candidate.status === "approved") {
        setWatched(true);
      }
      var stat = candidate.status.toString();
      setCandidateStat(capitalize(stat));
    }
  });

  const fetchInterview = async () => {
    const data = await fetchData(`getinterviewbyid/${interID}`, "GET");
    if (data) {
      setInterview(data);
      const candidateData = await fetchData(
        `getcandidatebyid/${candidateID}`,
        "GET"
      );
      if (candidateData) {
        setCandidate(candidateData);
        setVideo(candidateData.video);
      }
    }
  };

  const goBack = () => {
    nav(-1);
  };

  React.useEffect(() => {
    if (!id || !val) {
      goBack();
    } else {
      fetchInterview();
    }
  }, [id, val]);

  React.useEffect(() => {
    if (watched) {
      if (reject === false && approve === false) {
        setRecWatch("watched");
      } else if (reject === true) {
        setRecWatch("rejected");
      } else if (approve === true) {
        setRecWatch("approved");
      }
    }
  }, [reject, approve, watched]);

  const submitInterview = async () => {
    console.log(recWatch);
    const bodyNote =
      savedNote && savedNote.length > 0 ? savedNote : candidate.note;
    const newBody = {
      note: bodyNote,
      status: recWatch,
    };
    console.log(newBody);
    const catcherror = await setData(
      `patchcandidates/${candidateID}`,
      "PATCH",
      newBody
    );
    console.log(catcherror);
  };

  return (
    <div>
      {/*<AdminDrawer />*/}
      <div style={{marginTop : "7%"}}/*className="adminDrawerOpen"*/>
        <div className="video-interview-container">
          <div className="video-section">
            <h2>{interview.title_name || "Interview Name"}</h2>
            <div className="video-player">
              <video onClick={handleWatched} controls>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="details-section">
            <h3>
              {(candidate.name || "CandidateName") +
                " " +
                (candidate.surname || "CandidateSurname")}
            </h3>
            <h6>{candidateStat}</h6>
            <div className="notes-section">
              <label>Email: </label>
              <input
                className="candiInfo"
                disabled
                placeholder={candidate.email || "Email Information"}
                rows="8"
              />
              <label>Phone: </label>
              <input
                className="candiInfo"
                disabled
                placeholder={candidate.phone_number || "Phone Information"}
                rows="8"
              />
            </div>
            <div className="notes-section">
              <textarea
                placeholder={candidate.note}
                value={savedNote}
                onChange={handleNote}
                rows="8"
              ></textarea>
            </div>
            <ToggleSwitch
              onChange={handleApprove}
              value={approve}
              label={"Approve :"}
            />
            <ToggleSwitch
              onChange={handleReject}
              value={reject}
              label={"Reject:"}
            />
            <br />
            <button onClick={submitInterview} className="save-button">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
