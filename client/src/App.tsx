import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import GamesPage from './pages/Games.page';
import LoginPage from './pages/Login.page';
import './styles/index.scss';
import Layout from './components/Layout';
import RequireUser from './components/RequireUser';
import { useAppSelector } from './store';
import { selectLoggedIn } from './store/slices/userSlice';
import { useLayoutEffect } from 'react';

function App() {
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (isLoggedIn) {
      return navigate('/games');
    }
  }, [isLoggedIn]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/games" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<RequireUser />}>
            <Route path="games" element={<GamesPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
