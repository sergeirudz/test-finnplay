import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import './styles/index.scss';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
