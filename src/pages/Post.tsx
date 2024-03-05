import { Link, useParams } from 'react-router-dom';
import { usePosts } from '../context/PostsContext';
import PostCard from '../components/PostCard';
import useOnMountUnsafe from '../hooks/onMountUnsafe';
import Loader from '../components/Loader';
import { TGeneratedPost } from '../config/types';
import styles from '../assets/styles/Posts.module.css';

interface PostProps {
  propsMessage: string;
}

const findPost = (
  posts: TGeneratedPost[],
  id: string | undefined
): TGeneratedPost | undefined => {
  return posts.find((item) => item.id.toString() === id);
};

function Post({ propsMessage }: PostProps) {
  console.log(`${propsMessage} Post`);

  const { id } = useParams();
  const { posts, getPosts, loading } = usePosts();
  const post = findPost(posts, id);

  useOnMountUnsafe(() => {
    if (!findPost(posts, id)) {
      getPosts();
    }
  });

  return (
    <div className={styles['posts-container']}>
      <div className={styles.title}>
        <h1>Post by {post?.user?.username || '...'}</h1>
      </div>
      {loading ? (
        <Loader propsMessage={propsMessage} />
      ) : (
        <div className={styles.posts}>
          {post ? (
            <PostCard propsMessage={propsMessage} post={post} />
          ) : (
            <div className={styles['no-post']}>
              <div>{`No post with id: ${id}`}</div>
              <Link to="/">Go Home</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Post;
