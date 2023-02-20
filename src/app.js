const { app } = require('electron')

const App = () => {
    const win = require("./browser-window.js")
    const tray = require("./tray.js")
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(App)