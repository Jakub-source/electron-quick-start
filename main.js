const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: true,
    hasShadow: false,
    backgroundColor: "#00000000",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Allow ipcRenderer in renderer process
    },
  });

  mainWindow.loadFile("index.html");

  // Initially set the window to not ignore mouse events (unlocked state)
  mainWindow.setIgnoreMouseEvents(false);

  // Listen for toggle-click event to control click-through mode
  ipcMain.on("toggle-click", (event, isClickThrough) => {
    if (isClickThrough) {
      mainWindow.setIgnoreMouseEvents(true, { forward: true });
    } else {
      mainWindow.setIgnoreMouseEvents(false);
    }
  });

  // Register global shortcut for unlocking (Ctrl + X)
  globalShortcut.register("Ctrl+X", () => {
    console.log("Unlocking window - Ctrl + X pressed");
    mainWindow.setIgnoreMouseEvents(false); // Unlock the window (allow interaction)

    // Send IPC message to show the lock button
    mainWindow.webContents.send('toggle-lock-button', true);
  });

  // Register global shortcut for locking (Ctrl + L)
  globalShortcut.register("Ctrl+L", () => {
    console.log("Locking window - Ctrl + L pressed");
    mainWindow.setIgnoreMouseEvents(true, { forward: true }); // Lock the window (click-through)

    // Send IPC message to hide the lock button
    mainWindow.webContents.send('toggle-lock-button', false);
  });
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
