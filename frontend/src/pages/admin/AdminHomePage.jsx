import * as React from "react";
import "../../App.css";
import AdminDrawer from "../../components/AdminDrawer";
import QuestionList from "../../components/QuestionList";
import { useNavigate } from "react-router-dom";
import CreateInterview from "../../components/CreateInterview"; // Typo düzeltildi
import SeeLink from "../../components/SeeLink";
import useAPI from "../../store/storeAPI";

export default function AdminHomePage() {
  const { error, loading, fetchData } = useAPI();
  const [sentlink, setLink] = React.useState("");
  const [listOpen, setListOpen] = React.useState(false);
  const [createOpen, setCreateOpen] = React.useState(false);
  const [linkOpen, setLinkOpen] = React.useState(false);
  const [packages, setPackages] = React.useState([]);

  const nav = useNavigate(); // useNavigate tanımlamasını yukarı aldık.

  const handleDetail = (e) => {
    const link = e.target.value;
    nav(`/interviewdetail/${link}`);
  };

  const seeVideos = (e) => {
    const link = e.target.value;
    nav(`/videocollection/${link}`);
  };

  const handleDelete = async (e) => {
    const takenid = e.target.value;
    const link = `deleteinterview/${takenid}`;
    const order = "DELETE";
    await fetchData(link, order); // Silme işlemi asenkron hale getirildi.
    setPackages(packages.filter((pack) => pack._id !== takenid)); // Silinen paketi state'den çıkar.
  };

  const handleLinkOpen = (e) => {
    const link = e.target.value;
    const sendLink = `http://localhost:5173/interviewpage/${link}`;
    setLink(sendLink);
    setLinkOpen(true);
  };

  const handleLinkClose = () => {
    setLinkOpen(false);
  };

  const handleCreateOpen = () => {
    setCreateOpen(true);
  };

  const handleCreateClose = () => {
    setCreateOpen(false);
  };

  const handleListClose = () => {
    setListOpen(false);
  };

  React.useEffect(() => {
    const fetchPackages = async () => {
      const link = "getinterview";
      const order = "GET";
      const data = await fetchData(link, order);
      setPackages(data);
    };
    fetchPackages();
  }, [fetchData]); // fetchData bağımlılığı eklendi.

  const Card = ({ title, total, holdon, value }) => (
    <div className="card">
      <button value={value} onClick={handleDetail} className="card-info-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-1"
        >
          <path
            fillRule="evenodd"
            d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-6 3.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7.293 5.293a1 1 0 1 1 .99 1.667c-.459.134-1.033.566-1.033 1.29v.25a.75.75 0 1 0 1.5 0v-.115a2.5 2.5 0 1 0-2.518-4.153.75.75 0 1 0 1.061 1.06Z"
            clipRule="evenodd"
          />
        </svg>
        Detail
      </button>
      <button
        value={value}
        onClick={handleLinkOpen}
        className="card-link-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-1"
        >
          <path
            fillRule="evenodd"
            d="M8.914 6.025a.75.75 0 0 1 1.06 0 3.5 3.5 0 0 1 0 4.95l-2 2a3.5 3.5 0 0 1-5.396-4.402.75.75 0 0 1 1.251.827 2 2 0 0 0 3.085 2.514l2-2a2 2 0 0 0 0-2.828.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M7.086 9.975a.75.75 0 0 1-1.06 0 3.5 3.5 0 0 1 0-4.95l2-2a3.5 3.5 0 0 1 5.396 4.402.75.75 0 0 1-1.251-.827 2 2 0 0 0-3.085-2.514l-2 2a2 2 0 0 0 0 2.828.75.75 0 0 1 0 1.06Z"
            clipRule="evenodd"
          />
        </svg>
        See Link
      </button>
      <button
        value={value}
        onClick={handleDelete}
        className="card-delete-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-1"
        >
          <path
            fillRule="evenodd"
            d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
            clipRule="evenodd"
          />
        </svg>
        Delete
      </button>
      <h2 className="card-title">{title}</h2>
      <h4>Candidates:</h4>
      <div className="block">
        <p>Total: {total}</p>
        <p>Hold-on: {holdon}</p>
      </div>
      <button className="card-button2" disabled>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-1"
        >
          <path
            fillRule="evenodd"
            d="M3.757 4.5c.18.217.376.42.586.608.153-.61.354-1.175.596-1.678A5.53 5.53 0 0 0 3.757 4.5ZM8 1a6.994 6.994 0 0 0-7 7 7 7 0 1 0 7-7Zm0 1.5c-.476 0-1.091.386-1.633 1.427-.293.564-.531 1.267-.683 2.063A5.48 5.48 0 0 0 8 6.5a5.48 5.48 0 0 0 2.316-.51c-.152-.796-.39-1.499-.683-2.063C9.09 2.886 8.476 2.5 8 2.5Zm3.657 2.608a8.823 8.823 0 0 0-.596-1.678c.444.298.842.659 1.182 1.07-.18.217-.376.42-.586.608Zm-1.166 2.436A6.983 6.983 0 0 1 8 8a6.983 6.983 0 0 1-2.49-.456 10.703 10.703 0 0 0 .202 2.6c.72.231 1.49.356 2.288.356.798 0 1.568-.125 2.29-.356a10.705 10.705 0 0 0 .2-2.6Zm1.433 1.85a12.652 12.652 0 0 0 .018-2.609c.405-.276.78-.594 1.117-.947a5.48 5.48 0 0 1 .44 2.262 7.536 7.536 0 0 1-1.575 1.293Zm-2.172 2.435a9.046 9.046 0 0 1-3.504 0c.039.084.078.166.12.244C6.907 13.114 7.523 13.5 8 13.5s1.091-.386 1.633-1.427c.04-.078.08-.16.12-.244Zm1.31.74a8.5 8.5 0 0 0 .492-1.298c.457-.197.893-.43 1.307-.696a5.526 5.526 0 0 1-1.8 1.995Zm-6.123 0a8.507 8.507 0 0 1-.493-1.298 8.985 8.985 0 0 1-1.307-.696 5.526 5.526 0 0 0 1.8 1.995ZM2.5 8.1c.463.5.993.935 1.575 1.293a12.652 12.652 0 0 1-.018-2.608 7.037 7.037 0 0 1-1.117-.947 5.48 5.48 0 0 0-.44 2.262Z"
            clipRule="evenodd"
          />
        </svg>
        Published
      </button>
      <button value={value} onClick={seeVideos} className="card-button">
        See Videos
      </button>
    </div>
  );

  return (
    <div>
      <AdminDrawer />
      <div className="adminDrawerOpen">
        {error && <h3>{error}</h3>}
        {loading && <h3>Loading...</h3>}
        <QuestionList isModalOpen={listOpen} onClose={handleListClose} />
        <CreateInterview isModalOpen={createOpen} onClose={handleCreateClose} />
        <SeeLink
          isModalOpen={linkOpen}
          onClose={handleLinkClose}
          viewLink={sentlink}
        />
        <button onClick={handleCreateOpen} className="add-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
        <div className="grid-container">
          {packages !== null ? (
            packages.map((pack) => (
              <Card
                value={pack._id}
                key={pack._id} // Düzeltildi
                title={pack.title_name}
                total={pack.candidates.length || "0"}
                holdon={pack.videos.length || "0"}
              />
            ))
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
