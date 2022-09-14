require('dotenv').config();

const {resolve} = require('path');
const {ShardingManager} = require('discord.js');
const { bold, greenBright, bgGreenBright, bgRedBright } = require("chalk");

const shards = new ShardingManager(resolve(__dirname, '../index.js'), {
    token: process.env.TOKEN
});

shards.on('shardCreate', shard => {
    console.log(
      bgGreenBright(
        `🔔 Shards activos, conectado en el shard ${bold(shard.id)} con un total de ${bold(shard.manager.totalShards)} shard/s activo/s.`
        )
    );

    shard.on('spawn', (shardInfo) => {
        console.log(
            bgGreenBright(
                `📢 Se ha habilitado un nuevo shard con el numero de proceso ${bold(shardInfo.pid)}`
            )
        );
    });

    shard.on('ready', () => {
        console.log(
            greenBright(`✅ El shard ${bold(shard.id)} esta conectado y listo`)
        )
    })
});

shards.spawn().catch(error => {
    console.log(
      bgRedBright(
        `❎ Ha ocurrido un error al iniciar los shards => ${error.name}: ${error.message}`
      )
    );
});