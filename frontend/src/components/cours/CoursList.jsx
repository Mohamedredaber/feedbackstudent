import { useEffect } from "react";
import { Link } from "react-router-dom";
import useCours from "../../hooks/useCours";
import Loader from "../common/Loader";
import CoursCard from "./CoursCard";

const CoursList = () => {
  const { cours, loading, error, fetchAllCours } = useCours();

  useEffect(() => {
    fetchAllCours();
  }, [fetchAllCours]);

  if (loading) return <Loader />;
  if (error)
    return <div className="text-red-500 text-center">Erreur: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Liste des Cours</h1>
      </div>

      {cours.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          Aucun cours disponible pour le moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cours.map((coursItem) => (
            <CoursCard key={coursItem._id} cours={coursItem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursList;
