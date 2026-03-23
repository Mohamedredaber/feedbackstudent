import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, isAdmin, isStudent, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to="/cours" className="text-xl font-bold tracking-wide">
          🎓 StudentFeedback
        </Link>

        {/* ── Links ── */}
        <div className="flex items-center gap-6">
          <Link to="/cours" className="hover:text-blue-200 transition">
            Cours
          </Link>

          {/* Admin seulement */}
          {isAdmin && (
            <Link to="/feedback" className="hover:text-blue-200 transition">
              Feedbacks
            </Link>
          )}

          {/* Student seulement */}
          {isStudent && (
            <>
              <Link to="/feedback/student" className="hover:text-blue-200 transition">
                Mes Feedbacks
              </Link>
              <Link to="/feedback/top" className="hover:text-blue-200 transition">
                Top Cours
              </Link>
            </>
          )}
        </div>

        {/* ── User + Logout ── */}
        <div className="flex items-center gap-4">
          <span className="text-sm bg-blue-700 px-3 py-1 rounded-full">
            👤 {user?.email} — {user?.role}
          </span>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-semibold hover:bg-blue-100 transition"
          >
            Déconnexion
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;