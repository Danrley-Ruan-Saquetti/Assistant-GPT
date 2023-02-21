const { app, Menu } = require('electron')

const App = () => {
    const win = require("./browser-window.js")

    app.setAppUserModelId(process.execPath)
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(App)