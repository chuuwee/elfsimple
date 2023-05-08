import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { registerAuthHandlers } from '_main/auth';
import { registerStoreHandlers } from '_/main/store';
import { isDev } from '../config';
import { registerMonitorHandlers } from './monitor/monitor';

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

  mainWindow.loadFile('index.html').finally(() => { /* no action */ });

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
registerStoreHandlers(ipcMain);
registerMonitorHandlers(ipcMain);