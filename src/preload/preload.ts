import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

type Listener = (event: IpcRendererEvent, ...args: any[]) => void;

contextBridge.exposeInMainWorld('api', {
  invoke: (channel: string, ...args: any[]): Promise<any> => {
    return ipcRenderer.invoke(channel, ...args);
  },
  on: (channel: string, listener: Listener): void => {
    ipcRenderer.on(channel, listener);
  },
  off: (channel: string, listener: Listener): void => {
    ipcRenderer.off(channel, listener);
  },
  removeListener: (channel: string, listener: Listener): void => {
    ipcRenderer.removeListener(channel, listener);
  },
});