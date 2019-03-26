
import { SERVER_URL } from '../../config';
import { IUser, IRegister, IActivate, ILogin } from '../../interfaces';

const makePostRequest = async (route: string, body: IRegister | IActivate | ILogin) => {
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

export const registerUser = async (username: string, password: string, email: string): Promise<IUser> => {
  return await makePostRequest('register', {
    username,
    password,
    email,
  });
};

export const activateUser = async (token: string): Promise<{ token: string }> => {
  return await makePostRequest('activate', {
    token,
  });
};

export const authorizeUser = async (username: string, password: string): Promise<{ token: string }> => {
  return await makePostRequest('authorize', {
    username,
    password,
  });
};

export const fetchUsersRating = async (): Promise<IUser[]> => {
  const fetchResult = await fetch(`${SERVER_URL}/api/users`);

  return await fetchResult.json();
};
