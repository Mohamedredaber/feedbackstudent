import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import MainLayout from "../components/layouts/MainLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import GuestRoute from "./GuestRoute";
import Cours from "../pages/cours/Cours";
import ProtectedRoute from "./ProtectedRoute";
import FeedbackPage from "../pages/feedback/FeedbackPage";
import StudentFeedbackPage from "../pages/feedback/StudentFeedbackPage";
import TopCoursesPage from "../pages/feedback/TopCoursesPage";
import DetailsCours from "../pages/cours/Components/DetailsCours";
const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />

      {/* ✅ Cours — accessible à tous les connectés */}
      <Route
        path="/cours"
        element={
          <ProtectedRoute>
            <Cours />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cours/details/:id"
        element={
          <ProtectedRoute>
            <DetailsCours />
          </ProtectedRoute>
        }
      />

      <Route
        path="/feedback"
        element={
          <ProtectedRoute roles={["admin"]}>
            <FeedbackPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/feedback/student"
        element={
          <ProtectedRoute roles={["student"]}>
            <StudentFeedbackPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/feedback/top"
        element={
          <ProtectedRoute>
            <TopCoursesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />
    </Route>
  </Routes>
);

export default AppRoutes;
