import * as React from "react";
import "../App.css";

export default function SeeLink({ isModalOpen, onClose }) {
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
              <h2 className="table-title">Interview Link:</h2>
              <input
                disabled
                placeholder="www.iview.demo/interview/6490392"
                className="question-packagename-text"
              ></input>
              <button
                onClick={onClose}
                style={{ marginLeft: "75%", borderRadius: "2cap" }}
                className="add-button2"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
