import axios, { AxiosResponse } from 'axios';
import { setUser, unsetUser } from '_main/users';

const getCookies = (response: AxiosResponse) => {
  const cookies = response.headers['set-cookie'];
  if (cookies == null || cookies.length === 1) {
    return null;
  }
  return cookies;
};

const login = async ({ username, password }: { username: string; password: string; }) => {
  const data = new URLSearchParams({
    login: username,
    password: password,
    submit: 'log in',
    email: '',
  });

  try {
    const response = await axios.post(
      'http://lineageeq.dkpsystem.com/login.php',
      data.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true,
        maxRedirects: 0,
        validateStatus: (status) => status < 400,
      }
    );
    const cookies = getCookies(response);
    if (cookies != null) {
      setUser({ username, cookies });
      return { success: true };
    } else {
      return { success: false, message: 'Invalid username or password' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: 'An error occurred during the login process' };
  }
};

const logout = async () => unsetUser();

export const registerAuthHandlers = (ipcMain: Electron.IpcMain) => {
  ipcMain.handle('login', async (_, ...args: Parameters<typeof login>) => await login(...args));
  ipcMain.handle('logout', async (_, ...args: Parameters<typeof logout>) => await logout(...args));
};