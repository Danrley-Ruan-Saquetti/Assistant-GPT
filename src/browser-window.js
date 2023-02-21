const { BrowserWindow } = require('electron')

const win2 = new BrowserWindow({ width: 0, height: 0, show: false })

win2.setFullScreen(true)

const { height, width } = win2.getBounds()

win2.close()

function createWindow() {
    const boundsInitial = { width: 600, height: 400 }
    const win = new BrowserWindow({
        ...boundsInitial,
        title: "Chat GPT",
        darkTheme: true,
        icon: __dirname + "/icons/icon-open-ai.png",
        show: false,
    })

    win.hide()

    win.setPosition(width - boundsInitial.width + 5, height - boundsInitial.height - 35)

    win.setMenu(null)

    win.loadFile("src/pages/index.html")

    return win
}

module.exports = createWindow()