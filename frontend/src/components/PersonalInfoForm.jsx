import * as React from "react";
import "../App.css";

export default function PersonalInfoForm({ isModalOpen, onClose }) {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSave = () => {
    if (isChecked) {
      onClose(); // Checkbox işaretliyse modalı kapat
    } else {
      alert("You must accept the terms and conditions.");
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Please Enter Your Personal Information</h3>
            <div className="form-container">
              <h5 className="interview-text-input">Name:</h5>
              <input className="interview-text-field" />
              <h5 className="interview-text-input">Surname:</h5>
              <input className="interview-text-field" />
              <h5 className="interview-text-input">Email:</h5>
              <input className="interview-text-field" />
              <h5 className="interview-text-input">Phone:</h5>
              <input className="interview-text-field" />
            </div>
            <div className="chekbox-container">
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                Accept terms and conditions
              </label>
            </div>

            <br />
            <button className="modal-submit-button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
