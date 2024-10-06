import * as React from "react";
import "../../App.css";
import AdminDrawer from "../../components/AdminDrawer";
import { useNavigate } from "react-router-dom";
import AddQuestion from "../../components/AddQuestion";

const initialQuestions = [
  { id: 1, question: "What is caching?", time: "2 min" },
  { id: 2, question: "What is Big-O notation?", time: "2 min" },
  { id: 3, question: "Can you explain JWT concept?", time: "2 min" },
  { id: 4, question: "What do you expect from this position?", time: "2 min" },
];

export default function PackageQuestionList() {
  const [questionOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const nav = useNavigate();
  const goBack = () => {
    nav(-1);
  };
  return (
    <div>
      <AdminDrawer />
      <div className="adminDrawerOpen">
        <button className="back-button" onClick={goBack}>
          {" "}
          Back
        </button>
        <div className="question-table-container">
          <h3>Package Name</h3>
          <button onClick={questionOpen? (handleClose) : (handleOpen)} className="add-button2">
            {questionOpen ? "Close" : "+Add"}
          </button>
          <AddQuestion isOpen={questionOpen} onClose={handleClose} />
          <br />
          <table className="question-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Question</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {initialQuestions.map((q, index) => (
                <tr key={q.id}>
                  <td className="drag-handle">≡</td>
                  <td>{q.question}</td>
                  <td>{q.time}</td>
                  <td>
                    <button className="delete-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="form-buttons">
            <button onClick={goBack} className="save-button">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
