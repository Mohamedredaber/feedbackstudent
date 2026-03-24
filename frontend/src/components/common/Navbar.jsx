import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {
  GraduationCap, BookOpen, MessageSquare, FileText,
  Star, LogOut, Menu, X, ChevronDown, User, Home
} from 'lucide-react';

const Navbar = () => {
  const { user, isAdmin, isStudent, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) =>
    location.pathname === path
      ? 'bg-blue-800 text-white'
      : 'text-blue-100 hover:bg-blue-600 hover:text-white';

  const navLinks = [
    {
      to: '/',
      label: 'Accueil',
      icon: <Home size={16} />,
      show: true  
    },
    {
      to: '/cours',
      label: 'Cours',
      icon: <BookOpen size={16} />,
      show: isAuthenticated
    },
    {
      to: '/feedback',
      label: 'Feedbacks',
      icon: <MessageSquare size={16} />,
      show: isAdmin  // ✅ admin seulement
    },
    {
      to: '/feedback/student',
      label: 'Mes Feedbacks',
      icon: <FileText size={16} />,
      show: isStudent  
    },
    {
      to: '/feedback/top',
      label: 'Top Cours',
      icon: <Star size={16} />,
      show: isAuthenticated  
    },
  ].filter(l => l.show);

  return (
    <nav className="bg-blue-700 shadow-lg">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white text-xl font-bold tracking-tight">
          <GraduationCap size={28} className="text-blue-200" />
          <span>StudentFeedback</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${isActive(link.to)}`}
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop — User connecté */}
        <div className="hidden md:flex items-center relative">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => setDropdownOpen(prev => !prev)}
                className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 transition px-4 py-2 rounded-xl text-sm text-white"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <User size={16} />
                </div>
                <div className="flex flex-col items-start leading-tight">
                  <span className="font-semibold">{user?.nom} {user?.prenom}</span>
                  <span className={`text-xs capitalize ${isAdmin ? 'text-green-300' : 'text-blue-300'}`}>
                    {isAdmin ? '👨‍💼 Admin' : '👨‍🎓 Étudiant'}
                  </span>
                </div>
                <ChevronDown size={14} className={`text-blue-300 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-14 w-52 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                  {/* Infos utilisateur */}
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <p className="text-sm font-semibold text-gray-800">{user?.nom} {user?.prenom}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                    <span className={`inline-block mt-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${isAdmin ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {isAdmin ? 'Administrateur' : 'Étudiant'}
                    </span>
                  </div>

                  {/* Liens rapides selon rôle */}
                  {isStudent && (
                    <Link to="/feedback/student"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition">
                      <FileText size={14} /> Mes Feedbacks
                    </Link>
                  )}
                  {isAdmin && (
                    <Link to="/feedback"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition">
                      <MessageSquare size={14} /> Gérer les feedbacks
                    </Link>
                  )}

                  <div className="border-t border-gray-100">
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition">
                      <LogOut size={14} /> Déconnexion
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            // ✅ Boutons login/register si non connecté
            <div className="flex items-center gap-2">
              <Link to="/login"
                className="text-blue-100 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition hover:bg-blue-600">
                Se connecter
              </Link>
              <Link to="/register"
                className="bg-white text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition">
                S'inscrire
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-blue-600 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-800 px-4 py-4 flex flex-col gap-1 border-t border-blue-600">

          {navLinks.map(link => (
            <Link key={link.to} to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${isActive(link.to)}`}
            >
              {link.icon} {link.label}
            </Link>
          ))}

          <hr className="border-blue-600 my-2" />

          {isAuthenticated ? (
            <>
              {/* Badge rôle mobile */}
              <div className="flex items-center gap-3 px-4 py-2">
                <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{user?.nom} {user?.prenom}</p>
                  <span className={`text-xs ${isAdmin ? 'text-green-300' : 'text-blue-300'}`}>
                    {isAdmin ? '👨‍💼 Administrateur' : '👨‍🎓 Étudiant'}
                  </span>
                </div>
              </div>
              <button onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-3 mt-1 rounded-lg text-sm text-red-300 hover:bg-blue-700 transition">
                <LogOut size={16} /> Déconnexion
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 px-2">
              <Link to="/login" onClick={() => setMenuOpen(false)}
                className="text-center py-2.5 border border-blue-500 text-blue-100 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                Se connecter
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}
                className="text-center py-2.5 bg-white text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-50 transition">
                S'inscrire
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;