import * as React from "react";
import "../../App.css";
import AdminDrawer from "../../components/AdminDrawer";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function VideoCollection() {
  const [error, setError] = React.useState(null);
  const [interview, setInterview] = React.useState({});
  const { id } = useParams();
  const nav = useNavigate();
  const goVideo = () => {
    nav("/interviewvideo");
  };
  const goBack = () => {
    nav(-1);
  };

  React.useEffect(() => {
    const getInter = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3000/api/getinterviewbyid/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if(!response.ok) throw new Error("interview did not catch");
        const data = await response.json();
        console.log(data)
        setInterview(data)
      } catch (error) {
        setError(error.message);
      }
    };
    getInter();
  }, []);

  const Card = ({ name }) => (
    <div className="card">
      <h5>{name}</h5>
      <img alt={name} src="https://via.placeholder.com/250" />
      <button onClick={goVideo} className="card-info-button">
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
      <AdminDrawer />
      <div className="adminDrawerOpen">
        <button className="back-button" onClick={goBack}>
          Back
        </button>
        <div className="grid-container">
          {interview.videos !== null ? (
            interview.videos.map((video, index)=> (
              <Card key={index} name={video}/>
            ))
          ): (<div/>)}
        </div>
      </div>
    </div>
  );
}
