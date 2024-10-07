import * as React from "react";
import "../../App.css";
import AdminDrawer from "../../components/AdminDrawer";
import { useNavigate } from "react-router-dom";

const videoCardsData = [
  {
    id: 1,
    name: "Alice Armstrong",
  },
  {
    id: 2,
    name: "Garry Page",
  },
  {
    id: 3,
    name: "Jim Carry",
  },
  {
    id: 4,
    name: "Jack Nicholson",
  },
];
export default function VideoCollection() {
  const nav = useNavigate();
  const goVideo = () => {
    nav("/interviewvideo");
  };
  const goBack = () => {
    nav(-1)
  }
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
        <button className="back-button" onClick={goBack}>Back</button>
        <div className="grid-container">
          {videoCardsData.map((card) => (
            <Card key={card.id} name={card.name} />
          ))}
        </div>
      </div>
    </div>
  );
}
