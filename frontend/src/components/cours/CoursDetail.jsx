import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useCours from "../../hooks/useCours";
import Loader from "../common/Loader";

const CoursDetail = () => {
  const { id } = useParams();
  const { selectedCours, loading, error, fetchCoursById } = useCours();

  useEffect(() => {
    if (id) {
      fetchCoursById(id);
    }
  }, [id, fetchCoursById]);

  if (loading) return <Loader />;
  if (error)
    return <div className="text-red-500 text-center">Erreur: {error}</div>;
  if (!selectedCours)
    return <div className="text-center">Cours non trouvé</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {selectedCours.title}
                </h1>
                <p className="text-gray-600">Par {selectedCours.instructor}</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {selectedCours.category}
              </span>
            </div>

            <div className="prose max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed">
                {selectedCours.description}
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                to={`/feedback/add/${selectedCours._id}`}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Donner un feedback
              </Link>
              <Link
                to="/cours"
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                Retour à la liste
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursDetail;
