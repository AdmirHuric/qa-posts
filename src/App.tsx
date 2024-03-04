import { Routes, Route, Navigate } from 'react-router-dom';
import { PostsProvider } from './context/PostsContext';
import Header from './components/Header';
import Posts from './pages/Posts';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <PostsProvider>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/posts" />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="*" element={<Navigate replace to="/posts" />} />
        </Routes>
      </main>
      <Footer />
    </PostsProvider>
  );
}

export default App;
