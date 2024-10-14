import * as React from "react";
import "../../App.css";
import AdminDrawer from "../../components/AdminDrawer";
import ToggleSwitch from "../../components/ToggleSwitch";
import { useParams } from "react-router-dom";
import useAPI from "../../store/storeAPI";
export default function InterviewVideo() {

  const {id, val} = useParams();
  const interID = id;
  const candidateID = val;
  const {error, loading, fetchData, setData} = useAPI();

  const fetchInterview = async () => {

  }

  return (
    <div>
        <AdminDrawer/>
      <div className="adminDrawerOpen">
        <div className="video-interview-container">
          <div className="video-section">
            <h2>Backend Interview Video Collection</h2>
            <div className="video-player">
              <video controls>
                <source src="path_to_video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="details-section">
            <h3>Jack Nicholson</h3>
            <div className="notes-section">
              <textarea disabled placeholder="Informations" rows="8"></textarea>
            </div>
            <div className="notes-section">
              <textarea placeholder="Note...." rows="8"></textarea>
            </div>
            <h5>Status : </h5>
            <ToggleSwitch></ToggleSwitch>
            <br/>
            <button className="save-button">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
