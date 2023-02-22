const { app, Menu } = require('electron')

const App = () => {
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
        click: () => {
            app.exit()
        }
    }, ])

    tray.setContextMenu(contextMenu)

    tray.on("click", toggleWin)

    tray.on("double-click", toggleWin)

    win.on('minimize', hiddenWin)
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(App)