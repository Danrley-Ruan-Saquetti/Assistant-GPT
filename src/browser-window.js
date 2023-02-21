const { BrowserWindow } = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width: 500,
        height: 550,
        title: "Chat GPT",
        darkTheme: true,
        icon: __dirname + "/icons/icon-open-ai.png"
    })

    win.setMenu(null)

    win.loadFile("src/pages/index.html")

    return win
}

module.exports = createWindow()