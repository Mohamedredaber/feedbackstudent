import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import {
  selectUser,
  selectToken,
  selectAuthLoading,
  selectAuthError,
  selectIsAuthenticated
} from '../features/auth/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,     
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student',
    isVisitor: !user,
    logout: () => dispatch(logout()),
  };
};

export default useAuth;