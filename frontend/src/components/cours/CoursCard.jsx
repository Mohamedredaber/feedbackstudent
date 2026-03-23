import { Link } from "react-router-dom";

const CoursCard = ({ cours }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {cours.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {cours.description}
        </p>

        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {cours.category}
          </span>
          <span>Par {cours.instructor}</span>
        </div>

        <Link
          to={`/cours/${cours._id}`}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Voir les détails
        </Link>
      </div>
    </div>
  );
};

export default CoursCard;
