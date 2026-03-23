import { useEffect } from "react";
import useFeedback from "../../hooks/useFeedback";
import Loader from "../common/Loader";
import FeedbackCard from "./FeedbackCard";

const StudentFeedback = () => {
  const { feedbacks, loading, error, fetchStudentFeedbacks } = useFeedback();

  useEffect(() => {
    fetchStudentFeedbacks();
  }, [fetchStudentFeedbacks]);

  if (loading) return <Loader />;
  if (error)
    return <div className="text-red-500 text-center">Erreur: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mes Feedbacks</h1>

      {feedbacks.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          Vous n'avez pas encore donné de feedback.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((feedback) => (
            <FeedbackCard key={feedback._id} feedback={feedback} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentFeedback;
