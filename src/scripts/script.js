const inputQuestion = document.getElementById("input-question")
const chatContent = document.querySelector(".panel-chat")
const chat = document.getElementById("chat")

const OPEN_AI_API_KEY = "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"

const requestApi = async(body = "") => {
    const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + OPEN_AI_API_KEY,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: body,
            max_tokens: 2048,
            temperature: 0.5,
        }),
    }).then(res => res.json()).then(res => {
        if (res.error) { return { error } }

        if (res.choices) { return { result: { message: res.choices[0].text || "No reply" } } }
    })

    return response
}

const writeQuestion = (question = "") => {
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

const writeAnswer = (answer = "") => {
    const post = document.createElement("div")
    const author = document.createElement("span")
    const message = document.createElement("p")

    post.classList.add("answer", "post")
    author.classList.add("author")
    message.classList.add("message")

    author.innerHTML = "Chat GPT"
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
}

const disableInputQuestion = () => {
    inputQuestion.disabled = true
}

const enableInputQuestion = () => {
    inputQuestion.value = ""
    inputQuestion.disabled = false
    inputQuestion.focus()
}

async function sendQuestion() {
    const divMain = document.createElement("div")
    const question = inputQuestion.value

    divMain.classList.add("block-question")

    addElement(chat, divMain)

    const elQuestion = writeQuestion(question)

    addElement(divMain, elQuestion)

    writeTextQuestion("Loading...")

    disableInputQuestion()

    const elAnswer = writeAnswer(`Answering...`)

    addElement(divMain, elAnswer)

    chatContent.scrollTop = chatContent.scrollHeight

    const response = await requestApi(question)

    let responseAnswer = response.error ? response.error.message : response.result.message

    while (responseAnswer.startsWith("\n")) {
        responseAnswer = responseAnswer.substring(2)
    }

    elAnswer.childNodes[1].innerHTML = `${response.error ? `ERROR: ` : ``}${responseAnswer.replace(/\n/g, "<br />")}`

    enableInputQuestion()

    chatContent.scrollTop = chatContent.scrollHeight
}

window.onload = () => {
    inputQuestion.addEventListener("keypress", (e) => {
        if (inputQuestion.value && e.key === "Enter") sendQuestion()
    })
}