import { usePosts } from '../context/PostsContext';
import styles from '../assets/styles/Posts.module.css';
import useOnMountUnsafe from '../hooks/onMountUnsafe';
import Loader from '../components/Loader';

function Posts() {
  const { getPosts, posts, loading } = usePosts();

  useOnMountUnsafe(() => {
    getPosts();
  });
  console.log(posts);
  return (
    <div className={styles['posts-container']}>
      <div className={styles.title}>
        <h1>All Posts</h1>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className={styles.posts}>
          {posts.map((item) => {
            return (
              <div className={styles.post} key={`post-${item.id}`}>
                <span>{item.title}</span>
                <p>{item.body}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Posts;
