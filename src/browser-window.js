const { BrowserWindow } = require('electron')

const win2 = new BrowserWindow({ width: 0, height: 0, show: false })

win2.setFullScreen(true)

const { height, width } = win2.getBounds()

win2.close()

function createWindow() {
    const boundsInitial = { width: 395, height: 395 }
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

    win.setPosition(width - boundsInitial.width + 5, height - boundsInitial.height - 35)

    win.setPosition(width - boundsInitial.width + 6, height - boundsInitial.height - 40)

    win.setMenu(null)

    win.setSkipTaskbar(true)

    win.loadFile("src/pages/index.html")

    return win
}

module.exports = createWindow()