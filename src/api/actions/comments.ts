import { TComments } from './types';
import config from '../../config/config';

const { API_URL } = config;

const apiGetComments = async (): Promise<TComments[] | []> => {
  let comments: TComments[] | [] = [];
  try {
    const response = await fetch(`${API_URL}/comments`);
    const data = await response.json();
    comments = data as TComments[];
    return comments;
  } catch (error) {
    return comments;
  }
};

export default apiGetComments;
