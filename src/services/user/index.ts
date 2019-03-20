
import { SERVER_URL } from '../';
import * as types from '../../constants';

interface IRegister {
  username?: string;
  password: string;
  email: string;
}

interface IActivate {
  token: string;
}

interface ILogin {
  username: string;
  password: string;
}

const makeRequest = async (route: string, body: IRegister | IActivate | ILogin) => {
  const fetchResult = await fetch(`${SERVER_URL}/api/users/${route}`, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const fetchResultParsed = await fetchResult.json();

  if (fetchResultParsed.error) {
    throw new Error(fetchResultParsed.message);
  }

  return fetchResultParsed;
};

export const register = async (username: string, password: string, email: string): Promise<types.IUser> => {
  return await makeRequest('register', {
    username,
    password,
    email,
  });
};

export const activate = async (token: string): Promise<{ token: string }> => {
  return await makeRequest('activate', {
    token,
  });
};

export const login = async (username: string, password: string): Promise<{ token: string }> => {
  return await makeRequest('authorize', {
    username,
    password,
  });
};
