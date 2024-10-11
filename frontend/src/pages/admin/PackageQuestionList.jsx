import * as React from "react";
import "../../App.css";
import AdminDrawer from "../../components/AdminDrawer";
import { useNavigate } from "react-router-dom";
import AddQuestion from "../../components/AddQuestion";
import { useParams } from "react-router-dom";
import useAPI from "../../store/storeAPI";

export default function PackageQuestionList() {
  const { error, loading, fetchData, setData } = useAPI();
  const { id } = useParams();
  const [questionOpen, setIsOpen] = React.useState(false);
  const [pack, setPackage] = React.useState({});
  const [question, setQuestion] = React.useState([]);

  React.useEffect(() => {
    const getPackage = async () => {
      try {
        const link = `getpackagebyid/${id}`;
        const order = "GET";
        const data = await fetchData(link, order);
        console.log(data);
        setPackage(data);

        if (data?.question?.length > 0) {
          const questionsData = await Promise.all(
            data.question.map(async (questId) => {
              const questLink = `getquestionbyid/${questId}`;
              const questData = await fetchData(questLink, order);
              console.log(questData);
              return questData;
            })
          );
          setQuestion(questionsData); // Tüm sorular geldikten sonra tek seferde state güncellemesi
          console.log(questionsData);
        }
      } catch (err) {
        console.error("Error fetching package or questions:", err);
      }
    };

    getPackage();
  }, [id, fetchData]);

  const handleAddquestion = async (e) => {
    const link = `updatepackage/${pack._id}`;
    const order = "PUT";
    const newBody = { question: [...pack.question, e] }; // Mevcut sorulara yenisini ekliyoruz
    const data = await setData(link, order, newBody);
    setPackage((prevPack) => ({
      ...prevPack,
      question: newBody.question, // package state'ini güncelliyoruz
    }));
    nav(0);
  };

  const handleDelete = async (e) => {
    const index = parseInt(e.target.value, 10);
    const updatedQuestions = pack.question.filter((_, i) => i !== index); // İlgili indeksi çıkarıyoruz
    const newBody = { question: updatedQuestions }; // Güncellenmiş soru listesi
    const link = `updatepackage/${id}`;
    const order = "PUT";
    await setData(link, order, newBody);

    // package ve questions state'lerini güncelliyoruz
    setPackage((prevPack) => ({
      ...prevPack,
      question: updatedQuestions,
    }));

    setQuestion((prevQuestions) => prevQuestions.filter((_, i) => i !== index));
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const nav = useNavigate();
  const goBack = () => nav(-1);

  return (
    <div>
      <AdminDrawer />
      <div className="adminDrawerOpen">
        {error && <h3>{error}</h3>}
        {loading && <h3>Loading...</h3>}
        <button className="back-button" onClick={goBack}>
          {" "}
          Back
        </button>
        <div className="question-table-container">
          <h3>{pack.name || "Package Name"}</h3>
          <button
            onClick={questionOpen ? handleClose : handleOpen}
            className="add-button2"
          >
            {questionOpen ? "Close" : "+Add"}
          </button>
          <AddQuestion
            isOpen={questionOpen}
            onClose={handleClose}
            onChange={handleAddquestion}
          />
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
              {question.map((q, index) => (
                <tr key={index}>
                  <td className="drag-handle">≡</td>
                  <td>{q.question}</td>
                  <td>{q.timer}</td>
                  <td>
                    <button
                      value={index}
                      onClick={handleDelete}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="form-buttons">
            <button onClick={goBack} className="save-button">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
