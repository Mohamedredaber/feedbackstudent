import { Link } from 'react-router-dom';

const Home = () => (
  <div className="min-h-screen flex flex-col bg-gray-50">

    {/* ── Navbar ── */}
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <span className="text-xl font-bold">🎓 StudentFeedback</span>
        <div className="flex gap-4">
          <Link to="/login" className="hover:text-blue-200 transition">
            Se connecter
          </Link>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-semibold hover:bg-blue-100 transition"
          >
            S'inscrire
          </Link>
        </div>
      </div>
    </nav>

    {/* ── Hero ── */}
    <main className="flex-1">

      {/* Section 1 — Hero */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Bienvenue sur StudentFeedback
        </h1>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Une plateforme microservices pour gérer les feedbacks des étudiants sur les cours.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition"
          >
            Commencer
          </Link>
          <Link
            to="/login"
            className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Se connecter
          </Link>
        </div>
      </section>

      {/* Section 2 — Features */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Fonctionnalités
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Gestion des Cours</h3>
            <p className="text-gray-500">
              Ajoutez, modifiez et supprimez des cours par catégorie et instructeur.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Feedbacks Étudiants</h3>
            <p className="text-gray-500">
              Les étudiants peuvent noter et commenter les cours qu'ils ont suivis.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Sécurité JWT</h3>
            <p className="text-gray-500">
              Authentification sécurisée avec rôles student et admin.
            </p>
          </div>

        </div>
      </section>

      {/* Section 3 — Roles */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Deux rôles disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">

            <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-blue-500">
              <h3 className="text-xl font-bold text-blue-600 mb-3">👨‍🎓 Student</h3>
              <ul className="text-gray-600 space-y-2">
                <li>✅ Voir la liste des cours</li>
                <li>✅ Ajouter des feedbacks</li>
                <li>✅ Voir ses feedbacks</li>
                <li>✅ Voir les top cours</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-green-600 mb-3">👨‍💼 Admin</h3>
              <ul className="text-gray-600 space-y-2">
                <li>✅ Gérer les cours</li>
                <li>✅ Voir tous les feedbacks</li>
                <li>✅ Modifier les feedbacks</li>
                <li>✅ Supprimer les feedbacks</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

    </main>

    {/* ── Footer ── */}
    <footer className="bg-blue-600 text-white text-center py-4">
      <p className="text-sm">
        © {new Date().getFullYear()} StudentFeedback — Cloud Native Microservices
      </p>
    </footer>

  </div>
);

export default Home;