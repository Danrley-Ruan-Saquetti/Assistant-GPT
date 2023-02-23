const { Notification } = require("electron")
const { resolve } = require("path")

function createNotification(props = { title: "", body: "" }) {
    return new Notification({
        ...props,
        icon: resolve(__dirname, "./", "icons", "logo-open-ai.png"),
        urgency: "low"
    })
}

module.exports = createNotification