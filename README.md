# WAUalyzer

Wappalyzer Augmented is an augmentation of the famous and now closed-source Wappalyzer.

This project adds support for extracting additional metadata fields, including the Favicon hash. This version aims to be fully backward compatible with the original Wappalyzer functionality while providing extended analysis capabilities. Please refer to [enthec's webappanalyzer](https://github.com/enthec/webappanalyzer) for plain wappalyzer use and up to date technologies.

## Features

- **Extended Field Detection**: Identify new fields, such as the Favicon hash.
- **Backward Compatible**: Continues to support all original Wappalyzer features and configurations.

## TODO

- [ ] Incorporate from [webappanalyzer](https://github.com/enthec/webappanalyzer) the technology database by adding only new fields (eg. favicon)
- [ ] Add additional fields for analysis e.g. imgSrc etc.

## Example

```js
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
            "cats": [1],
            "favicon": [
                "12345",
                "67890"
            ], // MD5 hashes of the favicon
            "url": "example\\.com",
            "website": "https://example.com",
        }
    }

    // Load the example technology
    await Waualyzer.setTechnologies(technology)
    await Waualyzer.setCategories(await getCats())

    // Analyze an example favicon with the right hash
    let result = await Waualyzer.analyze({
        "favicon": "12345",
    })
    let foundTechs = await Waualyzer.resolve(result)
    console.log(foundTechs)
}

;(async () => {
    await main()
})()

