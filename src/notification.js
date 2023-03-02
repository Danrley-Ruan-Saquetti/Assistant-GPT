const { Notification } = require("electron")
const { resolve } = require("path")

function controlNotification() {

    const createNotification = (props = { title: "", body: "" }) => {
        return new Notification({
            ...props,
            icon: resolve(__dirname, "./", "icons", "logo-open-ai.png"),
            urgency: "low"
        })
    }

    return {
        createNotification
    }
}

module.exports = controlNotification()