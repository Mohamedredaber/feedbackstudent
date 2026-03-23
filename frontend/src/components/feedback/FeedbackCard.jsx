import StarRating from "../common/StarRating";

const FeedbackCard = ({ feedback }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {feedback.coursTitle}
        </h3>
        <StarRating rating={feedback.note} readonly />
      </div>

      <p className="text-gray-600 mb-4">{feedback.commentaire}</p>

      <div className="text-sm text-gray-500">Par {feedback.studentEmail}</div>
    </div>
  );
};

export default FeedbackCard;
