import { Routes, Route, Navigate } from 'react-router-dom';
import { PostsProvider } from './context/PostsContext';
import Header from './components/Header';
import Posts from './pages/Posts';
import Post from './pages/Post';
import Footer from './components/Footer';
import './App.css';

const propsMessage = 'Hello from';

function App() {
  console.log(`${propsMessage} App`);

  return (
    <PostsProvider>
      <Header propsMessage={propsMessage} />
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/posts" />} />
          <Route
            path="/posts"
            element={<Posts propsMessage={propsMessage} />}
          />
          <Route
            path="/posts/:id"
            element={<Post propsMessage={propsMessage} />}
          />
          <Route path="*" element={<Navigate replace to="/posts" />} />
        </Routes>
      </main>
      <Footer propsMessage={propsMessage} />
    </PostsProvider>
  );
}

export default App;
