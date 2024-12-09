const Waualyzer = require('./waualyzer')
const fs = require('fs')
const path = require('path')

async function getCats() {
    const categories = JSON.parse(
        fs.readFileSync(
            path.resolve(`./categories.json`)
        )
    )
    return categories
}

async function main() {
    const technology = {
        "Example": {
            "description": "A short description of the technology.",
            "cats": [
                1
            ],
            "favicon": "12345", // MD5 hash of the favicon
            "url": "example\\.com",
            "website": "https://example.com",
        }
    }

    //Load the example technology
    await Waualyzer.setTechnologies(technology)
    await Waualyzer.setCategories(await getCats())

    //Analyze an example favicon with the right hash
    let result = await Waualyzer.analyze({
        "favicon": "12345",
    })
    let foundTechs = await Waualyzer.resolve(result)
    console.log(foundTechs)
}

(async () => {
    await main()
})()