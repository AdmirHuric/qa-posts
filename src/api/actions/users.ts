import { TUser } from '../../config/types';
import config from '../../config/config';

const { API_URL } = config;

const apiGetUsers = async (): Promise<TUser[] | []> => {
  let users: TUser[] | [] = [];
  try {
    const response = await fetch(`${API_URL}/users`);
    const data = await response.json();
    users = data.map((user: { username: string; name: string; id: number }) => {
      const { username, name, id } = user;
      return {
        username,
        name,
        id,
      };
    });
    return users;
  } catch (error) {
    return users;
  }
};

export default apiGetUsers;
