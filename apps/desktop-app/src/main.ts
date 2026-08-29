import { app, BrowserWindow, Menu } from 'electron';
import path from 'path';
import fs from 'fs';

// Fix Windows Electron 0x5 Access is Denied disk cache lock
const customUserDataPath = path.join(app.getPath('temp'), 'enterprise-ai-electron-userdata');
if (!fs.existsSync(customUserDataPath)) {
  try { fs.mkdirSync(customUserDataPath, { recursive: true }); } catch (_) {}
}
app.setPath('userData', customUserDataPath);

// Prevent Chromium disk cache collision & internal Autofill DevTools protocol mismatch on Windows
app.commandLine.appendSwitch('disable-gpu-shader-disk-cache');
app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('disable-http-cache');
app.commandLine.appendSwitch('disable-features', 'AutofillServerCommunication,AutofillEnableAccountWalletStorage');

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    title: 'Enterprise AI Workforce - Desktop Control Centre',
    backgroundColor: '#090d16',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      webSecurity: false
    }
  });

  // Define target URL or fallback to production dist
  const isDev = !app.isPackaged;
  
  let distPath = path.join(app.getAppPath(), 'frontend-dashboard/dist/index.html');
  if (!fs.existsSync(distPath)) {
    distPath = path.join(__dirname, '../frontend-dashboard/dist/index.html');
  }
  if (!fs.existsSync(distPath)) {
    distPath = path.join(__dirname, '../../frontend-dashboard/dist/index.html');
  }
  if (!fs.existsSync(distPath)) {
    distPath = path.join(process.resourcesPath, 'app.asar/frontend-dashboard/dist/index.html');
  }
  
  console.log(`[Electron Desktop App] Loading UI (Packaged: ${!isDev}, Path: ${distPath})...`);

  // Forward renderer console logs to Electron terminal (filtering internal devtools protocol noise)
  mainWindow.webContents.on('console-message', (_e, level, message, line, sourceId) => {
    if (message.includes('Autofill.enable') || message.includes('devtools://')) return;
    console.log(`[Renderer Log L${level}] ${message} (${sourceId}:${line})`);
  });

  if (isDev) {
    const targetUrl = process.env.ELECTRON_START_URL || 'http://localhost:3000';
    mainWindow.loadURL(targetUrl).then(() => {
      mainWindow?.webContents.openDevTools({ mode: 'detach' });
    }).catch(() => {
      mainWindow?.loadFile(distPath).catch(err => console.error('Fallback load error:', err));
    });
  } else {
    // In Packaged EXE mode, load the bundled static production index.html
    mainWindow.loadFile(distPath).catch(err => {
      console.error(`[Electron] Error loading packaged bundle:`, err);
    });
  }

  const menu = Menu.buildFromTemplate([
    {
      label: 'AI Operating System',
      submenu: [
        { label: 'Super Admin Dashboard', click: () => mainWindow?.loadURL('http://localhost:3000') },
        { label: 'Admin Dashboard', click: () => mainWindow?.loadURL('http://localhost:3000') },
        { type: 'separator' },
        { label: 'Quit Application', role: 'quit' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
