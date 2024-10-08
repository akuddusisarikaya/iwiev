import React, { useState, useEffect } from "react";
import "../../App.css";
import AdminDrawer from "../../components/AdminDrawer";
import { useNavigate } from "react-router-dom";
import AddPackage from "../../components/AddPackage";

export default function PackageList() {
  const [packages, setPackages] = useState([]); // Paket verileri için state
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Yüklenme durumunu kontrol ediyoruz
  const [error, setError] = useState(null); // Hata yönetimi için state

  const nav = useNavigate();

  // Backend'den paket verilerini almak için useEffect kullanıyoruz
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    // Fetch API ile backend'den veriyi çekiyoruz
    fetch("http://localhost:3000/api/getpackage",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        Authorization : `Bearer ${token}`	
      }
    }) // Backend API URL'nizi buraya ekleyin
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPackages(data); // Veriyi state'e set ediyoruz
        setLoading(false); // Yükleme tamamlandı
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false); // Hata durumunda da yüklenmeyi bitiriyoruz
      });
  }, []); // Bu efekt yalnızca bileşen yüklendiğinde bir kez çalışır

  const handleDelete = (e) => {
    e.preventDefault();
    const id = e.target.value;
    const token = sessionStorage.getItem("token");
    // Silme işlemi için backend API çağrısı
    fetch(`http://localhost:3000/api/deletepackage/${id}`, {
      method: "DELETE",
        headers:{
          "Content-Type":"application/json",
          Authorization : `Bearer ${token}`
        }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Silme işlemi başarılı olduğunda, paket listesini güncelle
        setPackages(packages.filter((pkg) => pkg._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting package:", error);
      });
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const goEdit = () => {
    nav("/packagequestions");
  };

  // Eğer veriler yükleniyorsa, bir yükleme mesajı göster
  if (loading) {
    return <div>Loading...</div>;
  }

  // Eğer hata varsa hata mesajı göster
  if (error) {
    return <div>Error: {error}</div>;
  }

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
              {packages.map((pkg, index) => (
                <tr key={pkg._id}> {/* MongoDB'den gelen ObjectId kullanıyoruz */}
                  <td>{index + 1}</td>
                  <td>{pkg.name}</td>
                  <td>{pkg.questionCount}</td>
                  <td>
                    <button value={pkg._id} className="edit-button" onClick={goEdit}>
                      Edit
                    </button>
                    <button value={pkg._id} className="delete-button" onClick={handleDelete}>Delete </button>
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
