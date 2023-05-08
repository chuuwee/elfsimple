import { ipcMain } from 'electron';
import fs from 'fs';

const PATTERNS = {
  DEFAULT: /^\[.+?\] (?<message>.+)/,
  // Add other patterns here
};

async function* readLines(filePath: string): AsyncIterable<string> {
  let fd: fs.promises.FileHandle;
  try {
    fd = await fs.promises.open(filePath, 'r');
  } catch (error) {
    console.error('Error opening file:', error);
    return;
  }

  let remaining = '';

  while (true) {
    const { bytesRead, buffer } = await readChunk(fd);
    if (bytesRead === 0) {
      await sleep(1000); // Sleep for 1 second before trying to read again
      continue;
    }

    remaining += buffer.toString('utf-8', 0, bytesRead);
    let lastNewLine = remaining.lastIndexOf('\n');

    if (lastNewLine !== -1) {
      const lines = remaining.slice(0, lastNewLine).split('\n');
      remaining = remaining.slice(lastNewLine + 1);

      for (const line of lines) {
        yield line;
      }
    }
  }
}

async function readChunk(fd: fs.promises.FileHandle, chunkSize: number = 1024): Promise<{ bytesRead: number; buffer: Buffer }> {
  const buffer = Buffer.alloc(chunkSize);
  try {
    const { bytesRead } = await fd.read(buffer, 0, chunkSize, null);
    return { bytesRead, buffer };
  } catch (error) {
    console.error('Error reading file:', error);
    return { bytesRead: 0, buffer };
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const processLine = (line: string) => {
  const logMatch = line.match(PATTERNS.DEFAULT);

  if (!logMatch || !logMatch.groups) {
    return;
  }

  const message = logMatch.groups['message'];

  if (!message) {
    return;
  }

  ipcMain.emit('message', message);
};

export const registerMonitorHandlers = (ipcMain: Electron.IpcMain) => { 
  ipcMain.handle('subscribe', (event, logFilePath: string) => {
    (async () => {
      for await (const line of readLines(logFilePath)) {
        processLine(line);
      }
    })();

    ipcMain.on('message', (message) => {
      event.sender.send('message', message);
    });
  });
};