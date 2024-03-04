import { Link } from 'react-router-dom';
import { TGeneratedPost } from '../config/types';
import { usePosts } from '../context/PostsContext';
import styles from '../assets/styles/Posts.module.css';
import useOnMountUnsafe from '../hooks/onMountUnsafe';
import Loader from '../components/Loader';
import Post from '../components/PostCard';

function Posts() {
  const { getPosts, posts, loading } = usePosts();

  useOnMountUnsafe(() => {
    getPosts();
  });

  return (
    <div className={styles['posts-container']}>
      <div className={styles.title}>
        <h1>All Posts</h1>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className={styles.posts}>
          {posts.map((item: TGeneratedPost) => {
            return (
              <Link key={item.id} to={`/posts/${item.id}`}>
                <Post post={item} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Posts;
