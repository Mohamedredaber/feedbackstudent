import { Routes, Route } from 'react-router-dom';

import Home from '../pages/home/Home'
import MainLayout from "../components/layouts/MainLayout"
import Login from '../pages/auth/Login'
import Register from '../pages/Register';
const AppRoutes = () => (
  <Routes element={<MainLayout/>}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    <Route path="/" element={<Home />} />
  </Routes>
);

export default AppRoutes;