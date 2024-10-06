import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/admin/LoginPage";
import AdminHomePage from "./pages/admin/AdminHomePage";
import Header from "./components/Header";
import VideoCollection from "./pages/admin/VideoCollection";
import InterviewVideo from "./pages/admin/InterviewVideo";
import PackageList from "./pages/admin/PackageList";
import PackageQuestionList from "./pages/admin/PackageQuestionList";

function App() {
  const token = sessionStorage.getItem("token")
  return (
    <Router>
      {/*token !== null && */<Header/>}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/adminhomepage" element={/*token !== null && */<AdminHomePage />} />
        <Route path="/videocollection" element={/*token !== null && */<VideoCollection />} />
        <Route path="/interviewvideo" element={/*token !== null && */<InterviewVideo />} />
        <Route path="/packagelist" element={/*token !== null && */<PackageList />} />
        <Route path="/packagequestions" element={/*token !== null && */<PackageQuestionList />} />
      </Routes>
    </Router>
  );
}

export default App;
