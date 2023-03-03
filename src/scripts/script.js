const inputQuestion = document.getElementById("input-question")
const chatContent = document.querySelector(".panel-chat")
const panel = document.getElementById("panel")
const chat = document.getElementById("chat")
const btClearHistory = document.getElementById("bt-clear-history")
const btSettingsOpen = document.getElementById("bt-settings-open")
const btSettingsClose = document.getElementById("bt-settings-close")
const btSettingsReset = document.getElementById("bt-settings-reset")
const btSettingsSave = document.getElementById("bt-settings-save")
const panelSettings = document.getElementById("panel-settings")

const history = []
let indexHistoryCurrent = 0

const MAP_SETTINGS_ELEMENTS = {
    inputKey: document.getElementById("input-key"),
    tokens: document.getElementById("input-parameter-tokens"),
    temperature: document.getElementById("input-parameter-temperature"),
}

const MAP_SETTINGS = {
    apiKey: null,
    parameters: {
        tokens: 2048,
        temperature: 0.5
    },
}

async function sendQuestion() {
    const divMain = createBlockQuestion()
    const question = inputQuestion.value

    const elQuestion = writeQuestion(question)

    addElement(divMain, elQuestion)

    writeTextQuestion("Loading...")

    const elAnswer = writeAnswer(`Answering...`)

    addElement(divMain, elAnswer)

    chatContent.scrollTop = chatContent.scrollHeight

    inputQuestion.value = ""

    if (!MAP_SETTINGS.apiKey) {
        elAnswer.childNodes[1].innerHTML = `ERROR: API Key not provided`

        chatContent.scrollTop = chatContent.scrollHeight
        return
    }

    const response = await requestApi(question)

    let responseAnswer = response.error ? response.error.message : response.result.message

    while (responseAnswer.startsWith("\n")) {
        responseAnswer = responseAnswer.substring(2)
    }

    elAnswer.childNodes[1].innerHTML = `${response.error ? `ERROR: ` : ``}${responseAnswer.replace(/\n/g, "<br />")}`

    chatContent.scrollTop = chatContent.scrollHeight
}

// Api
const requestApi = async(body = "") => {
    const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + MAP_SETTINGS.apiKey,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: body,
            max_tokens: MAP_SETTINGS.parameters.tokens,
            temperature: MAP_SETTINGS.parameters.temperature,
        }),
    }).then(res => res.json()).then(res => {
        if (res.error) { return { error: res.error } }

        if (res.choices) { return { result: { message: res.choices[0].text || "No reply" } } }
    })

    return response
}

// DOM
const createBlockQuestion = () => {
    const divMain = document.createElement("div")

    divMain.classList.add("block-question")

    addElement(chat, divMain)

    return divMain
}

const writeQuestion = (question = "") => {
    history.push(question)
    indexHistoryCurrent = history.length

    const post = document.createElement("div")
    const author = document.createElement("span")
    const message = document.createElement("p")

    post.classList.add("question", "post")
    author.classList.add("author")
    message.classList.add("message")

    author.innerHTML = "You"
    message.textContent = `${question}`

    post.appendChild(author)
    post.appendChild(message)

    return post
}

const writeAnswer = (answer = "", authorA = null) => {
    const post = document.createElement("div")
    const author = document.createElement("span")
    const message = document.createElement("p")

    post.classList.add("answer", "post")
    author.classList.add("author")
    message.classList.add("message")

    author.innerHTML = authorA || "Assistant GPT"
    message.innerHTML = `${answer.replace(/\n/g, "<br />")}`

    post.appendChild(author)
    post.appendChild(message)

    return post
}

const addElement = (parent, child) => {
    parent.appendChild(child)
}

const writeTextQuestion = (text = "") => {
    inputQuestion.value = text
    
    setTimeout(() => {
        inputQuestion.focus()
        inputQuestion.setSelectionRange(text.length, text.length)
    }, 0)
}

const toggleSettings = (value) => {
    panelSettings.classList.toggle("active", value)
    panel.classList.toggle("focus-out", value)
}

const clearPanel = () => {
    document.querySelectorAll(".block-question").forEach(item => {
        item.remove()
    })
}

// Local Storage
const getLocalStorageSettings = (key = "") => {
    try {
        const response = JSON.parse(localStorage.getItem(key))
        return response ? response.value : null
    } catch (err) {
        const divMain = createBlockQuestion()
        const answer = writeAnswer("Cannot load settings", "System")

        addElement(divMain, answer)
    }
}

