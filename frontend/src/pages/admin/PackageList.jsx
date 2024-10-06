import * as React from "react";
import "../../App.css";
import AdminDrawer from "../../components/AdminDrawer";
import { useNavigate } from "react-router-dom";
import AddPackage from "../../components/AddPackage";

const initialPackages = [
  { id: 1, name: "Backend Question Package", questionCount: 10 },
  { id: 2, name: "Frontend Question Package", questionCount: 8 },
  { id: 3, name: "Fullstack Question Package", questionCount: 5 },
  { id: 4, name: "Devops Question Package", questionCount: 7 },
];

export default function PackageList() {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const nav = useNavigate();
  const goEdit = () => {
    nav("/packagequestions");
  };
  return (
    <div>
      <AdminDrawer />
      <div className="adminDrawerOpen">
        <div className="package-table-container">
          <h2>Manage Question Package</h2>
          <input
            type="text"
            placeholder="Package Title..."
            className="package-title-input"
          />
          <button className="add-button2" onClick={handleModalOpen}>
            {" "}
            + Add
          </button>
          <AddPackage isModalOpen={isModalOpen} onClose={handleModalClose} />
          <br />
          <table className="package-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Package Name</th>
                <th>Question Count</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {initialPackages.map((pkg, index) => (
                <tr key={pkg.id}>
                  <td>{index + 1}</td>
                  <td>{pkg.name}</td>
                  <td>{pkg.questionCount}</td>
                  <td>
                    <button className="edit-button" onClick={goEdit}>
                      Edit
                    </button>
                    <button className="delete-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
