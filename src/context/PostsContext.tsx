import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import apiGetPosts from '../api/actions/posts';
import apiGetComments from '../api/actions/comments';
import apiGetUsers from '../api/actions/users';
import {
  TPostsContext,
  TPostsProviderProps,
  TGeneratedPost,
} from '../config/types';
import config from '../config/config';

const PostsContext = createContext({} as TPostsContext);
const usePosts = () => {
  return useContext(PostsContext);
};

let filterByUsernameTimeout: ReturnType<typeof setTimeout> | null;

function PostsProvider({ children }: TPostsProviderProps) {
  const [posts, setPosts] = useState<TGeneratedPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<TGeneratedPost[]>([]);
  const [filterByUsername, setFilterByUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const getPosts = useCallback(async () => {
    setLoading(true);

    const [postsData, commentsData, usersData] = await Promise.all([
      apiGetPosts(),
      apiGetComments(),
      apiGetUsers(),
    ]);

    const newPosts = postsData.map((post) => {
      return {
        comments: commentsData.filter((comment) => comment.postId === post.id),
        user: usersData.find((user) => user.id === post.userId),
        ...post,
      };
    });
    setPosts(newPosts);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (filterByUsernameTimeout) {
      clearTimeout(filterByUsernameTimeout);
      filterByUsernameTimeout = null;
    }

    setLoading(true);
    setFilterByUsername(filterByUsername);

    if (filterByUsername.length > 0) {
      filterByUsernameTimeout = setTimeout(() => {
        const lowerCaseFilterByUsername = filterByUsername.toLowerCase();
        const postsFilteredByUsername = posts.filter((item) => {
          return (
            item.user?.name.toLowerCase().includes(lowerCaseFilterByUsername) ||
            item.user?.username
              .toLowerCase()
              .includes(lowerCaseFilterByUsername)
          );
        });

        setFilteredPosts(postsFilteredByUsername);
        setLoading(false);
      }, config.filterByDelay);
    } else {
      setFilteredPosts([]);
      setLoading(false);
    }
  }, [filterByUsername, posts]);

  return (
    <PostsContext.Provider
      value={useMemo(
        () => ({
          posts,
          getPosts,
          filteredPosts,
          filterByUsername,
          setFilterByUsername,
          loading,
        }),
        [
          posts,
          getPosts,
          filteredPosts,
          filterByUsername,
          setFilterByUsername,
          loading,
        ]
      )}
    >
      {children}
    </PostsContext.Provider>
  );
}

export { usePosts, PostsProvider };
