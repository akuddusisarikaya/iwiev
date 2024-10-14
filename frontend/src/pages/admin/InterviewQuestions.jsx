import * as React from "react";
import "../../App.css";
import AdminDrawer from "../../components/AdminDrawer";
import { useNavigate } from "react-router-dom";
import AddQuestion from "../../components/AddQuestion";
import { useParams } from "react-router-dom";
import useAPI from "../../store/storeAPI";
import ToggleSwitch from "../../components/ToggleSwitch";
import PackageChange from "../../components/PackageChange";

export default function InterviewQuestions() {
  const { id } = useParams();
  React.useEffect(() => {
    if (id === undefined || id === "undefined") {
      nav("/adminhomepage");
    }
  });
  const { error, loading, fetchData, setData } = useAPI();
  const [pack, setPack] = React.useState({});
  const [questionOpen, setIsOpen] = React.useState(false);
  const [interview, setInterview] = React.useState({});
  const [questions, setQuestions] = React.useState([]);
  const [interviewQuestions, setInterviewQuestions] = React.useState([]);
  const [packageQuestions, setPackageQuestions] = React.useState([]);
  const [activate, setActivate] = React.useState(true);
  const [packModal, setPackModal] = React.useState(false);

  const handlePackModalOpen = () => {
    setPackModal(true);
  };

  const handlePackModalClose = () => {
    setPackModal(false);
  };

  const nav = useNavigate();
  const goBack = () => nav(-1);

  const handleActivate = async (value) => {
    try {
      // Önce state'i güncelleyip sonra API isteği gönderiyoruz
      setActivate(value);

      // PATCH isteği ile API'yi güncelle
      const newBody = { activate: value };
      await setData(`patchinterview/${id}`, "PATCH", newBody);
    } catch (error) {
      console.error("Aktivasyon durumu değiştirilemedi:", error);
      // Hata yönetimi ekleyin, örneğin kullanıcıya uyarı gösterebilirsiniz
    }
  };

  const handleRec = async (quest) => {
    //"quest" değeri kayıttan sonra oluşturulan yeni question ın id değeri!!
    var newArr = [...interviewQuestions, quest];
    console.log(newArr);
    setInterviewQuestions(newArr);
    const newBody = { question: newArr };
    await setData(`patchinterview/${id}`, "PATCH", newBody);
    nav(0);
  };

  // Soru silme işlevi
  const handleDelete = async (e) => {
    const delID = e.target.value;
    if (packageQuestions.includes(delID)) {
      const newPackQuestion = packageQuestions;
      packageQuestions.splice(packageQuestions.indexOf(delID), 1);
      const newBody = { question: newPackQuestion };
      await setData(`updatepackage/${pack._id}`, "PUT", newBody);
    } else {
      const newIntQuestions = interviewQuestions;
      interviewQuestions.splice(interviewQuestions.indexOf(delID), 1);
      const newBody = { question: newIntQuestions };
      await setData(`updateinterview/${id}`, "PUT", newBody);
    }
    await fetchData(`deletequestion/${delID}`, "DELETE");

    loadPage();
  };

  const loadPage = async () => {
    if (id === undefined || id === "undefined") {
      nav("/adminhomepage");
    }
    var interQuestList = []
    var packQuestList = []
    try {
      const interData = await fetchData(`getinterviewbyid/${id}`, "GET");
      if (interData?.question && interData.question.length > 0) {
        interQuestList = interData.question;
        setInterviewQuestions(interQuestList);
      }
      setInterview(interData)
      if (interData.package && interData.question !== "") {
        const packData = await fetchData(`getpackagebyid/${interData.package}`, "GET");
        setPack(packData)
        packQuestList = packData.question;
        setPackageQuestions(packQuestList);
      }
      const mergedList = [...interQuestList, ...packQuestList];
      var questList = []
      for(let i of mergedList){
        const questData = await fetchData(`getquestionbyid/${i}`, "GET");
        questList.push(questData)
      }
      setQuestions(questList)
    } catch (err) {
      console.error("Error loading Page: " , err.message)
    }
  };

  React.useEffect(() => {
    if (id === undefined || id === "undefined") {
      nav("/adminhomepage"); // Eğer id geçersizse, geri yönlendir
      return;
    }

    const getActive = async () => {
      try {
        // API'den mevcut activate durumunu alıyoruz
        const data = await fetchData(`getinterviewbyid/${id}`, "GET");
        setActivate(data.activate); // Durumu güncelliyoruz
      } catch (error) {
        console.error("Aktiflik durumu alınamadı:", error);
        // Hata yönetimi ekleyebilirsiniz
      }
    };

    getActive();
    loadPage(); // Sayfa yükleme fonksiyonu çağrılıyor
  }, [id, fetchData]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <AdminDrawer />
      <div className="adminDrawerOpen">
        {error && <h3>{error}</h3>}
        {loading && <h3>Loading...</h3>}
        <button className="back-button" onClick={goBack}>
          Back
        </button>
        <div className="question-table-container">
          <h3>{interview.title_name || "INTERVIEW TITLE"}</h3>
          <ToggleSwitch
            label="Activate"
            onChange={handleActivate}
            value={activate}
          ></ToggleSwitch>
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
          <button
            onClick={packModal ? handlePackModalClose : handlePackModalOpen}
            className="add-button2"
          >
            {packModal ? "Close" : "ChangePackage"}
          </button>
          <PackageChange
            isModalOpen={packModal}
            onClose={handlePackModalClose}
            onClick={handlePackModalOpen}
            value={pack._id}
            interview={id}
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
              {questions && questions.length > 0 ? (
                questions.map((q, index) => (
                  /*q!==null&&*/
                  <tr key={index}>
                    <td className="drag-handle">{index + 1}</td>
                    <td>{q?.question}</td>
                    <td>{q?.timer}</td>
                    <td>
                      <button
                        id={index}
                        value={q?._id}
                        onClick={handleDelete}
                        className="delete-button"
                      >
                        Delete
                      </button>
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
