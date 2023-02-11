const express = require('express')
const cheerio = require('cheerio')
const app = express()
const path = require('path')
const PORT = 3000
const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(express.static(path.join(__dirname, "public")))

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.redirect("index.html")
})

app.post("/", async (req, res) => {
    let url = req.body.website
    let urls = []
    if (!url.startsWith("http")) {
        url = `http://${req.body.website}`
    }
    let website
    let html
    try {
        website = await fetch(url)
        html = await website.text()
    }
    catch (err) {
        urls.push("error")
        res.json(urls)
        return
    }
    const $ = cheerio.load(html)
    const linkObjects = $("a")
    linkObjects.each((i, element) => {
        urls.push($(element).attr("href"))
    })
    res.json(urls)
})

app.listen(PORT, () => console.log(`server running on ${PORT}`))