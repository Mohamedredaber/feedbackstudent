import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch,useSelector  } from 'react-redux';
import { fetchById } from '../../../features/cours/coursSlice';
import { selectCoursErrorById, selectCoursById } from '../../../features/cours/coursSlice';

export default function DetailsCours() {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const cours = useSelector(selectCoursById);
  const error = useSelector(selectCoursErrorById);
  useEffect(() => {
    if (id) dispatch(fetchById(id));
  }, [dispatch, id]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!cours) return <p>Aucun cours trouvé</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-3">{cours.title}</h2>
      <p className="text-gray-500 mb-2">{cours.description}</p>
      <p className="text-sm text-gray-400 mb-1"><strong>Catégorie:</strong> {cours.category}</p>
      <p className="text-sm text-gray-400 mb-1"><strong>Instructeur:</strong> {cours.instructor}</p>
      <p className="text-xs text-gray-300">
        Créé le {new Date(cours.createdAt).toLocaleDateString()} | Mis à jour le {new Date(cours.updatedAt).toLocaleDateString()}
      </p>
    </div>
  );
}