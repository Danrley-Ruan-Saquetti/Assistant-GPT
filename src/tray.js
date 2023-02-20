const { Tray } = require('electron')
const { resolve } = require("path")

function CreateTray() {
    const tray = new Tray(resolve(__dirname, "./", "icons", "icon-openai.png"))

    tray.setToolTip("OpenAI - Chat GPT")

    return tray
}

module.exports = CreateTray()