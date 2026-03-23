import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { login, register } from '../features/auth/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector((state) => state.auth);

  return {

    user,
    token,
    loading,
    error,

    // ── Infos utilisateur ──────────────
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student',

    // ── Actions ────────────────────────
    login: (credentials) => dispatch(login(credentials)),
    register: (userData) => dispatch(register(userData)),
    logout: () => dispatch(logout()),
  };
};

export default useAuth;