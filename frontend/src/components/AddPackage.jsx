import * as React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function AddPackage({ isModalOpen, onClose }) {
    const nav = useNavigate();
    const goEdit  = () => { nav("/packagequestions")}
  return (
    <div>
      {isModalOpen && (
        <div className="modal" onClick={onClose}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Modal dışına tıklanınca kapanır
          >
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <h3>Question Package Name: </h3>
            <br/>
            <input className="question-packagename-text"></input>
            <button className="submit-button" onClick={goEdit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}
