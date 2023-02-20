const { BrowserWindow } = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width: 450,
        height: 500,
        title: "Chat GPT",
        resizable: false,
        darkTheme: true
    })

    // win.setMenu(null)

    win.loadFile("src/pages/page.html")

    return win
}

module.exports = createWindow()