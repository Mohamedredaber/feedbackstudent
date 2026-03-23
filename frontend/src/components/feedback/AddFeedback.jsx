import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFeedback from "../../hooks/useFeedback";
import useCours from "../../hooks/useCours";
import StarRating from "../common/StarRating";

const AddFeedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addFeedback, loading, error } = useFeedback();
  const { selectedCours, fetchCoursById } = useCours();

  const [formData, setFormData] = useState({
    note: 5,
    commentaire: "",
  });

  useEffect(() => {
    if (id) {
      fetchCoursById(id);
    }
  }, [id, fetchCoursById]);

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, note: rating });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addFeedback(id, formData);
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/feedback/student");
    }
  };

  if (!selectedCours) return <div>Chargement du cours...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Donner un Feedback
          </h1>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {selectedCours.title}
            </h2>
            <p className="text-gray-600">{selectedCours.description}</p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note
              </label>
              <StarRating
                rating={formData.note}
                onChange={handleRatingChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commentaire
              </label>
              <textarea
                name="commentaire"
                value={formData.commentaire}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Partagez votre expérience avec ce cours..."
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Envoi..." : "Envoyer le Feedback"}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/cours/${id}`)}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFeedback;
