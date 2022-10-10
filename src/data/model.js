const {ManagerConfig} = require('sqliteplus');
const {resolve} = require('node:path')

const config = new ManagerConfig({
    defaultFileStorage: resolve(__dirname, 'database'),
    defaultPoint: 'database/user OR user OR :memory:'
});

module.exports = config;