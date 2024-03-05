import { Dispatch, ReactNode, SetStateAction } from 'react';

export type TPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type TComment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type TUser = {
  name: string;
  username: string;
  id: number;
};

export type TPostsProviderProps = {
  children: ReactNode;
};

export type TGeneratedPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments: TComment[] | [];
  user: TUser | undefined;
};

export type TPostsContext = {
  posts: TGeneratedPost[];
  getPosts: () => void;
  filteredPosts: TGeneratedPost[];
  filterByUsername: string;
  setFilterByUsername: Dispatch<SetStateAction<string>>;
  loading: boolean;
};
