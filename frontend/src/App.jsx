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
import InterviewPage from "./pages/user/InterwiewPage";
import InterviewQuestions from "./pages/admin/InterviewQuestions";

function App() {
  const token = sessionStorage.getItem("token")
  return (
    <Router>
      <Header />
      {/*token !== null && */<Header/>}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/adminhomepage" element={/*token !== null && */<AdminHomePage />} />
        <Route path="/videocollection/:id" element={/*token !== null && */<VideoCollection />} />
        <Route path="/interviewvideo/:id/:val" element={/*token !== null && */<InterviewVideo />} />
        <Route path="/packagelist" element={/*token !== null && */<PackageList />} />
        <Route path="/packagequestions/:id" element={/*token !== null && */<PackageQuestionList />} />
        <Route path="/interviewdetail/:id" element={/*token!== null && */ <InterviewQuestions />} />
        <Route path="/interviewpage/:id" element={<InterviewPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
