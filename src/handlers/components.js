const componentsCollection = require("./functions/components/ComponentCollection.js");
const {readdirSync} = require('fs')
const {resolve, sep} = require('path')

module.exports = (client) => {
    let components = client.components
    let directory= resolve(__dirname, '..', 'data', 'lang', 'localeComponents')
    let langFiles = readdirSync(
        directory
    ).filter(file => file.endsWith('.json'))

    for (let file of langFiles) {
        let langCode = file.split('.').shift()
        let content = require(
            resolve(directory, file)
        )

        for (let key of Object.values(content)) {
            if (typeof content[key] !== 'object') continue;
            
            for () {

            }
        }
    }
}