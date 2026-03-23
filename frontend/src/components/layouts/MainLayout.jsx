import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const MainLayout = () => (
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-8">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;
