const { BrowserWindow } = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width: 750,
        height: 500,
        title: "Chat GPT",
        darkTheme: true,
        icon: __dirname + "/icons/icon-open-ai.png",
        show: false,
    })

    win.hide()

    win.setMenu(null)

    win.loadFile("src/pages/index.html")

    return win
}

module.exports = createWindow()