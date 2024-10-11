import * as React from "react";
import "../../App.css";
import AdminDrawer from "../../components/AdminDrawer";
import { useNavigate } from "react-router-dom";
import AddQuestion from "../../components/AddQuestion";
import { useParams } from "react-router-dom";
import useAPI from "../../store/storeAPI";

export default function InterviewQuestions() {
  const { id } = useParams();
  const { error, loading, fetchData, setData } = useAPI();
  const [questionOpen, setIsOpen] = React.useState(false);
  const [pack, setPack] = React.useState(null);
  const [interview, setInterview] = React.useState({});
  const [questions, setQuestions] = React.useState([]);


  const handleRec = async (quest) => {
    const link = `/updateinterview/${id}`;
    const order = "POST";
    const newBody = {
      question: [quest],
    };
    await setData(link, order, newBody);
  };

  const handleDelete = (e) => {
    const delid = e.target.value;
    const link = `deletequestion/${delid}`
    const order = "DELETE"
    console.log(link, order)
  }

  React.useEffect(() => {
    if (!id) return;

    const getInterview = async () => {
      try {
        const link = `getinterviewbyid/${id}`;
        const order = "GET";
        const data = await fetchData(link, order);
        setInterview(data);

        if (data?.package) {
          fetchPack(data.package);
        }
      } catch (err) {
        console.error("Error fetching interview data:", err);
      }
    };

    const fetchPack = async (packageId) => {
      try {
        const packlink = `getpackagebyid/${packageId}`;
        const packData = await fetchData(packlink, "GET");
        setPack(packData);

        if (packData?.question?.length > 0) {
          fetchAllQuestions(packData.question);
        }
      } catch (err) {
        console.error("Error fetching package data:", err);
      }
    };

    const fetchAllQuestions = async (questionIds) => {
      try {
        const questionsData = await Promise.all(
          questionIds.map(async (questId) => {
            const questlink = `getquestionbyid/${questId}`;
            return await fetchData(questlink, "GET");
          })
        );
        setQuestions(questionsData);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };

    getInterview();
  }, [id]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const nav = useNavigate();
  const goBack = () => nav(-1);

  return (
    <div>
      <AdminDrawer />
      <div className="adminDrawerOpen">
        {error && <h3>{error}</h3>}
        {loading && <h3>Loading</h3>}
        <button className="back-button" onClick={goBack}>
          Back
        </button>
        <div className="question-table-container">
          <h3>{interview.title_name || "INTERVİEW TİTLE"}</h3>
          <button
            onClick={questionOpen ? handleClose : handleOpen}
            className="add-button2"
          >
            {questionOpen ? "Close" : "+Add"}
          </button>
          <AddQuestion
            isOpen={questionOpen}
            onClose={handleClose}
            onChange={handleRec}
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
              {questions.length > 0 ? (
                questions.map((q, index) => (
                  <tr key={index}>
                    <td className="drag-handle">≡</td>
                    <td>{q.question}</td>
                    <td>{q.timer}</td>
                    <td>
                      <button value={q._id} onClick={handleDelete} className="delete-button">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No questions found</td>
                </tr>
              )}
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
