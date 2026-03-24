import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import MainLayout from "../components/layouts/MainLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import GuestRoute from "./GuestRoute";
import Cours from "../pages/cours/Cours";
const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/cours" element={<Cours />} />

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