const removeLocalStorageSettings = ({ key = "", clear = false }) => {
    try {
        !clear ? localStorage.removeItem(key) : localStorage.clear()
    } catch (err) {
        const divMain = createBlockQuestion()
        const answer = writeAnswer("Cannot remove settings", "System")

        addElement(divMain, answer)
    }
}

const saveLocalStorageSettings = ({ key = "", value = {} }) => {
    try {
        localStorage.setItem(key, JSON.stringify({ value }))
    } catch (err) {
        const divMain = createBlockQuestion()
        const answer = writeAnswer("Cannot save settings", "System")

        addElement(divMain, answer)
    }
}

// Settings
const openSettings = () => {
    MAP_SETTINGS_ELEMENTS.inputKey.value = MAP_SETTINGS.apiKey
    MAP_SETTINGS_ELEMENTS.tokens.value = MAP_SETTINGS.parameters.tokens
    MAP_SETTINGS_ELEMENTS.temperature.value = MAP_SETTINGS.parameters.temperature

    toggleSettings(true)
}

const closeSettings = () => {
    MAP_SETTINGS_ELEMENTS.inputKey.value = MAP_SETTINGS.apiKey
    MAP_SETTINGS_ELEMENTS.tokens.value = MAP_SETTINGS.parameters.tokens
    MAP_SETTINGS_ELEMENTS.temperature.value = MAP_SETTINGS.parameters.temperature

    toggleSettings(false)
}

const saveSettings = () => {
    MAP_SETTINGS.apiKey = MAP_SETTINGS_ELEMENTS.inputKey.value
    MAP_SETTINGS.parameters.tokens = Number(MAP_SETTINGS_ELEMENTS.tokens.value)
    MAP_SETTINGS.parameters.temperature = Number(MAP_SETTINGS_ELEMENTS.temperature.value)

    saveLocalStorageSettings({key: "settings.key", value: MAP_SETTINGS.apiKey})
    saveLocalStorageSettings({key: "settings.parameters.tokens", value: MAP_SETTINGS.parameters.tokens})
    saveLocalStorageSettings({key: "settings.parameters.temperature", value: MAP_SETTINGS.parameters.temperature})

    const divMain = createBlockQuestion()
    const answerEl = writeAnswer("Settings saved", "System")

    addElement(divMain, answerEl)

    toggleSettings(false)
}

const resetSettings = () => {
    removeLocalStorageSettings({clear: true})

    MAP_SETTINGS.apiKey = null
    MAP_SETTINGS.parameters.tokens = 2048
    MAP_SETTINGS.parameters.temperature = 0.5

    MAP_SETTINGS_ELEMENTS.inputKey.value = null
    MAP_SETTINGS_ELEMENTS.tokens.value = 2048
    MAP_SETTINGS_ELEMENTS.temperature.value = 0.5

    const divMain = createBlockQuestion()
    const answerEl = writeAnswer("Settings reset", "System")

    addElement(divMain, answerEl)
}

// Events
const keypress = ({key}) => {
    if (inputQuestion.value && key === "Enter") {sendQuestion()}
}

const keydown = ({ code, ctrlKey }) => {
    if (code == "Tab" && !panelSettings.classList.contains("active")) {setTimeout(() => inputQuestion.focus(), 0)}

    if (!ctrlKey) {return}

    if (code == "KeyS" && panelSettings.classList.contains("active")) saveSettings()
    
    if (code == "KeyQ") { panelSettings.classList.contains("active") ? closeSettings() : openSettings() }

    if (code == "KeyR") clearPanel()
}

const writeHistory = ({key}) => {
    if (key == "ArrowUp" && history.length > 0 && indexHistoryCurrent > 0) {
        indexHistoryCurrent--
        writeTextQuestion(history[indexHistoryCurrent])
    }
    if (key == "ArrowDown" && history.length > 0 && indexHistoryCurrent < history.length) {
        indexHistoryCurrent++
        writeTextQuestion(history[indexHistoryCurrent])
    }
}

window.onload = () => {
    MAP_SETTINGS.apiKey = getLocalStorageSettings("settings.key") || null
    MAP_SETTINGS.parameters.tokens = getLocalStorageSettings("settings.parameters.tokens") || 2048
    MAP_SETTINGS.parameters.temperature = getLocalStorageSettings("settings.parameters.temperature") || 0.5

    addEventListener("keydown", keydown)
    inputQuestion.addEventListener("keypress", keypress)
    inputQuestion.addEventListener("keydown", writeHistory)
    btSettingsOpen.addEventListener("click", openSettings)
    btSettingsClose.addEventListener("click", closeSettings)
    btSettingsReset.addEventListener("click", resetSettings)
    btSettingsSave.addEventListener("click", saveSettings)
    btClearHistory.addEventListener("click", clearPanel)
}