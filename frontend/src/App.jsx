import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CoursList from "./pages/CoursList";
import CoursDetail from "./pages/CoursDetail";
import AddFeedback from "./pages/AddFeedback";
import FeedbackList from "./pages/FeedbackList";
import StudentFeedback from "./pages/StudentFeedback";
import TopCourses from "./pages/TopCourses";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cours" element={<CoursList />} />
        <Route path="/cours/:id" element={<CoursDetail />} />
        <Route path="/add-feedback" element={<AddFeedback />} />
        <Route path="/feedbacks" element={<FeedbackList />} />
        <Route path="/student-feedback" element={<StudentFeedback />} />
        <Route path="/top-courses" element={<TopCourses />} />
      </Routes>
    </Router>
  );
}

export default App;
