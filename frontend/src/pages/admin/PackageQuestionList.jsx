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
            data.question.map((questId) => {
              console.log(questId);
              const questLink = `getquestionbyid/${questId}`;
              const fetchQuestions = async () => {
                const data = await fetchData(questLink, order);
                console.log(data);
                return data;
              };
              fetchQuestions();
            })
          );

          setQuestion(questionsData);
        }
      } catch (err) {
        console.error("Error fetching package or questions:", err);
      }
    };

    getPackage();
  }, [id, fetchData]);

  const handleAddquestion = (e) => {
    const addNewQuestion = async (e) => {
      const link = `updatepackage/${pack._id}`;
      const order = "PUT";
      const newBody = { question: [e] };
      const data = await setData(link, order, newBody);
    };
    addNewQuestion();
  };

  const handleDelete = (e) => {
    const index = e.target.value;
    const questList = pack.question.splice(index, 1);
    const newBody = questList;
    const link = `updatepackage/${id}`;
    const order = "PUT";
    setData(link, order, newBody);
  };

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
