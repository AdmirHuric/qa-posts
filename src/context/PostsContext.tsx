import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import apiGetPosts from '../api/actions/posts';
import apiGetComments from '../api/actions/comments';
import apiGetUsers from '../api/actions/users';
import {
  TPostsContext,
  TPostsProviderProps,
  TGeneratedPost,
} from '../config/types';

const PostsContext = createContext({} as TPostsContext);
const usePosts = () => {
  return useContext(PostsContext);
};

function PostsProvider({ children }: TPostsProviderProps) {
  const [posts, setPosts] = useState<TGeneratedPost[]>([]);
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

  return (
    <PostsContext.Provider
      value={useMemo(
        () => ({ posts, getPosts, loading }),
        [posts, getPosts, loading]
      )}
    >
      {children}
    </PostsContext.Provider>
  );
}

export { usePosts, PostsProvider };
