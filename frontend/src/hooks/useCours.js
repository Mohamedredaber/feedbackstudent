import { useSelector, useDispatch } from "react-redux";
import {
  getAllCours,
  getCoursById,
  getCoursByCategory,
  createCours,
} from "../features/cours/coursSlice";

const useCours = () => {
  const dispatch = useDispatch();
  const { cours, selectedCours, loading, error } = useSelector(
    (state) => state.cours,
  );

  return {
    cours,
    selectedCours,
    loading,
    error,

    // Actions
    fetchAllCours: () => dispatch(getAllCours()),
    fetchCoursById: (id) => dispatch(getCoursById(id)),
    fetchCoursByCategory: (category) => dispatch(getCoursByCategory(category)),
    createCours: (data) => dispatch(createCours(data)),
  };
};

export default useCours;
