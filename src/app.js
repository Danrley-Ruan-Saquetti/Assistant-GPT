const { app, Menu, globalShortcut } = require('electron')

const App = async() => {
    const closeApp = () => {
        app.quit()
    }

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

    const contextMenu = Menu.buildFromTemplate([{
        label: 'Close',
        type: 'normal',
        click: closeApp
    }, ])

    const win = require("./browser-window.js")
    const tray = require("./tray.js")
    const { createNotification } = require("./notification.js")

    let isVisible = false

    app.setAppUserModelId(process.execPath)

    tray.setContextMenu(contextMenu)

    tray.on("click", toggleWin)

    tray.on("double-click", toggleWin)

    globalShortcut.register("Alt+Q", toggleWin)

    const notificationStarted = createNotification({ title: "Assistant GPT", body: "The Assistant GPT has started!" })

    notificationStarted.show()

    notificationStarted.on("click", showWin)
}

app.on('window-all-closed', () => {
    globalShortcut.unregisterAll()
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(App)