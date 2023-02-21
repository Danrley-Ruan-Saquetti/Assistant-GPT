const { BrowserWindow } = require('electron')
const { resolve } = require("path")

function createWindow() {
    const win = new BrowserWindow({
        width: 450,
        height: 500,
        title: "Chat GPT",
        resizable: false,
        darkTheme: true
    })

    win.setMenu(null)

    win.setIcon(resolve(__dirname, "icons", "icon-open-ai.png"))

    win.loadFile("src/pages/index.html")

    return win
}

module.exports = createWindow()