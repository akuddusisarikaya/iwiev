import * as React from "react";
import "../App.css";
import MinuteInput from "./MinuteInput";

export default function AddQuestion({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div>
          <h5>Soru:</h5>
          <textarea className="question-area"></textarea>
          <MinuteInput />
          <button className="modal-submit-button" onClick={onClose}>
            Add
          </button>
        </div>
      )}
    </>
  );
}
