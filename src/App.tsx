import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import Login from './pages/Login';
import User from './pages/User';
import NotFound from './pages/NotFound';
import Context from './context/context';

function App() {
  const ctx = useContext(Context);

  return (
    <Routes>
      <Route path="/" element={<User {...ctx} />} />
      <Route path="/login" element={<Login isLoggedIn={ctx.isLoggedIn} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
