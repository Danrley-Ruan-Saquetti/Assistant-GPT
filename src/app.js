const { app, Menu } = require('electron')

const App = () => {
    let isVisible = false
    let isFocusOut = false

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

    app.on("browser-window-blur", () => {
        isFocusOut = true

        hiddenWin()

        setTimeout(() => {
            isFocusOut = false
        }, 500)
    })

    const contextMenu = Menu.buildFromTemplate([{
        label: 'Close',
        type: 'normal',
        click: () => {
            app.exit()
        }
    }, ])

    tray.setContextMenu(contextMenu)

    tray.on("click", () => {
        if (isFocusOut) { return }

        toggleWin()
    })

    tray.on("double-click", showWin)

    win.on('minimize', hiddenWin)
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(App)