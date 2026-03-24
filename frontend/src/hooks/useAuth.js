import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import {
  selectUser,
  selectToken,
  selectAuthLoading,
  selectAuthError
} from '../features/auth/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();

  // ✅ Chaque selector est indépendant — re-render uniquement si SA valeur change
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student',
    logout: () => dispatch(logout()),
  };
};

export default useAuth;