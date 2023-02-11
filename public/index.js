
const textBox = document.getElementById("text-box")
const doneButton = document.getElementById("done")
const linkbox = document.getElementById("linkbox")
const clear = document.getElementById("clear")

async function fetchLinks(website) {
    let response
    let data
    response = await fetch("/", { method: "POST", headers: { "Content-type": "application/json" }, body: JSON.stringify({ "website": website }), })
    data = await response.json()
    data = data.map(link => {
        if (!link.startsWith("http") && link !== "error") {
            link = `http://${website}${link}`
        }
        link = `<a href="${link}">${link}</a>`
        return link
    })
    let links = document.createElement("p")
    links.innerHTML = (data.join("\n"))
    linkbox.append(links)
}

doneButton.addEventListener("click", async () => {
    if (textBox.value !== "") {
        await fetchLinks(textBox.value)
    }
})
clear.addEventListener("click", e => {
    const element = linkbox
    if (element.childElementCount !== 0) {
        element.innerText = ""
        element.innerHTML = ""
    }
})
textBox.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        doneButton.click()
    }
})

