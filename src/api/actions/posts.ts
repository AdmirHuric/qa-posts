import { TPost } from '../../config/types';
import config from '../../config/config';

const { API_URL } = config;

const apiGetPosts = async (): Promise<TPost[] | []> => {
  let posts: TPost[] | [] = [];
  try {
    const response = await fetch(`${API_URL}/posts`);
    const data = await response.json();
    posts = data as TPost[];
    return posts;
  } catch (error) {
    console.log(error);
    return posts;
  }
};

export default apiGetPosts;
