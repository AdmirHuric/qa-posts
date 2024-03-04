import { Routes, Route, Navigate } from 'react-router-dom';
import Posts from './pages/Posts';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/posts" />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="*" element={<Navigate replace to="/posts" />} />
    </Routes>
  );
}

export default App;
