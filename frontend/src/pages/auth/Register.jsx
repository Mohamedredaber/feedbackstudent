import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    role: 'student',
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(formData);
    if (result.meta.requestStatus === 'fulfilled') {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">

      {/* ── Header ── */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">🎓 StudentFeedback</h1>
        <p className="text-gray-500 mt-1">Créer un compte</p>
      </div>

      {/* ── Succès ── */}
      {success && (
        <div className="bg-green-100 text-green-600 px-4 py-3 rounded-lg mb-4 text-sm">
          ✅ Compte créé ! Redirection vers le login...
        </div>
      )}

      {/* ── Erreur ── */}
      {error && (
        <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
          ❌ {error}
        </div>
      )}

      {/* ── Formulaire ── */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Dupont"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              placeholder="Jean"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jean@test.com"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? ' Inscription...' : "S'inscrire"}
        </button>

      </form>

      {/* ── Login Link ── */}
      <p className="text-center text-sm text-gray-500 mt-4">
        Déjà un compte ?{' '}
        <Link to="/login" className="text-blue-600 font-semibold hover:underline">
          Se connecter
        </Link>
      </p>

    </div>
  );
};

export default Register;