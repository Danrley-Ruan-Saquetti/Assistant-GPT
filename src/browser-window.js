const { BrowserWindow } = require('electron')

const win2 = new BrowserWindow({ width: 0, height: 0, show: false })

win2.setFullScreen(true)

const { height, width } = win2.getBounds()

win2.close()

function createWindow() {
    const boundsInitial = { width: 415, height: 415 }
    const win = new BrowserWindow({
        ...boundsInitial,
        minWidth: 250,
        minHeight: 250,
        title: "Chat GPT",
        darkTheme: true,
        icon: __dirname + "/icons/icon-open-ai.png",
        show: false,
        alwaysOnTop: true,
        frame: false
    })

    win.hide()

    win.setPosition(width - boundsInitial.width + 6, height - boundsInitial.height - 40)

    win.setMenu(null)

    win.setSkipTaskbar(true)

    win.loadFile("src/index.html")

    return win
}

module.exports = createWindow()