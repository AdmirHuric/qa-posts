import { TComment } from '../../config/types';
import config from '../../config/config';

const { API_URL } = config;

const apiGetComments = async (): Promise<TComment[] | []> => {
  let comments: TComment[] | [] = [];
  try {
    const response = await fetch(`${API_URL}/comments`);
    const data = await response.json();
    comments = data as TComment[];
    return comments;
  } catch (error) {
    console.log(error);
    return comments;
  }
};

export default apiGetComments;
