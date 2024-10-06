import * as React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const questionData = [
  { id: 1, question: "What is caching?", time: "2 min" },
  { id: 2, question: "What is Big-O notation?", time: "2 min" },
  { id: 3, question: "Can you explain JWT concept?", time: "2 min" },
  { id: 4, question: "What do you expect from this position?", time: "2 min" },
];

export default function QuestionList({ isModalOpen, onClose }) {

  const nav = useNavigate();

  const goEdit = () => {nav("/packagequestions")}

  return (
    <>
      {isModalOpen && (
        <div className="modal" onClick={onClose}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Modal dışına tıklanınca kapanır
          >
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <div className="table-container">
              <h2 className="table-title">Question List</h2>
              <table className="question-table">
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {questionData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.question}</td>
                      <td>{item.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={goEdit} style={{marginLeft:"75%" , borderRadius:"2cap"}} className="add-button2">Edit</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
