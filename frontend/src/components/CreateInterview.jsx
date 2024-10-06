import * as React from "react";
import "../App.css";
import ToggleSwitch from "./ToggleSwitch";
import AddQuestion from "./AddQuestion";

export default function CreatInterview({ isModalOpen, onClose }) {
  const [areaOpen, setAreaOpen] = React.useState(false);

  const handleAreaClose = () =>{
    setAreaOpen(false)
  }

  const handleAreaOpen = () => {
    setAreaOpen(true);
  };
  return (
    <>
      {isModalOpen && (
        <div className="modal" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <br />
            <h3>Title:</h3>
            <input className="create-text-field"></input>
            <h3>Package:</h3>
            <select type="select" className="create-text-field">
              <option></option>
              <option>Package 1</option>
              <option>Package 2</option>
              <option>Package 3</option>
              <option>Package 4</option>
            </select>
            {areaOpen ? (
              <AddQuestion isOpen={areaOpen} onClose={handleAreaClose} />
            ) : (
              <button className="modal-button" onClick={handleAreaOpen} >+ Add question</button>
            )}

            <div className="form-group">
              <br />
              <ToggleSwitch label="Can Skip" />
              <br />
              <ToggleSwitch label="Show At Once" />
            </div>
            <button className="modal-submit-button" onClick={onClose}>Add</button>
          </div>
        </div>
      )}
    </>
  );
}
