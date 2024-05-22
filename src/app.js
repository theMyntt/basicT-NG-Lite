const { app, BrowserWindow } = require('electron')
const path = require('path')

require('./server')

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL('http://localhost:1023/')
  mainWindow.on('closed', function () {
    app.quit();
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (BrowserWindows.getAllWindows().length === 0) {
    createWindow()
  }
})