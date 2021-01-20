const { app, BrowserWindow, ipcMain } = require('electron');
const open = require('open');
const path = require('path');
const discord = require('discord-rich-presence')('778898616597086210');
const fs = require('fs');

const hosts = '/Windows/System32/drivers/etc/hosts';
const data = Date.now();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 850,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });
  mainWindow.setResizable(false)

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.webContents.on('new-window', function(event, url){
    event.preventDefault();
    open(url);
  });

  //Load
  ipcMain.on('cape-load', (event, arg) => {
    fs.appendFileSync(hosts, `\n99.99.99.99 s.optifine.net`, function (err) {
      if (err) return status(err);
    });
    status('Sukces! Załadowałeś/aś wszystkie dostępne pelerynki.');
  })

  //Unload
  ipcMain.on('cape-unload', (event, arg) => {
    fs.readFile(hosts, 'utf8', function(err, data){
      if (err) return status(err);
      var newValue = data.replace(/\n99.99.99.99 s.optifine.net/, '');

      fs.writeFileSync(hosts, newValue, 'utf-8');
      status('Sukces! Usunąłeś/aś wszystkie połączenia z pelerynkami.');
    });
  })

  function status(message){
    mainWindow.webContents.send('directoryW', message);
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

discord.updatePresence({
  state: 'Przeglądanie Pelerynek',
  details: 'Główne menu',
  startTimestamp: data,
  largeImageKey: 'logo',
  largeImageText: 'xayooindustries.us',
  smallImageKey: '4uss',
  smallImageText: 'made by 3xanax',
  instance: true,
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
