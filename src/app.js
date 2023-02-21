const { app, Menu } = require('electron')

const App = () => {
    const win = require("./browser-window.js")
    const tray = require("./tray.js")

    app.setAppUserModelId(process.execPath)

    const contextMenu = Menu.buildFromTemplate([{
        label: 'Close',
        type: 'normal',
        click: () => {
            app.exit()
        }
    }, ])

    tray.setContextMenu(contextMenu)

    tray.on("click", () => {
        if (win.isVisible()) {
            win.hide()
        } else {
            win.show()
        }
    })

    win.on('minimize', () => {
        win.hide()
    })

    win.on('close', (ev) => {
        ev.preventDefault()

        win.hide()
    })
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(App)