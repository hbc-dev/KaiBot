const {readdirSync} = require('fs'),
    {resolve} = require('path');

/**
 * @function languageHandler For load all languages in "src/data/lang" dir
 * @param {object} client The provided discord client
 */
module.exports = (client) => {
    let langs = client.languages,
        path = resolve(__dirname, "..", "data", "lang");
        files = readdirSync(path)
        .filter(file => file.endsWith('.json'));
    
    for (let file of files) {
        let lang = require(
            resolve(path, file)
        );

        langs.set(
            file.slice(0, -'.json'.length),// name of the language
            lang// the complete json of the language
        )
    }
}