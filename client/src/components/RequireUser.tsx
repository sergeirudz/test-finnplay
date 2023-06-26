import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store';
import { selectLoggedIn } from '../store/slices/userSlice';

const RequireUser = () => {
  const logged_in = useAppSelector(selectLoggedIn);
  const location = useLocation();

  return logged_in ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireUser;
