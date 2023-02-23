const { app, Menu, globalShortcut } = require('electron')

const App = () => {
    const closeApp = () => {
        app.quit()
    }

    let isVisible = false

    const win = require("./browser-window.js")
    const tray = require("./tray.js")

    const toggleWin = () => {
        if (!isVisible) {
            showWin()
        } else {
            hiddenWin()
        }
    }

    const showWin = () => {
        isVisible = true
        win.show()
    }

    const hiddenWin = () => {
        isVisible = false
        win.hide()
    }

    app.setAppUserModelId(process.execPath)

    const contextMenu = Menu.buildFromTemplate([{
        label: 'Close',
        type: 'normal',
        click: closeApp
    }, ])

    tray.setContextMenu(contextMenu)

    tray.on("click", toggleWin)

    tray.on("double-click", toggleWin)

    globalShortcut.register("CommandOrControl+U", toggleWin)
}

app.on('window-all-closed', () => {
    globalShortcut.unregisterAll()
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(App)