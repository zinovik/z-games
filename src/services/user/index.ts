import { IUser, IRegister, IActivate, ILogin, IForgotPassword } from '../../interfaces';

const makePostRequest = async (serverUrl: string, route: string, body: IRegister | IActivate | ILogin | IForgotPassword) => {
  const fetchResult = await fetch(`${serverUrl}/api/users/${route}`, {
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

export const registerUser = async (serverUrl: string, username: string, password: string, email: string): Promise<IUser> => {
  return await makePostRequest(serverUrl, 'register', {
    username,
    password,
    email,
  });
};

export const activateUser = async (serverUrl: string, token: string): Promise<{ token: string }> => {
  return await makePostRequest(serverUrl, 'activate', {
    token,
  });
};

export const authorizeUser = async (serverUrl: string, username: string, password: string): Promise<{ token: string }> => {
  return await makePostRequest(serverUrl, 'authorize', {
    username,
    password,
  });
};

export const forgotUserPassword = async (serverUrl: string, username: string): Promise<{ token: string }> => {
  return await makePostRequest(serverUrl, 'forgot-password', {
    username,
  });
};

export const fetchUsersRating = async (serverUrl: string): Promise<IUser[]> => {
  const fetchResult = await fetch(`${serverUrl}/api/users`);

  return await fetchResult.json();
};
