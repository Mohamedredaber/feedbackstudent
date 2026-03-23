import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, isAdmin, isStudent, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // ── Active link helper ──
  const isActive = (path) =>
    location.pathname === path
      ? 'text-white font-semibold border-b-2 border-white pb-1'
      : 'text-blue-100 hover:text-white transition';

  return (
    <nav className="bg-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to="/cours" className="flex items-center gap-2 text-xl font-bold">
          🎓 <span>StudentFeedback</span>
        </Link>

        {/* ── Desktop Links ── */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/cours" className={isActive('/cours')}>
            📚 Cours
          </Link>

          {isAdmin && (
            <Link to="/feedback" className={isActive('/feedback')}>
              💬 Feedbacks
            </Link>
          )}

          {isStudent && (
            <>
              <Link to="/feedback/student" className={isActive('/feedback/student')}>
                📝 Mes Feedbacks
              </Link>
              <Link to="/feedback/top" className={isActive('/feedback/top')}>
                ⭐ Top Cours
              </Link>
            </>
          )}
        </div>

        {/* ── User Info + Logout ── */}
        <div className="hidden md:flex items-center gap-4">

          {/* Badge role */}
          <div className="flex items-center gap-2 bg-blue-800 px-4 py-2 rounded-full text-sm">
            <span className="text-blue-300">
              {isAdmin ? '👨‍💼' : '👨‍🎓'}
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-white">{user?.nom} {user?.prenom}</span>
              <span className="text-blue-300 text-xs capitalize">{user?.role}</span>
            </div>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="bg-white text-blue-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-100 transition flex items-center gap-1"
          >
            🚪 Déconnexion
          </button>

        </div>

        {/* ── Mobile Menu Button ── */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

      </div>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div className="md:hidden bg-blue-800 px-6 py-4 flex flex-col gap-4">

          <Link to="/cours" onClick={() => setMenuOpen(false)}
            className="text-blue-100 hover:text-white transition">
            📚 Cours
          </Link>

          {isAdmin && (
            <Link to="/feedback" onClick={() => setMenuOpen(false)}
              className="text-blue-100 hover:text-white transition">
              💬 Feedbacks
            </Link>
          )}

          {isStudent && (
            <>
              <Link to="/feedback/student" onClick={() => setMenuOpen(false)}
                className="text-blue-100 hover:text-white transition">
                📝 Mes Feedbacks
              </Link>
              <Link to="/feedback/top" onClick={() => setMenuOpen(false)}
                className="text-blue-100 hover:text-white transition">
                ⭐ Top Cours
              </Link>
            </>
          )}

          <hr className="border-blue-600" />

          <div className="text-sm text-blue-300">
            {isAdmin ? '👨‍💼' : '👨‍🎓'} {user?.nom} {user?.prenom} — {user?.role}
          </div>

          <button
            onClick={handleLogout}
            className="bg-white text-blue-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-100 transition text-center"
          >
            🚪 Déconnexion
          </button>

        </div>
      )}

    </nav>
  );
};

export default Navbar;