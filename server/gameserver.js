
"use strict"

const TinyServer = require('./tinyserver')
const ServerGame = require('./servergame')

let server = new TinyServer(8123, (data) => {
    console.log('received: %s', data)
})

let game = new ServerGame(() => {
    console.log('tick')
    let json = JSON.stringify(game.elementList)
    server.broadcastWsMessage(json, false)
})
game.start()

// catch all unhandled exceptions
process.on('uncaughtException', (err) => {
    console.log(err)
})
