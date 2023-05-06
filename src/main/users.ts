import ElectronStore from 'electron-store';

interface User {
  username: string;
  cookies: string[];
}

interface Store {
  user: User | undefined;
}

const store = new ElectronStore<Store>();

export const getUser = () => store.get('user') ?? null;

export const setUser = ({
  username,
  cookies,
 }: {
  username: string;
  cookies: string[];
}) => {
  store.set('user', { username, cookies })
};

export const unsetUser = () => store.delete('user');

export const registerUsersHandlers = (ipcMain: Electron.IpcMain) => {
  ipcMain.handle('getCurrentUser', (_, ...args: Parameters<typeof getUser>) => getUser(...args)?.username);
};