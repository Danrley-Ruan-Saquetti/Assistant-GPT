const { BrowserWindow } = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width: 450,
        height: 500,
        title: "Chat GPT",
        resizable: false,
        darkTheme: true,
        icon: __dirname + "/icons/icon-open-ai.png"
    })

    win.setMenu(null)

    win.loadFile("src/pages/index.html")

    return win
}

module.exports = createWindow()