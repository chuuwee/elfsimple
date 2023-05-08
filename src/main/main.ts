import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { registerAuthHandlers } from '_main/auth';
import { registerUsersHandlers } from '_main/users';
import { isDev } from '../config';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    minWidth: 900,
    height: 750,
    minHeight: 600,
    webPreferences: {
      devTools: isDev,
      preload: path.join(__dirname, './preload.bundle.js'),
      webSecurity: !isDev,
    },
  });

 //mainWindow.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));
  mainWindow.loadFile('index.html').finally(() => { /* no action */ });
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

registerAuthHandlers(ipcMain);
registerUsersHandlers(ipcMain);