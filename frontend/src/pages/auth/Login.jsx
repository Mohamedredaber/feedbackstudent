import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/cours');
  }, [isAuthenticated]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">

      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">🎓 StudentFeedback</h1>
        <p className="text-gray-500 mt-1">Connectez-vous à votre compte</p>
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
           {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="admin@test.com"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe
          </label>
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

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? ' Connexion...' : 'Se connecter'}
        </button>

      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        Pas de compte ?{' '}
        <Link to="/register" className="text-blue-600 font-semibold hover:underline">
          S'inscrire
        </Link>
      </p>

    </div>
  );
};

export default Login;