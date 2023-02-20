const { Tray } = require('electron')
const { resolve } = require("path")

function CreateTray() {
    const tray = new Tray(resolve(__dirname, "./", "icons", "icon-open-ai.png"))

    tray.setToolTip("OpenAI - Chat GPT")

    return tray
}

module.exports = CreateTray()