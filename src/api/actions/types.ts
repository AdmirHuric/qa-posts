export type TPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type TComments = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
