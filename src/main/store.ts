import ElectronStore from 'electron-store';

interface User {
  username: string;
  cookies: string[];
}

interface Store {
  user: User | undefined;
  logPath: string | undefined;
}

const store = new ElectronStore<Store>();

export const getUser = () => store.get('user') ?? null;

export const setUser = (user: User | null) => {
  if (user == null) {
    store.delete('user');
    return;
  }
  const { username, cookies } = user;
  store.set('user', { username, cookies });
};

export const getLogPath = () => store.get('logPath') ?? null;

export const setLogPath = (logPath: string | null) => {
  if (logPath == null) {
    store.delete('logPath');
    return;
  }
  store.set('logPath', logPath);
};

export const registerStoreHandlers = (ipcMain: Electron.IpcMain) => {
  ipcMain.handle('getCurrentUser', () => {
    const user = getUser();
    return user != null ? user.username : null;
  });

  ipcMain.handle('getLogPath', () => getLogPath());
  ipcMain.handle('setLogPath', (_, filePath: string) => {
    setLogPath(filePath);
  });
};