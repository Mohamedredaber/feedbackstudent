import { useSelector, useDispatch } from "react-redux";
import {
  getAllFeedbacks,
  getFeedbackByCours,
  getStudentFeedback,
  getTopCourses,
  addFeedback,
} from "../features/feedback/feedbackSlice";

const useFeedback = () => {
  const dispatch = useDispatch();
  const { feedbacks, loading, error } = useSelector((state) => state.feedback);

  return {
    feedbacks,
    loading,
    error,

    // Actions
    fetchAllFeedbacks: () => dispatch(getAllFeedbacks()),
    fetchFeedbackByCours: (coursTitle) =>
      dispatch(getFeedbackByCours(coursTitle)),
    fetchStudentFeedbacks: () => dispatch(getStudentFeedback()),
    fetchTopCourses: () => dispatch(getTopCourses()),
    addFeedback: (courseId, data) =>
      dispatch(addFeedback({ id: courseId, data })),
  };
};

export default useFeedback;
