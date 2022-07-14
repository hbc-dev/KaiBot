const {readdirSync} = require('fs'),
    {resolve} = require('path');

/**
 * @function eventHandler For load and execute all events in "src/events" dir
 * @param {object} client The provided discord client
 */
module.exports = (client) => {
    const dir = resolve(__dirname, '..', 'events'),
        files = readdirSync(dir).filter(file => file.endsWith('.js'));

    for (let file of files) {
        let path = resolve(dir, file),
            event = require(path);
        
        if (event.disable) continue;
        else {
            client.on(event.name, (...params) => event.execute(client, ...params))
        }
    }
}