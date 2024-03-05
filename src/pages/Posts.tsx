import { Link } from 'react-router-dom';
import { TGeneratedPost } from '../config/types';
import { usePosts } from '../context/PostsContext';
import useOnMountUnsafe from '../hooks/onMountUnsafe';
import Loader from '../components/Loader';
import PostCard from '../components/PostCard';
import styles from '../assets/styles/Posts.module.css';

interface PostsProps {
  propsMessage: string;
}

function Posts({ propsMessage }: PostsProps) {
  console.log(`${propsMessage} Posts`);

  const {
    getPosts,
    posts,
    filteredPosts,
    filterByUsername,
    setFilterByUsername,
    loading,
  } = usePosts();

  const filterByUsernameInProgress = filterByUsername.length > 0;
  const renderedPosts = (filterByUsernameInProgress && filteredPosts) || posts;
  const hasPosts = renderedPosts.length > 0;

  useOnMountUnsafe(() => {
    getPosts();
  });

  return (
    <div className={styles['posts-container']}>
      <div className={styles.title}>
        <h1>All Posts</h1>
      </div>
      <div className={styles['filter-by-form']}>
        <input
          type="text"
          placeholder="Filter by user's name or username..."
          value={filterByUsername}
          onChange={(e) => setFilterByUsername(e.target.value)}
          disabled={!filterByUsernameInProgress && !hasPosts}
        />
      </div>

      {(loading && <Loader propsMessage={propsMessage} />) || (
        <div className={styles.posts}>
          {(hasPosts &&
            renderedPosts.map((item: TGeneratedPost) => {
              return (
                <Link key={item.id} to={`/posts/${item.id}`}>
                  <PostCard propsMessage={propsMessage} post={item} />
                </Link>
              );
            })) || (
            <div className={styles['no-post']}>
              <div>No posts</div>
              {filterByUsernameInProgress ? (
                <button type="button" onClick={() => setFilterByUsername('')}>
                  Clear filter
                </button>
              ) : (
                <Link to="/">Reload</Link>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Posts;
