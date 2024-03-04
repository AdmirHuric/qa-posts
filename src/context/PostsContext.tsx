import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import apiGetPosts from '../api/actions/posts';
import apiGetComments from '../api/actions/comments';
import { TComments } from '../api/actions/types';

type TPostsProviderProps = {
  children: ReactNode;
};

type TGeneratedPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments: TComments[] | [];
};

type TPostsContext = {
  posts: TGeneratedPost[];
  getPosts: () => void;
  loading: boolean;
};

const PostsContext = createContext({} as TPostsContext);
const usePosts = () => {
  return useContext(PostsContext);
};

function PostsProvider({ children }: TPostsProviderProps) {
  const [posts, setPosts] = useState<TGeneratedPost[]>([]);
  const [loading, setLoading] = useState(false);

  const getPosts = useCallback(async () => {
    setLoading(true);

    const [postsData, commentsData] = await Promise.all([
      apiGetPosts(),
      apiGetComments(),
    ]);

    const newPosts = postsData.map((post) => {
      return {
        comments: commentsData.filter((comment) => comment.postId === post.id),
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
